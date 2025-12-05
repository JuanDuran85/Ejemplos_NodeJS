import { envs } from "../src/config";
import { ServerApp } from "../src/presentation/server";
import { AppRoutes } from "../src/presentation/routes";

export const testServer: ServerApp = new ServerApp({
  port: envs.PORT,
  public_path: envs.PUBLIC_PATH,
  routes: AppRoutes.routes,
});
