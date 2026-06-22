import { MixeiroHasSubcription } from "../entities/mixeiro-has-subcription.entity.js";

export interface MixeiroHasSubcriptionRepository {
  list: () => Promise<MixeiroHasSubcription[]>;
  getSubscription: (subscriptionId: string, mixeiroId: string) => Promise<MixeiroHasSubcription | null>;
  getCurrentPoints: (subscriptionId: string, mixeiroId: string) => Promise<number | null>;
  incrementPoints: (subscriptionId: string, mixeiroId: string) => Promise<boolean>;
  decrementPoints: (subscriptionId: string, mixeiroId: string) => Promise<boolean>;
  save: (subscriptionId: string, mixeiroId: string,) => Promise<MixeiroHasSubcription | null>;
}
