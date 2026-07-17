import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { Mixeiro } from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";

export class GetMixeiroByIdUseCase implements UseCaseAbstract<Mixeiro | null> {
  constructor(private readonly repository: SequelizeMixeiroRepository) {}

  async execute(id: string): Promise<Mixeiro | null> {
    const mixeiro = await this.repository.getMixeiroById(id);
    return mixeiro;
  }
}
