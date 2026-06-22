import type { Lead } from "../entities/lead.entity.js";

export interface LeadRepository {
  list: () => Promise<Lead[]>;
  getLeadById: (id: string) => Promise<Lead | null>;
  getLeadByMixeiroId: (mixeiroId: string) => Promise<Lead[]>;
  getLeadByBisnoId: (bisnoId: string) => Promise<Lead | null>;
  save: (bisnoId: string, mixeiroId: string) => Promise<Lead | null>;
}
