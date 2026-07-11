export interface IEnvironment {
  SERVER_PORT: number;
  SERVER_HOST: string;
  NODE_ENV: "development" | "production";
  TIMEZONE: string;
  JWT_SECRET: string;

  // rabbit
  RABBITMQ_URI: string;

  // database
  DB_NAME: string;
  DB_DIALECT: string;
  DB_PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
}
