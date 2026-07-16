import { z } from "zod";
import { schemaFormCreateMixeiroSubscription } from "../schemas/form-create-mixeiro-subscription";
import type { Bisno } from "@src/infrastructure/sequelize/models/bisno.model";
import { schemaFormCreateLead } from "../schemas/form-create-lead";

export type ICreateLeadPayload = z.infer<typeof schemaFormCreateLead>;
