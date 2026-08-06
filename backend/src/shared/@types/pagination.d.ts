import z from "zod";
import { validatePaginationFilters } from "../schemas/validate-pagination-filters";

export type SchemaValidatePaginationFilters = z.infer<
  typeof validatePaginationFilters
>;
