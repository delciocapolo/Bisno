import { z } from "zod";
import { schemaFormCreateMixeiroSubscription } from "../schemas/form-create-mixeiro-subscription";
import type { Bisno } from "@src/infrastructure/sequelize/models/bisno.model";

export type ICreateMixeiroHasSubscriptionPayload = z.infer<
  typeof schemaFormCreateMixeiroSubscription
>;
