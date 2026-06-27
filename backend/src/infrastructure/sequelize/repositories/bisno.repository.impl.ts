import { Bisno } from "../models/bisnos.model.js";
import { BisnoRepository } from "@src/domain/repositories/bisno.repository.js";
import { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";

export class SequelizeBisnoRepository implements BisnoRepository {
  async list(): Promise<Bisno[]> {
    return await Bisno.findAll();
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

    return bisno || null;
  }
}