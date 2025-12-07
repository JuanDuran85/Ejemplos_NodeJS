import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
  MONGO_URL: get("MONGO_URL").required().asString(),
  MONGO_DB_NAME: get("MONGO_DB_NAME").required().asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  JWT_EXPIRES_IN: get("JWT_EXPIRES_IN").required().asString(),
  EMAIL_SERVICE: get("EMAIL_SERVICE").required().asString(),
  EMAIL_NAME: get("EMAIL_NAME").required().asString(),
  EMAIL_KEY: get("EMAIL_KEY").required().asString(),
  WEB_SERVICE_URL: get("WEB_SERVICE_URL").required().asString(),
  SEND_EMAIL: get("SEND_EMAIL").default("false").asBool(),
};
