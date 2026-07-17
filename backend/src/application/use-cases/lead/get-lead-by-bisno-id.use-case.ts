import type { Lead } from "@src/infrastructure/sequelize/models/lead.model";
import type { SequelizeLeadRepository } from "@src/infrastructure/sequelize/repositories/lead.repository.impl";
import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";

export class GetLeadByBisnoIdUseCase implements UseCaseAbstract<Lead | null> {
  constructor(private readonly repository: SequelizeLeadRepository) {}

  async execute(bisnoId: string): Promise<Lead | null> {
    const lead = await this.repository.getLeadByBisnoId(bisnoId);
    return lead;
  }
}
