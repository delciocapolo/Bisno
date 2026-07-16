import type { FindOptions } from "sequelize";
import type { ServiceRepository } from "@src/domain/repositories/service.repository.js";
import type { ServiceAttributes } from "../models/service.model";
import { Service } from "../models/service.model";

const SERVICE_ATTRIBUTES = [
  "id",
  "categoryId",
  "name",
  "slug",
  "icon",
  "isActive",
  "createdAt",
];

export class SequelizeServiceRepository implements ServiceRepository {
  async list(params?: FindOptions<ServiceAttributes>): Promise<Service[]> {
    return await Service.findAll({
      where: params?.where,
      include: params?.include,
      limit: params?.limit,
      order: params?.order,
      attributes: SERVICE_ATTRIBUTES,
    });
  }

  async getById(id: string): Promise<Service | null> {
    return await Service.findByPk(id, { attributes: SERVICE_ATTRIBUTES });
  }

  async getBySlug(slug: string): Promise<Service | null> {
    return await Service.findOne({
      where: {
        slug: slug,
      },
      attributes: SERVICE_ATTRIBUTES,
    });
  }

  async save(
    categoryId: string,
    name: string,
    slug: string,
    icon: string,
  ): Promise<Service | null> {
    return await Service.create({
      categoryId: categoryId,
      name: name,
      slug: slug,
      icon: icon,
    });
  }
}
