import { yarg } from "./config/plugins/yargs.plugins";

(async () => {
  console.debug("Start app...");
  await main();
  console.debug("End app...");
})();

async function main() {
  console.debug(yarg);
  console.debug(yarg.base);
  console.debug(yarg.b);
  const { b } = yarg;
  console.debug(b);
  console.debug("Executed Code");
}
