import type { FindOptions } from "sequelize";
import type {
  Lead,
  LeadAttributes,
} from "@src/infrastructure/sequelize/models/lead.model";
import type { ICreateLeadPayload } from "@src/shared/events/lead-events";

export interface LeadRepository {
  list: (params?: FindOptions<LeadAttributes>) => Promise<Lead[]>;
  getLeadById: (id: string) => Promise<Lead | null>;
  getLeadByMixeiroId: (mixeiroId: string) => Promise<Lead[]>;
  getLeadByBisnoId: (bisnoId: string) => Promise<Lead | null>;
  save: ({ bisnoId, mixeiroId }: ICreateLeadPayload) => Promise<Lead | null>;
}
