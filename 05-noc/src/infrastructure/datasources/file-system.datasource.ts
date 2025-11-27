import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { LogDatasources } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasources {
  private readonly logPath: string = "logs/";
  private readonly allLogsPath: string = "logs/all-logs.log";
  private readonly lowLogsPath: string = "logs/low-logs.log";
  private readonly mediumLogsPath: string = "logs/medium-logs.log";
  private readonly highLogsPath: string = "logs/high-logs.log";
  private readonly errorLogsPath: string = "logs/error-logs.log";
  private readonly logsLevelPaths: string[] = [
    this.allLogsPath,
    this.lowLogsPath,
    this.mediumLogsPath,
    this.highLogsPath,
    this.errorLogsPath,
  ];

  constructor() {
    this.createFile();
  }

  private createFile(): void {
    try {
      if (!existsSync(this.logPath)) {
        mkdirSync(this.logPath);
      }

      for (const path of this.logsLevelPaths) {
        if (existsSync(path)) return;
        writeFileSync(path, "");
      }
    } catch (error) {
      console.error(String(error));
      throw new Error("Error creating log directory");
    }
  }

  private getLogFromFile(path: string): LogEntity[] {
    const actualContent: string = readFileSync(path, { encoding: "utf-8" });

    if (actualContent === "") return [];

    const stringLogs: LogEntity[] = actualContent
      .split("\n")
      .filter((log) => log !== "")
      .map(LogEntity.fromJson);
    return stringLogs;
  }

  public async saveLog(newLog: LogEntity): Promise<void> {
    try {
      const logAsJson: string = `${JSON.stringify(newLog)}\n`;
      appendFileSync(this.allLogsPath, logAsJson);

      const levelPaths: Partial<Record<LogSeverityLevel, string>> = {
        [LogSeverityLevel.MEDIUM]: this.mediumLogsPath,
        [LogSeverityLevel.HIGH]: this.highLogsPath,
        [LogSeverityLevel.ERROR]: this.errorLogsPath,
      };

      if (newLog.level === LogSeverityLevel.LOW) return;

      const path: string | undefined = levelPaths[newLog.level];
      if (path) {
        appendFileSync(path, logAsJson);
      }
    } catch (error) {
      console.error(String(error));
      throw new Error("Error saving log file");
    }
  }

  public async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.LOW:
        return this.getLogFromFile(this.allLogsPath);
      case LogSeverityLevel.MEDIUM:
        return this.getLogFromFile(this.mediumLogsPath);
      case LogSeverityLevel.HIGH:
        return this.getLogFromFile(this.highLogsPath);
      case LogSeverityLevel.ERROR:
        return this.getLogFromFile(this.errorLogsPath);
      default:
        throw new Error(
          `Invalid severity level. The ${severityLevel}, is not valid`
        );
    }
  }
}
