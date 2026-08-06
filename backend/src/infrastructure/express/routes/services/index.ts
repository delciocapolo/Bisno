import z from "zod";
import type express from "express";
import { Router } from "express";
import { serverLogger } from "../../server.js";
import { Pagination } from "@src/shared/utils/pagination.js";
import { Service } from "@src/infrastructure/sequelize/models/service.model.js";
import { validatePaginationFilters } from "@src/shared/schemas/validate-pagination-filters.js";
import { IApiResponse } from "@src/shared/@types/api-response.js";

const serviceRoutes = Router();

const listServicesHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const filters = await validatePaginationFilters.parseAsync(req.query || {});
    const pagination = new Pagination(Service);
    const { data, ...paginated } = await pagination.paginate(filters);
    return res.status(200).json({
      data: data,
      meta: { errors: null, pagination: paginated },
    } satisfies IApiResponse);
  } catch (error) {
    serverLogger.error({ error }, "Error occurred while processing bisno data");
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => ({
        field: issue?.path?.at(0),
        error: issue.message,
      }));
      return res.status(422).json({
        data: null,
        meta: { errors: errors },
      } satisfies IApiResponse);
    }
    return res.status(500).json({
      data: null,
      meta: {
        errors: [
          {
            field: undefined,
            error: "An unexpected error occurred while processing bisno data",
          },
        ],
      },
    } satisfies IApiResponse);
  }
};

serviceRoutes.get("/", listServicesHandler);

export { serviceRoutes };
