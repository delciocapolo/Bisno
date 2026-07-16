import { z } from "zod";
import {
  OBJECT_BI_VALIDATOR,
  OBJECT_EMAIL_VALIDATOR,
  OBJECT_ID_VALIDATOR,
  OBJECT_MOBILE_VALIDATOR,
} from "./commons";

export const schemaFormCreateMixeiro = z.object({
  categoryId: OBJECT_ID_VALIDATOR,
  zoneId: OBJECT_ID_VALIDATOR,
  customName: z.string().min(1, { error: "Name is required" }),
  fullName: z.string().nullable(),
  bi: OBJECT_BI_VALIDATOR,
  email: OBJECT_EMAIL_VALIDATOR,
  password: z.string().min(1, { error: "Password is required" }),
  channel: z.enum(["whatsapp", "mobile", "email"]).default("mobile"),
  mobile: OBJECT_MOBILE_VALIDATOR,
  hasWhatsapp: z.boolean().optional().default(false),
  verifiedAt: z.date().nullable(),
});
