import { Sequelize } from "sequelize-typescript";
import env from "@src/config/env.js";
import Logger from "@src/infra/pino/logger.js";

const log = Logger.publishTo({ context: "sequelize" });

class Database {
    private static instance: Sequelize;

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            try {
                Database.instance = new Sequelize({
                    dialect: "postgres",
                    database: env("DB_NAME"),
                    username: env("DB_USER"),
                    password: env("DB_PASSWORD"),
                    host: env("DB_HOST"),
                    port: env.parseInt("DB_PORT"),
                    pool: {
                        max: 10,
                        min: 0,
                        acquire: 30000,
                        idle: 10000,
                    },
                    models: [],
                    logging: false,
                });
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                log.error({ error: message }, "Erro ao configurar instância do Sequelize");
                throw new Error("Database configuration error");
            }

            const shutdown = async () => {
                await Database.instance?.close();
                process.exit(0);
            };

            process.on("SIGINT", shutdown);
            process.on("SIGTERM", shutdown);
        }

        return Database.instance;
    }
}

const dbConnection = Database.getInstance();

export { Database };
export default dbConnection;