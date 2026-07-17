import "dotenv/config";
import dbConnection from "./infrastructure/sequelize/connection";
import Logger from "./infrastructure/pino/logger";
import env from "./config/env";
import rabbitConnection from "./infrastructure/rabbit/connection";
import { server } from "./infrastructure/express/server";
import { registerConsumers } from "@src/infrastructure/rabbit/consumers/register-consumers";
import { expiredLeadsTask } from "./application/jobs/scheduler";

async function bootstrap() {
  await dbConnection.authenticate();
  Logger.info({ message: "Database connection established" });

  await rabbitConnection.connect();
  await registerConsumers();
  await expiredLeadsTask.execute();

  if (env("NODE_ENV") !== "production" && env("NODE_ENV") !== "prod") {
    process.on("unhandledRejection", (reason) => {
      Logger.error({ reason, message: "Unhandled Rejection" });
    });
  }

  server.listen(env("SERVER_PORT"), () =>
    Logger.info({
      port: env("SERVER_PORT"),
      host: env("SERVER_HOST"),
      message: `Server is running`,
    }),
  );
}

bootstrap().catch((error: unknown) => {
  if (error instanceof Error) {
    Logger.error({
      error: { name: error.name, message: error.message },
      message: "App initialization failed",
    });
  } else {
    Logger.error({ error, message: "App initialization failed" });
  }
  process.exit(1);
});
