import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import type { Bisno } from "@src/infrastructure/sequelize/models/bisno.model.js";
import type { SequelizeBisnoRepository } from "@src/infrastructure/sequelize/repositories/bisno.repository.impl.js";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";

export class CreateBisnoUseCase implements UseCaseAbstract<Bisno | null> {
  constructor(private readonly bisnoRepository: SequelizeBisnoRepository) {}

  async execute(params: BisnoCreatedPayload): Promise<Bisno | null> {
    try {
      const bisno = await this.bisnoRepository.save(params);
      return bisno;
    } catch (error) {
      sequelizeLogger.error(
        { error: (error as Error).message },
        "Error creating Bisno",
      );
      return null;
    }
  }
}
