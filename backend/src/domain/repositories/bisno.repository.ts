import type { Bisno, BisnoStatusType } from "../entities/bisno.entity.js";

export interface BisnoRepository {
  list: () => Promise<Bisno[]>;
  save: (
    zoneId: string,
    serviceId: string,
    customerName: string,
    customerMobile: string,
    customerMobileHasWhatsapp: boolean,
    description: string,
    status: BisnoStatusType,
    distributionRound: number,
  ) => Promise<Bisno | null>;
}
