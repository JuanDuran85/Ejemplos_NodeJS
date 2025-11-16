import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogDatasources } from "../../domain/datasources/log.datasources";

export class LogRepositoryImpl implements LogRepository {
  private readonly logDatasources: LogDatasources;

  constructor(logDatasource: LogDatasources) {
    this.logDatasources = logDatasource;
  }

  public async saveLog(log: LogEntity): Promise<void> {
    return this.logDatasources.saveLog(log);
  }
  public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasources.getLogs(severityLevel);
  }
}
