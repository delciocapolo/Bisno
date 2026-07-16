import type {
  Service,
  ServiceAttributes,
} from "@src/infrastructure/sequelize/models/service.model.js";
import type { FindOptions } from "sequelize";

export interface ServiceRepository {
  list: (params?: FindOptions<ServiceAttributes>) => Promise<Service[]>;
  getById: (id: string) => Promise<Service | null>;
  getBySlug: (slug: string) => Promise<Service | null>;
  save: (
    categoryId: string,
    name: string,
    slug: string,
    icon: string,
  ) => Promise<Service | null>;
}
