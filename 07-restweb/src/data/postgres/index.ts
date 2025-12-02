import { PrismaPg } from "@prisma/adapter-pg";
import { DefaultArgs } from "@prisma/client/runtime/client";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import { GlobalOmitConfig } from "../../generated/prisma/internal/prismaNamespace";
import { envs } from "../../config";

const connectionString: string = `${envs.POSTGRES_URL}`;

const adapter: PrismaPg = new PrismaPg({ connectionString });
const prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs> =
  new PrismaClient({ adapter });

export { prisma };
