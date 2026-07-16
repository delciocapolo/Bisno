import { z } from "zod";
import { OBJECT_ID_VALIDATOR } from "./commons";

export const schemaFormCreateLead = z.object({
  mixeiroId: OBJECT_ID_VALIDATOR,
  bisnoId: OBJECT_ID_VALIDATOR,
});
