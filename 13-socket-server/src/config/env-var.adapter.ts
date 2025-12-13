import "dotenv/config";
import { get } from "env-var";

export class EnvVarAdapter {
  public static getEnvs() {
    return {
      PORT: get("PORT").required().asPortNumber(),
      PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
    };
  }
}
