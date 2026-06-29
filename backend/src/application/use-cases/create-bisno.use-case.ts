import { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import { BisnoCreatedPayload } from "@src/shared/events/bisno-events.js";
import { Bisno } from "@src/infrastructure/sequelize/models/bisno.model.js";
import { SequelizeBisnoRepository } from "@src/infrastructure/sequelize/repositories/bisno.repository.impl.js";

export class CreateBisnoUseCase implements UseCaseAbstract<Bisno | null>  {
  constructor(
    private readonly bisnoRepository: SequelizeBisnoRepository,
  ) {}

  async execute(params: BisnoCreatedPayload): Promise<Bisno | null> {
    const bisno = await this.bisnoRepository.save(params);
    return bisno;
  }
}
