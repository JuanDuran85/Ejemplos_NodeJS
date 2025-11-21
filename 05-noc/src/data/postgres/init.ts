import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
//@ts-ignore
import { PrismaClient } from "../../../generated/prisma/client";
import { envs } from "../../config/plugins/envs.plugins";
import { GlobalOmitConfig } from "../../../generated/prisma/internal/prismaNamespace";
import { DefaultArgs } from "@prisma/client/runtime/client";

const connectionString: string = `${envs.POSTGRES_URL}`;

const adapter: PrismaPg = new PrismaPg({ connectionString });
const prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs> =
  new PrismaClient({ adapter });

export { prisma };
