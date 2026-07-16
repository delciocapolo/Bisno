import type {
  Mixeiro,
  MixeiroAttributes,
} from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { RequiredNonNullable } from "@src/shared/@types/custom";
import type { ICreateMixeiroPayload } from "@src/shared/events/mixeiro-events";
import type { FindOptions } from "sequelize";

type IFilterList = FindOptions<MixeiroAttributes>;

export interface MixeiroRepository {
  list: (filters?: IFilterList) => Promise<Mixeiro[]>;
  getMixeiroById: (id: string) => Promise<Mixeiro | null>;
  getMixeiroByMobile: (mobile: string) => Promise<Mixeiro | null>;
  getMixeiroByEmail: (email: string) => Promise<Mixeiro | null>;
  getMixeiro: (
    params: RequiredNonNullable<IFilterList, "where">,
  ) => Promise<Mixeiro | null>;
  save: (params: ICreateMixeiroPayload) => Promise<Mixeiro | null>;
}
