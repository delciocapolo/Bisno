import type { FindOptions } from "sequelize";
import type { LeadRepository } from "@src/domain/repositories/lead.repository.js";
import type { LeadAttributes } from "../models/lead.model.js";
import { Lead } from "../models/lead.model.js";
import type { ICreateLeadPayload } from "@src/shared/events/lead-events.js";

export class SequelizeLeadRepository implements LeadRepository {
  async list(params?: FindOptions<LeadAttributes>): Promise<Lead[]> {
    return await Lead.findAll({
      where: params?.where,
      include: params?.include,
      order: params?.order,
      limit: params?.limit,
      attributes: params?.attributes,
    });
  }

  async getLeadById(id: string): Promise<Lead | null> {
    return await Lead.findByPk(id);
  }

  async getLeadByMixeiroId(mixeiroId: string): Promise<Lead[]> {
    return await Lead.findAll({
      where: { mixeiroId: mixeiroId },
      order: [["createdAt", "DESC"]],
    });
  }

  async getLeadByBisnoId(bisnoId: string): Promise<Lead | null> {
    return await Lead.findOne({
      where: { bisnoId: bisnoId },
    });
  }

  async save({ bisnoId, mixeiroId }: ICreateLeadPayload): Promise<Lead | null> {
    return await Lead.create({
      mixeiroId: mixeiroId,
      bisnoId: bisnoId,
    });
  }
}
