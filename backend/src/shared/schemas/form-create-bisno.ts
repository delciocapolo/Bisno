import { z } from "zod";

const OBJECT_ID_VALIDATOR = z.uuid().min(1, { message: "ID is required" });

export const schemaFormCreateBisno = z.object({
  customerName: z.string().min(1, { message: "Name is required" }),
  customerMobile: z
    .e164()
    .min(1, { message: "Mobile is required" })
    .max(15, { message: "Mobile is too long" }),
  customerMobileHasWhatsapp: z.boolean().optional().default(false),
  serviceId: OBJECT_ID_VALIDATOR,
  zoneId: OBJECT_ID_VALIDATOR,
  description: z.string().min(1, { message: "Description is required" }),
});
