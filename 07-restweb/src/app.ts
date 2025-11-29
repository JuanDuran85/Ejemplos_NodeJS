import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

function main() {
  console.debug("main");
  const server: ServerApp = new ServerApp();
  server.start();
}
