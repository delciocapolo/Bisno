import type { BisnoAttributes } from "../models/bisno.model.js";
import { Bisno } from "../models/bisno.model.js";
import type { BisnoRepository } from "@src/domain/repositories/bisno.repository.js";
import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import type { FindOptions } from "sequelize";

export class SequelizeBisnoRepository implements BisnoRepository {
  async list(params?: FindOptions<BisnoAttributes>): Promise<Bisno[]> {
    return await Bisno.findAll({
      where: params?.where,
      order: params?.order,
      limit: params?.limit,
      include: params?.include,
      attributes: params?.attributes,
    });
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
