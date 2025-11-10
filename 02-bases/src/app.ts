import { buildLogger } from "./plugins";

const logger = buildLogger("app.ts");

logger.log("Logger from app.ts");
logger.error("Error from app.ts");
