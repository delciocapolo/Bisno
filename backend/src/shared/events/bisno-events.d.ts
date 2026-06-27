import { z } from "zod";
import { schemaFormCreateBisno } from "../schemas/form-create-bisno.ts";

export type BisnoCreatedPayload = z.infer<typeof schemaFormCreateBisno>;

export interface DistributionStartPayload {
  bisnoId: string;
}

export interface NotificationSendPayload {
  bisnoId: string;
  mixeiroId: string;
  mixeiroMobile: string;
  description: string;
}
