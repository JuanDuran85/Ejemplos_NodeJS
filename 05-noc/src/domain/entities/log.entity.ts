export enum LogSeverityLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(level: LogSeverityLevel, message: string) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  public static fromJson(json: string): LogEntity {
    try {
      const { message, level, createdAt } = JSON.parse(json);
      if (!message || !level || !createdAt)
        throw new Error("Invalid log format");
      const log = new LogEntity(level, message);
      log.createdAt = new Date(createdAt);
      return log;
    } catch (error) {
      console.error(String(error));
      throw new Error("Invalid log format");
    }
  }
}
