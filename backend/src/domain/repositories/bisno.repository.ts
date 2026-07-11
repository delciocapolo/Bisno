import type { Bisno } from "@src/infrastructure/sequelize/models/bisno.model.js";
import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";

export interface BisnoRepository {
  list: () => Promise<Bisno[]>;
  save: ({
    zoneId,
    serviceId,
    customerName,
    customerMobile,
    customerMobileHasWhatsapp,
    description,
  }: BisnoCreatedPayload) => Promise<Bisno | null>;
}
