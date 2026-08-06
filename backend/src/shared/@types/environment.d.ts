export interface IEnvironment {
  APP_PORT: number;
  APP_HOST: string;
  NODE_ENV: "development" | "production";
  TIMEZONE: string;
  JWT_SECRET: string;

  // Evolution
  SERVER_URL: string;
  SERVER_HOST: string;
  AUTHENTICATION_API_KEY: string;

  // WAHA
  WAHA_URL: string;
  WAHA_API_KEY: string;

  DEFAULT_SESSION_NAME: string;

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
