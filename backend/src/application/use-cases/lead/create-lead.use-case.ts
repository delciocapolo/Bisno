import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { Lead } from "@src/infrastructure/sequelize/models/lead.model";
import type { ICreateLeadPayload } from "@src/shared/events/lead-events";
import type { SequelizeLeadRepository } from "@src/infrastructure/sequelize/repositories/lead.repository.impl";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";

export class CreateLeadUseCase implements UseCaseAbstract<Lead | null> {
  constructor(private readonly repository: SequelizeLeadRepository) {}

  async execute(params: ICreateLeadPayload): Promise<Lead | null> {
    try {
      const lead = await this.repository.save(params);
      return lead;
    } catch (error) {
      sequelizeLogger.error(
        { error: (error as Error).message },
        "Error creating Lead",
      );
      return null;
    }
  }
}
