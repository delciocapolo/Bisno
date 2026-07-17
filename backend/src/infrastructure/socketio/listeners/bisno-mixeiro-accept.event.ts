import { socketLogger } from "../server";
import { isDefined } from "@src/shared/utils";
import { getLeadByBisnoIdUseCase } from "@src/application/use-cases/composition";
import { publisher } from "@src/infrastructure/rabbit/adapters/amqp-event-publisher";

export async function bisnoMixeiroAcceptEvent(bisnoId: string) {
  const lead = await getLeadByBisnoIdUseCase.execute(bisnoId);

  if (!isDefined(lead)) {
    return socketLogger.error({ bisnoId }, "Lead not found");
  }

  await publisher.publish({
    routingKey: "bisno.order.accepted",
    payload: [lead],
  });
}
