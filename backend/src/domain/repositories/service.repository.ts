import type { Service } from "../entities/service.entity.js";

export interface ServiceRepository {
  list: () => Promise<Service[]>;
  getById: (id: string) => Promise<Service | null>;
  getBySlug: (slug: string) => Promise<Service | null>;
  save: (
    categoryId: string,
    name: string,
    slug: string,
    icon: string,
  ) => Promise<Service | null>;
}
