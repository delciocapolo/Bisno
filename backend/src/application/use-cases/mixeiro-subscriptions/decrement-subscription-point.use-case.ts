import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";
import type { UseCaseAbstract } from "@src/shared/@types/use-case";
import type { SequelizeMixeiroHasSubscriptionRepository } from "@src/infrastructure/sequelize/repositories/mixeiro-has-subscription.repository.impl";

export class DecrementSubscriptionPointUseCase implements UseCaseAbstract<boolean> {
  constructor(
    private readonly repository: SequelizeMixeiroHasSubscriptionRepository,
  ) {}

  async execute(subscriptionId: string): Promise<boolean> {
    try {
      const subscription =
        await this.repository.decrementPoints(subscriptionId);
      return subscription;
    } catch (error) {
      if (error instanceof Error) {
        sequelizeLogger.error(
          { error: error.message },
          "Error while decrement subscription points",
        );
      } else {
        sequelizeLogger.error(
          { error },
          "Error while decrement subscription points",
        );
      }

      return false;
    }
  }
}
