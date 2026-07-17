import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import {
  consumer,
  eventConsumerLogger,
} from "../adapters/amqp-event-consumer.js";
import { publisher } from "../adapters/amqp-event-publisher.js";
import {
  createBisnoUseCase,
  createLeadUseCase,
  decrementSubscriptionPointUseCase,
  getBisnoUseCase,
  getLeadByBisnoIdUseCase,
  getLeadUseCase,
  getMixeiroByIdUseCase,
  getNextEligibleMixeiroUseCase,
  getServiceUseCase,
  getSubscriptionByMixeiroIdUseCase,
  listMixeirosUseCase,
} from "@src/application/use-cases/composition.js";
import { isDefined } from "@src/shared/utils/index.js";
import type { LeadAttributes } from "@src/infrastructure/sequelize/models/lead.model.js";
import type { BisnoAttributes } from "@src/infrastructure/sequelize/models/bisno.model.js";

export async function registerConsumers(): Promise<void> {
  await consumer.consume<BisnoCreatedPayload>({
    routingKey: "bisno.order.created",
    queue: "bisno.order.created.queue",
    onMessage: async (payload) => {
      const bisno = await createBisnoUseCase.execute(payload);

      if (!isDefined(bisno)) {
        return eventConsumerLogger.error({ payload }, "Failed to create bisno");
      }

      await publisher.publish({
        routingKey: "bisno.distribution.start",
        payload: [bisno],
      });
    },
  });

  await consumer.consume<BisnoAttributes[]>({
    routingKey: "bisno.distribution.start",
    queue: "bisno.distribution.start.queue",
    onMessage: async (payload) => {
      for (const bisno of payload) {
        const service = await getServiceUseCase.execute(bisno.serviceId);
        const mixeiro = await getNextEligibleMixeiroUseCase.execute({
          serviceId: bisno.serviceId,
          zoneId: bisno.zoneId,
        });

        if (isDefined(mixeiro)) {
          const lead = await createLeadUseCase.execute({
            mixeiroId: mixeiro.id,
            bisnoId: bisno.id,
          });

          if (isDefined(lead)) {
            await publisher.publish({
              routingKey: "bisno.notification.send",
              payload: [lead],
            });

            await publisher.publish({
              routingKey: "bisno.mixeiro.locked",
              payload: [mixeiro],
            });

            await mixeiro.update({ isLocked: true });
          }
        } else {
          eventConsumerLogger.error({ bisno }, "No eligible mixeiro found");
          const originalBisno = await getBisnoUseCase.execute(bisno.id);
          await originalBisno?.update({
            distributionRound:
              Number(originalBisno?.distributionRound || 0) + 1,
          });
          await publisher.publish({
            routingKey: "bisno.distribution.reset",
            payload: [
              {
                ...bisno,
                categoryId: service?.categoryId,
              },
            ],
          });
        }
      }
    },
  });

  await consumer.consume<LeadAttributes[]>({
    routingKey: "bisno.notification.send",
    queue: "bisno.notification.send.queue",
    onMessage: async (payload) => {
      for (const lead of payload) {
        // TODO: resolver a logica/algoritmo de envio de mensagem ao Mixeiro sobre o Bisno
        await publisher.publish({
          routingKey: "bisno.order.distributed",
          payload: [lead],
        });
      }
    },
  });

  await consumer.consume<(BisnoAttributes & { categoryId: string })[]>({
    routingKey: "bisno.distribution.reset",
    queue: "bisno.distribution.reset.queue",
    onMessage: async (payload) => {
      for (const bisno of payload) {
        const mixeirosUnlocked = await listMixeirosUseCase.execute({
          where: {
            isLocked: false,
            zoneId: bisno.zoneId,
            categoryId: bisno.categoryId,
          },
        });
        const mixeirosLocked = await listMixeirosUseCase.execute({
          where: {
            isLocked: true,
            zoneId: bisno.zoneId,
            categoryId: bisno.categoryId,
          },
        });

        if (mixeirosUnlocked?.length >= mixeirosLocked?.length) {
          for (const mixeiro of mixeirosLocked) {
            await mixeiro.update({ isLocked: false });
          }
        }

        await publisher.publish({
          routingKey: "bisno.distribution.start",
          payload: [bisno],
        });
      }
    },
  });

  await consumer.consume<LeadAttributes[]>({
    routingKey: "bisno.order.distributed",
    queue: "bisno.order.distributed.queue",
    onMessage: async (payload) => {
      for (const lead of payload) {
        const bisno = await getBisnoUseCase.execute(lead.bisnoId);
        const leadFound = await getLeadUseCase.execute(lead.id);

        if (!isDefined(bisno)) {
          return eventConsumerLogger.error(
            { lead },
            "Bisno not found for lead",
          );
        }

        await bisno.update({ status: "matched" });
        await leadFound?.update({ status: "sent" });
      }
    },
  });

  await consumer.consume<LeadAttributes[]>({
    routingKey: "bisno.notification.timeout",
    queue: "bisno.notification.timeout.queue",
    onMessage: async (payload) => {
      for (const lead of payload) {
        const bisno = await getBisnoUseCase.execute(lead.bisnoId);

        if (!isDefined(bisno)) {
          return eventConsumerLogger.error(
            { lead },
            `Bisno for lead #${lead.id} does not exists`,
          );
        }

        if (bisno.distributionRound >= 2) {
          await publisher.publish({
            routingKey: "bisno.order.exhausted",
            payload: [lead],
          });
        } else {
          await publisher.publish({
            routingKey: "bisno.distribution.next",
            payload: [bisno],
          });
        }
      }
    },
  });

  await consumer.consume<LeadAttributes[]>({
    routingKey: "bisno.order.exhausted",
    queue: "bisno.order.exhausted.queue",
    onMessage: async (payload) => {
      for (const lead of payload) {
        const bisno = await getBisnoUseCase.execute(lead.bisnoId);

        if (!isDefined(bisno)) {
          return eventConsumerLogger.error(
            { lead },
            `Bisno for lead #${lead.id} does not exists`,
          );
        }

        await bisno.update({ status: "exhausted" });
        const leadFound = await getLeadUseCase.execute(lead.id);

        if (!isDefined(leadFound)) {
          return eventConsumerLogger.error({ lead }, `Lead not found`);
        }

        await leadFound.update({ status: "expired" });
      }
    },
  });

  await consumer.consume<BisnoAttributes[]>({
    routingKey: "bisno.distribution.next",
    queue: "bisno.distribution.next.queue",
    onMessage: async (payload) => {
      for (const bisno of payload) {
        const service = await getServiceUseCase.execute(bisno.serviceId);
        const bisnoFound = await getBisnoUseCase.execute(bisno.id);

        if (!isDefined(service) || !isDefined(bisnoFound)) {
          return eventConsumerLogger.error(
            { bisno },
            "Bisno's service not found",
          );
        }

        const mixeiro = await getNextEligibleMixeiroUseCase.execute({
          serviceId: service.id,
          zoneId: bisno.zoneId,
        });

        if (isDefined(mixeiro)) {
          const lead = await getLeadByBisnoIdUseCase.execute(bisno.id);
          await lead?.update({
            mixeiroId: mixeiro.id,
          });
          await publisher.publish({
            routingKey: "bisno.notification.send",
            payload: [lead],
          });
        } else {
          eventConsumerLogger.error({ bisno }, "No eligible mixeiro found");
          await bisnoFound?.update({
            distributionRound: Number(bisnoFound?.distributionRound || 0) + 1,
          });
          await publisher.publish({
            routingKey: "bisno.distribution.reset",
            payload: [
              {
                ...bisno,
                categoryId: service?.categoryId,
              },
            ],
          });
        }
      }
    },
  });

  await consumer.consume<LeadAttributes[]>({
    routingKey: "bisno.order.accepted",
    queue: "bisno.order.accepted.queue",
    onMessage: async (payload) => {
      for (const lead of payload) {
        const bisno = await getBisnoUseCase.execute(lead.bisnoId);
        const leadFound = await getLeadUseCase.execute(lead.id);

        await bisno?.update({ status: "done" });
        await leadFound?.update({ status: "accepted" });
        await publisher.publish({
          routingKey: "bisno.points.decrement",
          payload: { mixeiroId: lead.mixeiroId },
        });
        // TODO: send notification to client about lead closed
      }
    },
  });

  await consumer.consume<{ mixeiroId: string }>({
    routingKey: "bisno.points.decrement",
    queue: "bisno.points.decrement.queue",
    onMessage: async (payload) => {
      const mixeiro = await getMixeiroByIdUseCase.execute(payload?.mixeiroId);

      if (!isDefined(mixeiro)) {
        return eventConsumerLogger.error({ payload }, "Mixeiro not found");
      }

      const subscription = await getSubscriptionByMixeiroIdUseCase.execute(
        mixeiro.id,
      );

      if (!isDefined(subscription)) {
        return eventConsumerLogger.error(
          { mixeiro },
          "Error while processing Mixeiro's subscription",
        );
      }

      await decrementSubscriptionPointUseCase.execute(subscription.id);
    },
  });
}
