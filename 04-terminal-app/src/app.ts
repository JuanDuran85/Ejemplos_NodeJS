import { yarg } from "./config/plugins/yargs.plugins";
import { ServerApp } from "./presentation/server-app";

(async () => {
  console.debug("Start app...");
  await main();
  console.debug("End app...");
})();

async function main() {
  const { b: base, l: limit, s: show } = yarg;
  ServerApp.run({ base, limit, show });
  console.debug("Executed Code");
}
