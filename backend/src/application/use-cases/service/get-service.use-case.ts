import type { Service } from "@src/infrastructure/sequelize/models/service.model";
import type { SequelizeServiceRepository } from "@src/infrastructure/sequelize/repositories/service.repository.impl";
import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";

export class GetServiceUseCase implements UseCaseAbstract<Service | null> {
  constructor(private readonly repository: SequelizeServiceRepository) {}

  async execute(id: string): Promise<Service | null> {
    const service = await this.repository.getById(id);
    return service;
  }
}
