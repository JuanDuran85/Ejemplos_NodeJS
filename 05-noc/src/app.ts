import { PrismaPg } from "@prisma/adapter-pg";
import { DefaultArgs } from "@prisma/client/runtime/client";
import "dotenv/config";
//@ts-ignore
import { PrismaClient } from "../generated/prisma/client";
import { GlobalOmitConfig } from "../generated/prisma/internal/prismaNamespace";
import { envs } from "./config/plugins/envs.plugins";
import { MongoDataBase } from "./data";
import { ServerApp } from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  const mongoUrl: string = envs.MONGO_URL;
  const dbName: string = envs.MONGO_DB_NAME;
  await MongoDataBase.connect({ mongoUrl, dbName });
  const connectionString = `${envs.POSTGRES_URL}`;
  const adapter: PrismaPg = new PrismaPg({ connectionString });
  const prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs> =
    new PrismaClient({ adapter });
  const newLog = await prisma.logModel.create({
    data: {
      message: "New Log from ServerApp",
      origin: "ServerApp.ts",
      level: "HIGH",
    },
  });
  console.debug(newLog);

  const logsFound = await prisma.logModel.findMany();
  console.debug(logsFound);
  //ServerApp.start();
}
