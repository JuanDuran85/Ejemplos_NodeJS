import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  EMAIL_NAME: env.get("EMAIL_NAME").required().asEmailString(),
  EMAIL_KEY: env.get("EMAIL_KEY").required().asString(),
  PROD: env.get("PROD").required().asBool(),
  EMAIL_SERVICE: env.get("EMAIL_SERVICE").required().asString(),
  MONGO_URL: env.get("MONGO_URL").required().asString(),
  MONGO_USER: env.get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: env.get("MONGO_PASSWORD").required().asString(),
  MONGO_DB_NAME: env.get("MONGO_DB_NAME").required().asString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_URL: env.get("POSTGRES_URL").required().asString(),
  POSTGRES_PORT: env.get("POSTGRES_PORT").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
};
