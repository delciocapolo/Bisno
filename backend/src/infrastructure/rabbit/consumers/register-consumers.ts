import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import {
  consumer,
  eventConsumerLogger,
} from "../adapters/amqp-event-consumer.js";
import { publisher } from "../adapters/amqp-event-publisher.js";
import {
  createBisnoUseCase,
  createLeadUseCase,
  getBisnoUseCase,
  getLeadUseCase,
  getNextEligibleMixeiroUseCase,
  getServiceUseCase,
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
}
