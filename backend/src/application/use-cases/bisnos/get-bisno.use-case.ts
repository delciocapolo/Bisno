import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { Bisno } from "@src/infrastructure/sequelize/models/bisno.model.js";
import type { SequelizeBisnoRepository } from "@src/infrastructure/sequelize/repositories/bisno.repository.impl.js";

export class GetBisnoUseCase implements UseCaseAbstract<Bisno | null> {
  constructor(private readonly repository: SequelizeBisnoRepository) {}

  async execute(id: string): Promise<Bisno | null> {
    const bisno = await this.repository.getBisnoById(id);
    return bisno;
  }
}
