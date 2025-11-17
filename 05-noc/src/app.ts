import { envs } from "./config/plugins/envs.plugins";
import { ServerApp } from "./presentation/server";

(() => {
  main();
})();

function main() {
  //ServerApp.start();
  console.debug(envs);
}
