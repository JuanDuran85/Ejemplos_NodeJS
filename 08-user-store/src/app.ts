import { envs } from "./config";
import { AppRoutes, ServerApp } from "./presentation";

(() => {
  main();
})();

function main() {
  console.debug("main");
  const server: ServerApp = new ServerApp({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });
  server.start();
}
