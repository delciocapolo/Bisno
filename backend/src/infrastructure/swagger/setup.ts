import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

export function setupSwagger(app: Express) {
  const spec = swaggerJsdoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "backend",
        description: "",
        version: "1.0.0",
      },
    },
    apis: ["./src/**/*.ts"],
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec));
}
