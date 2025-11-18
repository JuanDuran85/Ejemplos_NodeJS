import { LogModel, MongoDataBase } from "./data";
import { ServerApp } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugins";

(async () => {
  main();
})();

async function main() {
  const mongoUrl: string = envs.MONGO_URL;
  const dbName: string = envs.MONGO_DB_NAME;
  await MongoDataBase.connect({ mongoUrl, dbName });

  const newLog = await LogModel.create({
    message: "Proident proident aliqua mollit labore.",
    level: "LOW",
    origin: "app.ts",
  });
  await newLog.save();
  console.debug(newLog);

  //ServerApp.start();
}
