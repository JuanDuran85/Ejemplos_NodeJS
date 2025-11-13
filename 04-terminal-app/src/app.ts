import { yarg } from "./config/plugins/yargs.plugins";

(async () => {
  console.debug("Start app...");
  console.debug(yarg);
  await main();
  console.debug("End app...");
})();

async function main() {
  console.debug("Executed Code");
}
