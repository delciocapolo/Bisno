import { Op } from "sequelize";
import { MixeiroHasSubscription } from "@src/infrastructure/sequelize/models/mixeiro-has-subscription.model";
import type { UseCaseAbstract } from "@src/shared/@types/use-case.js";
import type { Mixeiro } from "@src/infrastructure/sequelize/models/mixeiro.model";
import type { SequelizeMixeiroRepository } from "@src/infrastructure/sequelize/repositories/mixeiro.repository.impl";
import type { SequelizeServiceRepository } from "@src/infrastructure/sequelize/repositories/service.repository.impl";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";

interface EligibleMixeiroParams {
  zoneId: string;
  serviceId: string;
}

export class GetNextEligibleMixeiroUseCase implements UseCaseAbstract<Mixeiro | null> {
  constructor(
    private readonly repository: SequelizeMixeiroRepository,
    private readonly serviceRepository: SequelizeServiceRepository,
  ) {}

  async execute(params: EligibleMixeiroParams): Promise<Mixeiro | null> {
    try {
      const { zoneId, serviceId } = params;
      const service = await this.serviceRepository.getById(serviceId);

      if (!service) {
        sequelizeLogger.error({ serviceId: serviceId }, "Service not found");
        return null;
      }

      return await this.repository.getMixeiro({
        where: {
          zoneId: zoneId,
          categoryId: service.categoryId,
          isActive: true,
          isLocked: false,
          deletedAt: null,
          verifiedAt: { [Op.ne]: null },
        },
        include: [
          {
            model: MixeiroHasSubscription,
            required: true,
            where: {
              points: { [Op.gt]: 10 },
            },
            attributes: [],
          },
        ],
        order: [["createdAt", "ASC"]],
        limit: 1,
      });
    } catch (error) {
      if (error instanceof Error) {
        sequelizeLogger.error(
          { error: error.message },
          "Error getting next eligible mixeiro",
        );
      } else {
        sequelizeLogger.error({ error }, "Error getting next eligible mixeiro");
      }

      return null;
    }
  }
}
