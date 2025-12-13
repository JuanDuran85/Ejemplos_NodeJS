import { EnvVarAdapter } from "./config";
import { AppRoutes, ServerApp } from "./presentation";

(async () => {
  main();
})();

async function main() {
  const envs = EnvVarAdapter.getEnvs();
  const server: ServerApp = new ServerApp({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}
