import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type {
  Mixeiro,
  MixeiroAttributes,
} from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";
import type { FindOptions } from "sequelize";

export class ListMixeirosUseCase implements UseCaseAbstract<Mixeiro[]> {
  constructor(private readonly mixeiroRepository: SequelizeMixeiroRepository) {}

  async execute(params?: FindOptions<MixeiroAttributes>): Promise<Mixeiro[]> {
    const mixeiro = await this.mixeiroRepository.list(params);
    return mixeiro;
  }
}
