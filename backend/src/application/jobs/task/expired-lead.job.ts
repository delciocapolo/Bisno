import { listExpiredLeadUseCase } from "@src/application/use-cases/composition";
import { publisher } from "@src/infrastructure/rabbit/adapters/amqp-event-publisher";

export async function expiredLeadJob() {
  const expiredLeads = await listExpiredLeadUseCase.execute();
  await publisher.publish({
    routingKey: "bisno.notification.timeout",
    payload: expiredLeads,
  });
}
