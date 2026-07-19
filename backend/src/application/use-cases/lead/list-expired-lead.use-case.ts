import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";
import type { Lead } from "@src/infrastructure/sequelize/models/lead.model";
import type { SequelizeLeadRepository } from "@src/infrastructure/sequelize/repositories/lead.repository.impl";
import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import { Op, Sequelize } from "sequelize";

export class ListExpiredLeadUseCase implements UseCaseAbstract<Lead[]> {
  constructor(private readonly repository: SequelizeLeadRepository) {}

  async execute(): Promise<Lead[]> {
    try {
      return await this.repository.list({
        where: {
          notifiedAt: {
            [Op.lte]: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          status: "sent",
          respondedAt: null,
        },
      });
    } catch (error) {
      sequelizeLogger.error(
        { error: (error as Error).message },
        "Error listing leads",
      );
      return [];
    }
  }
}
