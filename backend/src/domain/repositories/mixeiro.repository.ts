import { Mixeiro, MixeiroStatusType } from "../entities/mixeiro.entity.js";

export interface MixeiroRepository {
  list: () => Promise<Mixeiro[]>;
  getMixeiroById: (id: string) => Promise<Mixeiro | null>;
  getMixeiroByMobile: (mobile: string) => Promise<Mixeiro | null>;
  save: (
    zoneId: string,
    categoryId: string,
    name: string,
    bi: string,
    mobile: string,
    hasWhatsapp: boolean,
    channel: MixeiroStatusType,
  ) => Promise<Mixeiro | null>;
}
