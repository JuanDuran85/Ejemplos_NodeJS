import "dotenv/config";
import * as env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  EMAIL_NAME: env.get("EMAIL_NAME").required().asEmailString(),
  EMAIL_KEY: env.get("EMAIL_KEY").required().asString(),
  PROD: env.get("PROD").required().asBool(),
  EMAIL_SERVICE: env.get("EMAIL_SERVICE").required().asString(),
};
