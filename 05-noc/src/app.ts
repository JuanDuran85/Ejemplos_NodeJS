import { MongoDataBase } from "./data";
import { ServerApp } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugins";

(async () => {
  main();
})();

async function main() {
  const mongoUrl: string = envs.MONGO_URL;
  const dbName: string = envs.MONGO_DB_NAME;
  await MongoDataBase.connect({ mongoUrl, dbName });

  //ServerApp.start();
}
