import winston, { format as winstonFormat } from "winston";
const { combine, timestamp, json } = winstonFormat;

type BuilderLoggerInterface = {
  log: (message: string) => winston.Logger;
  error: (message: string) => winston.Logger;
};

const logger: winston.Logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

export const buildLogger: (service: string) => BuilderLoggerInterface = (
  service: string
) => {
  return {
    log: (message: string) => logger.log("info", { message, service }),
    error: (message: string) => logger.error("error", { message, service }),
  };
};
