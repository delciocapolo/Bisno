import { z } from "zod";
import { schemaFormCreateBisno } from "../schemas/form-create-bisno.ts";
import type { BisnoAttributes } from "@src/infrastructure/sequelize/models/bisno.model.js";

export type BisnoCreatedPayload = z.infer<typeof schemaFormCreateBisno>;

export type DistributionStartPayload = { bisnoId: string } | BisnoAttributes[];

export interface NotificationSendPayload {
  bisnoId: string;
  mixeiroId: string;
  mixeiroMobile: string;
  description: string;
}
