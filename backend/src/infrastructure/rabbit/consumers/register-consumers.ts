import { BisnoCreatedPayload, DistributionStartPayload, NotificationSendPayload } from "@src/shared/events/bisno-events.js";
import { consumer } from "../adapters/amqp-event-consumer.js";
import { publisher } from "../adapters/amqp-event-publisher.js";

export async function registerConsumers(): Promise<void> {
  await consumer.consume<BisnoCreatedPayload>({
    routingKey: "bisno.order.created",
    queue: "bisno.order.created.queue",
    onMessage: async (payload) => {
      await publisher.publish({
        routingKey: "bisno.distribution.start",
        payload: { bisnoId: payload.bisnoId } satisfies DistributionStartPayload,
      });
    },
  });

  await consumer.consume<DistributionStartPayload>({
    routingKey: "bisno.distribution.start",
    queue: "bisno.distribution.start.queue",
    onMessage: async (payload) => {},
  });

  await consumer.consume<NotificationSendPayload>({
    routingKey: "bisno.notification.send",
    queue: "bisno.notification.send.queue",
    onMessage: async (payload) => {},
  });
}
