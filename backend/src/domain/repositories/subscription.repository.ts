import type { Subscription } from "../entities/subscription.entity.js";

export interface SubscriptionRepository {
  list: () => Promise<Subscription[]>;
  getPoints: (id: string) => Promise<number | null>;
  getById: (id: string) => Promise<Subscription | null>;
  getBySlug: (slug: string) => Promise<Subscription | null>;
  save: (
    name: string,
    slug: string,
    points: number,
  ) => Promise<Subscription | null>;
}
