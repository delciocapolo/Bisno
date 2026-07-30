import { z } from "zod";

export const formCreateMixeiroSchema = z.object({
  customName: z.string().min(3, "Nome muito curto"),
  bi: z
    .string()
    .regex(/^\d{9}[A-Z]{2}\d{3}$/, "BI inválido (ex: 123456789LA042)")
    .min(9, "BI inválido"),
  mobile: z.string().regex(/^9\d{8}$/, "Número inválido"),
  hasWhatsapp: z.boolean(),
  channel: z.enum(["whatsapp", "mobile"]),
  categoryId: z.string().min(1, "Escolhe um serviço"),
  zoneId: z.string().min(1, "Escolhe uma zona"),
});
