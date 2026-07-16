import type {
  BisnoCreatedPayload,
  DistributionStartPayload,
  NotificationSendPayload,
} from "@src/shared/events/bisno-events.js";
import {
  consumer,
  eventConsumerLogger,
} from "../adapters/amqp-event-consumer.js";
import { publisher } from "../adapters/amqp-event-publisher.js";
import {
  createBisnoUseCase,
  getBisnoUseCase,
  getNextEligibleMixeiroUseCase,
} from "@src/application/use-cases/composition.js";
import { isDefined } from "@src/shared/utils/index.js";

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

  await consumer.consume<DistributionStartPayload>({
    routingKey: "bisno.distribution.start",
    queue: "bisno.distribution.start.queue",
    onMessage: async (payload) => {
      if (Array.isArray(payload) && payload.length > 0) {
        for (const bisno of payload) {
          const mixeiro = await getNextEligibleMixeiroUseCase.execute({
            serviceId: bisno.serviceId,
            zoneId: bisno.zoneId,
          });

          if (!isDefined(mixeiro)) {
            eventConsumerLogger.error({ bisno }, "No eligible mixeiro found");
            return;
          }
        }
      } else if ("bisnoId" in payload && isDefined(payload?.bisnoId)) {
        const bisno = await getBisnoUseCase.execute(payload.bisnoId);

        if (!isDefined(bisno)) {
          return eventConsumerLogger.error(
            { payload },
            "Bisno does not exists",
          );
        }
      }
    },
  });

  await consumer.consume<NotificationSendPayload>({
    routingKey: "bisno.notification.send",
    queue: "bisno.notification.send.queue",
    onMessage: async (_payload) => {},
  });
}
