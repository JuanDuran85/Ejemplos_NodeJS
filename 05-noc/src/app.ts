import "dotenv/config";
import { ServerApp } from "./presentation/server";
import { MongoDataBase } from "./data";
import { envs } from "./config/plugins/envs.plugins";

(async () => {
  main();
})();

async function main() {
  await MongoDataBase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  ServerApp.start();
}
