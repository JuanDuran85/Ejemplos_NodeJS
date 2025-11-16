import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { LogDatasources } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasources {
  private readonly logPath: string = "logs/";
  private readonly lowLogsPath: string = "logs/low-logs.log/";
  private readonly mediumLogsPath: string = "logs/medium-logs.log/";
  private readonly highLogsPath: string = "logs/high-logs.log/";
  private readonly errorLogsPath: string = "logs/error-logs.log/";

  constructor() {
    this.createFile();
  }

  private createFile() {
    try {
      if (!existsSync(this.logPath)) {
        mkdirSync(this.logPath);
      }

      [
        this.lowLogsPath,
        this.mediumLogsPath,
        this.highLogsPath,
        this.errorLogsPath,
      ].forEach((path) => {
        if (!existsSync(path)) return;
        writeFileSync(path, "");
      });
    } catch (error) {
      console.error(String(error));
      throw new Error("Error creating log directory");
    }
  }

  public saveLog(log: LogEntity): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
