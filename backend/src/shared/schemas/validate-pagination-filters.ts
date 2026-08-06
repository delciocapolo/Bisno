import { paginationConfig } from "@src/config/pagination";
import z from "zod";

export const validatePaginationFilters = z.object({
  page: z
    .number({ error: "Query string must be [number]" })
    .optional()
    .default(paginationConfig.start),
  pageSize: z
    .number({ error: "Query string must be [number]" })
    .optional()
    .default(paginationConfig.limit),
});
