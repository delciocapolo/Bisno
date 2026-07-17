import type { UseCaseAbstract } from "@src/shared/@types/use-case";
import { sequelizeLogger } from "@src/infrastructure/sequelize/connection";
import type { MixeiroHasSubscription } from "@src/infrastructure/sequelize/models/mixeiro-has-subscription.model";
import type { SequelizeMixeiroHasSubscriptionRepository } from "@src/infrastructure/sequelize/repositories/mixeiro-has-subscription.repository.impl";

export class GetSubscriptionByMixeiroIdUseCase implements UseCaseAbstract<MixeiroHasSubscription | null> {
  constructor(
    private readonly repository: SequelizeMixeiroHasSubscriptionRepository,
  ) {}

  async execute(mixeiroId: string): Promise<MixeiroHasSubscription | null> {
    try {
      const subscription =
        await this.repository.getSubscriptionByMixeiroId(mixeiroId);
      return subscription;
    } catch (error) {
      if (error instanceof Error) {
        sequelizeLogger.error(
          { error: error.message },
          "Error while associating mixeiro to subscription",
        );
      } else {
        sequelizeLogger.error(
          { error },
          "Error while associating mixeiro to subscription",
        );
      }

      return null;
    }
  }
}
