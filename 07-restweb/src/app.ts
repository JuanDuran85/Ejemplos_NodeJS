import { envs } from "./config/envs";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

function main() {
  console.debug("main");
  const server: ServerApp = new ServerApp({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
  });
  server.start();
}
