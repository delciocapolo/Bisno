import { z } from "zod";

export const OBJECT_ID_VALIDATOR = z.uuid().min(1, { error: "ID is required" });

export const OBJECT_BI_VALIDATOR = z
  .string()
  .min(1, { error: "BI is required" })
  .regex(/^\d{9}[A-Z]{2}\d{3}$/, "Invalid BI (ex: 123456789LA042).");

export const OBJECT_MOBILE_VALIDATOR = z
  .e164()
  .min(9, { error: "Mobile is required" })
  .max(13, { error: "Mobile is too long" });
// .refine(
//   (val) => /^9\d{8}$/.test(val.replace(/\s/g, "")),
//   "Digit a valid phone number (e.g. 9XX XXX XXX).",
// );

export const OBJECT_EMAIL_VALIDATOR = z
  .email({ error: "Invalid email" })
  .min(1, { error: "Email is required" });
