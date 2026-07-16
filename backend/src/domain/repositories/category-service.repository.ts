import type { CategoryService } from "@src/infrastructure/sequelize/models/category-service.model";

export interface CategoryServiceRepository {
  list: () => Promise<CategoryService[]>;
  getById: (id: string) => Promise<CategoryService | null>;
  getBySlug: (slug: string) => Promise<CategoryService | null>;
  save: (name: string, slug: string) => Promise<CategoryService | null>;
}
