import { z } from "zod";

export const schemaFormCreateBisno = z.object({
  customerName: z.string().min(1, { message: "Name is required" }),
  customerMobile: z.e164().min(1, { message: "Mobile is required" }),
  customerMobileHasWhatsapp: z.boolean().optional().default(false),
  serviceId: z.string().min(1, { message: "Service is required" }),
  zoneId: z.string().min(1, { message: "Zone is required" }),
  description: z.string().min(1, { message: "Description is required" })
});
