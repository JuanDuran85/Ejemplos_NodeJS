import { LogModel } from "../../data";
import { LogDatasources } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDatasources {
  public async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    await newLog.save();
    console.debug(`Mongo Log Created: ${newLog.id}`);
  }

  public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logsFromDb = await LogModel.find({
      level: severityLevel,
    });

    return logsFromDb.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
