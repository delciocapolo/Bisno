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
import { createBisnoUseCase } from "@src/application/use-cases/composition.js";
import { isDefined } from "@src/shared/utils/index.js";

export async function registerConsumers(): Promise<void> {
  await consumer.consume<BisnoCreatedPayload>({
    routingKey: "bisno.order.created",
    queue: "bisno.order.created.queue",
    onMessage: async (payload) => {
      const bisno = await createBisnoUseCase.execute(payload);

      if (!isDefined(bisno)) {
        return eventConsumerLogger.error(
          "Failed to create bisno from payload",
          { payload },
        );
      }

      await publisher.publish({
        routingKey: "bisno.distribution.start",
        payload: { bisnoId: bisno.id } satisfies DistributionStartPayload,
      });
    },
  });

  await consumer.consume<DistributionStartPayload>({
    routingKey: "bisno.distribution.start",
    queue: "bisno.distribution.start.queue",
    onMessage: async (_payload) => {},
  });

  await consumer.consume<NotificationSendPayload>({
    routingKey: "bisno.notification.send",
    queue: "bisno.notification.send.queue",
    onMessage: async (_payload) => {},
  });
}
