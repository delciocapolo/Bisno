import z from "zod";
import type express from "express";
import { Router } from "express";
import { serverLogger } from "../../server.js";
import { schemaFormCreateBisno } from "@src/shared/schemas/form-create-bisno.js";
import { publisher } from "@src/infrastructure/rabbit/adapters/amqp-event-publisher.js";

const bisnoRoutes = Router();

const createBisnoHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const bisno = await schemaFormCreateBisno.parseAsync(req?.body || {});
    serverLogger.info({ bisno }, "Received bisno data");
    await publisher.publish({
      routingKey: "bisno.order.created",
      payload: bisno,
    });
    return res.status(201).json({
      data: bisno,
      message: "Bisno created successfully",
    });
  } catch (error) {
    serverLogger.error({ error }, "Error occurred while processing bisno data");
    if (error instanceof z.ZodError) {
      const erros = error.issues.map((issue) => ({
        field: issue?.path?.at(0),
        error: issue.message,
      }));
      return res.status(422).json({
        data: null,
        message: erros,
      });
    }
    return res.status(500).json({
      data: null,
      message: "An unexpected error occurred while processing bisno data",
    });
  }
};

bisnoRoutes.post("/create", createBisnoHandler);

export { bisnoRoutes };
