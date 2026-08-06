import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { ICreateMixeiroPayload } from "@src/shared/events/mixeiro-events";
import type { Mixeiro } from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";
import { isDefined } from "@src/shared/utils";
import { getMixeiroByUseCase } from "../composition";

export class CreateMixeiroUseCase implements UseCaseAbstract<Mixeiro | null> {
  constructor(private readonly mixeiroRepository: SequelizeMixeiroRepository) {}

  async execute(params: ICreateMixeiroPayload): Promise<Mixeiro | null> {
    try {
      const mixeiro = await getMixeiroByUseCase.execute({ bi: params.bi });
      if (isDefined(mixeiro)) return mixeiro;
      return await this.mixeiroRepository.save(params);
    } catch (error: unknown) {
      sequelizeLogger.error(
        { error: (error as Error).message },
        "Error creating Mixeiro",
      );
      return null;
    }
  }
}
