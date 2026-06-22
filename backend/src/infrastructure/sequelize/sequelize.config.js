require('ts-node/register');
const env = require("../../config/env");

module.exports = {
  username: env("DB_USER"),
  password: env("DB_PASSWORD"),
  database: env("DB_NAME"),
  host: env("DB_HOST"),
  port: env("DB_PORT"),
  dialect: env("DB_DIALECT"),
};
