import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { Mixeiro } from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";

export class ListMixeirosUseCase implements UseCaseAbstract<Mixeiro[]> {
  constructor(private readonly mixeiroRepository: SequelizeMixeiroRepository) {}

  async execute(): Promise<Mixeiro[]> {
    const mixeiro = await this.mixeiroRepository.list();
    return mixeiro;
  }
}
