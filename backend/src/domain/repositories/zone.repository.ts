import type { Zone } from "../entities/zone.entity.js";

export interface ZoneRepository {
  list: () => Promise<Zone[]>;
  getById: (id: string) => Promise<Zone | null>;
  getBySlug: (slug: string) => Promise<Zone | null>;
  save: (name: string, slug: string) => Promise<Zone | null>;
}
