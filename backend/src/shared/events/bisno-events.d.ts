import { z } from "zod";
import { schemaFormCreateBisno } from "../schemas/form-create-bisno";
import type { BisnoAttributes } from "@src/infrastructure/sequelize/models/bisno.model";

export type BisnoCreatedPayload = z.infer<typeof schemaFormCreateBisno>;

export type DistributionStartPayload = { bisnoId: string } | BisnoAttributes[];
