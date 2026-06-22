import type { CategoryService } from "../entities/category-service.entity.js";

export interface CategoryServiceRepository {
  list: () => Promise<CategoryService[]>;
  getById: (id: string) => Promise<CategoryService | null>;
  getBySlug: (slug: string) => Promise<CategoryService | null>;
  save: (name: string, slug: string) => Promise<CategoryService | null>;
}
