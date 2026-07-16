import { z } from "zod";
import { schemaFormCreateMixeiro } from "../schemas/form-create-mixeiro";

export type ICreateMixeiroPayload = z.infer<typeof schemaFormCreateMixeiro>;
