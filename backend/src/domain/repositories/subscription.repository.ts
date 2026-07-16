import type {
  Subscription,
  SubscriptionAttributes,
} from "@src/infrastructure/sequelize/models/subscription.model.js";
import type { FindOptions } from "sequelize";

export interface SubscriptionRepository {
  list: (
    params: FindOptions<SubscriptionAttributes>,
  ) => Promise<Subscription[]>;
  getPoints: (id: string) => Promise<number | null>;
  getById: (id: string) => Promise<Subscription | null>;
  getBySlug: (slug: string) => Promise<Subscription | null>;
  save: (
    name: string,
    slug: string,
    points: number,
  ) => Promise<Subscription | null>;
}
