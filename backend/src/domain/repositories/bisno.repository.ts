import type {
  Bisno,
  BisnoAttributes,
} from "@src/infrastructure/sequelize/models/bisno.model.js";
import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import type { FindOptions } from "sequelize";

export interface BisnoRepository {
  list: (params?: FindOptions<BisnoAttributes>) => Promise<Bisno[]>;
  getBisnoById: (id: string) => Promise<Bisno | null>;
  save: ({
    zoneId,
    serviceId,
    customerName,
    customerMobile,
    customerMobileHasWhatsapp,
    description,
  }: BisnoCreatedPayload) => Promise<Bisno | null>;
}
