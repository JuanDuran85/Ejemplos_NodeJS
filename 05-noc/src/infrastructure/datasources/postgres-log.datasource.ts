import { SeverityLevel } from "../../../generated/prisma/enums";
import { prisma } from "../../data";
import { LogDatasources } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const severityLevelEnumConvert = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
  error: SeverityLevel.ERROR,
};

export class PostgresLogDataSource implements LogDatasources {
  public async saveLog(log: LogEntity): Promise<void> {
    try {
      const newLog = await prisma.logModel.create({
        data: {
          ...log,
          level: severityLevelEnumConvert[log.level],
        },
      });
      console.debug(`Postgres Log Created: ${JSON.stringify(newLog)}`);
    } catch (error) {
      console.error(error);
      throw new Error("Error saving log on Postgres");
    }
  }
  public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    let logsFound: { [key: string]: any }[] = [];
    const level: "LOW" | "MEDIUM" | "HIGH" | "ERROR" =
      severityLevelEnumConvert[severityLevel];
    try {
      logsFound = await prisma.logModel.findMany({
        where: { level },
      });
    } catch (error) {
      console.error(String(error));
      throw new Error("Error getting logs from Postgres");
    }

    return logsFound.map(LogEntity.fromObjectDoc);
  }
}
