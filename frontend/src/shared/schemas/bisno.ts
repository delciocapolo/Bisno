import { z } from "zod";
import { OBJECT_ID_VALIDATOR, OBJECT_MOBILE_VALIDATOR } from "./commons";

export const schemaFormCreateBisno = z.object({
  customerName: z.string().min(1, { error: "Name is required" }),
  customerMobile: OBJECT_MOBILE_VALIDATOR,
  customerMobileHasWhatsapp: z.boolean().optional().default(false),
  serviceId: OBJECT_ID_VALIDATOR,
  zoneId: OBJECT_ID_VALIDATOR,
  description: z.string().min(1, { error: "Description is required" }),
});

export type IFormCreateBisno = z.infer<typeof schemaFormCreateBisno>;
