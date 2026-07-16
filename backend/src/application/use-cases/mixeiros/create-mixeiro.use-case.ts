import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { ICreateMixeiroPayload } from "@src/shared/events/mixeiro-events";
import type { Mixeiro } from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";

export class CreateMixeiroUseCase implements UseCaseAbstract<Mixeiro | null> {
  constructor(private readonly mixeiroRepository: SequelizeMixeiroRepository) {}

  async execute(params: ICreateMixeiroPayload): Promise<Mixeiro | null> {
    try {
      const mixeiro = await this.mixeiroRepository.save(params);
      return mixeiro;
    } catch (error: unknown) {
      if (error instanceof Error) {
        sequelizeLogger.error(
          { error: error.message },
          "Error creating Mixeiro",
        );
      } else {
        sequelizeLogger.error({ error: error }, "Error creating Mixeiro");
      }

      return null;
    }
  }
}
