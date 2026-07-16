import { Bisno } from "../models/bisno.model.js";
import type { BisnoRepository } from "@src/domain/repositories/bisno.repository.js";
import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";

export class SequelizeBisnoRepository implements BisnoRepository {
  async list(): Promise<Bisno[]> {
    return await Bisno.findAll();
  }

  async getBisnoById(id: string): Promise<Bisno | null> {
    return await Bisno.findByPk(id);
  }

  async save({
    zoneId,
    serviceId,
    customerName,
    customerMobile,
    customerMobileHasWhatsapp,
    description,
  }: BisnoCreatedPayload): Promise<Bisno | null> {
    const bisno = await Bisno.create({
      zoneId,
      serviceId,
      customerName,
      customerMobile,
      customerMobileHasWhatsapp,
      description,
    });

    return bisno;
  }
}
