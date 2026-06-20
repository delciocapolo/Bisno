import 'dotenv/config';
import dbConnection from './infra/sequelize/connection.js';
import Logger from './infra/pino/logger.js';
import env from './config/env.js';
import rabbitConnection from './infra/rabbit/connection.js';
import { server } from './infra/express/server.js';

async function bootstrap() {
  await dbConnection.authenticate();
  Logger.info({ message: "Conexão com a base de dados estabelecida" });

  await rabbitConnection.connect();

  if (env("NODE_ENV") !== "production" && env("NODE_ENV") !== "prod") {
    process.on('unhandledRejection', (reason, promise) => {
      Logger.error({ reason, message: 'Unhandled Rejection' });
    });
  }

  server.listen(
    env("SERVER_PORT"),
    () => Logger.info({
      port: env("SERVER_PORT"),
      host: env("SERVER_HOST"),
      message: `Server is running`,
    })
  );
}

bootstrap().catch((error: unknown) => {
  if (error instanceof Error) {
    Logger.error({
      error: {
        name: error.name,
        message: error.message,
        // stack: error.stack,
      },
      message: "App initialization failed",
    });
  } else {
    Logger.error({ error, message: "App initialization failed" });
  }
  process.exit(1);
});
