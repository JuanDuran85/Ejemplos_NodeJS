export enum LogSeverityLevel {
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export interface LogEntityInterface {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public origin: string;
  public createdAt?: Date;

  constructor(options: LogEntityInterface) {
    const { level, message, origin, createdAt = new Date() } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  public static fromJson(json: string): LogEntity {
    try {
      const finalJson = json === "" ? "{}" : json;
      const { message, level, createdAt } = JSON.parse(finalJson);
      if (!message || !level || !createdAt)
        throw new Error("Invalid log format");
      const log: LogEntity = new LogEntity({
        level,
        message,
        origin: "LogEntity.ts",
        createdAt,
      });
      return log;
    } catch (error) {
      console.error(String(error));
      throw new Error("Invalid log format");
    }
  }

  public static fromObject(objectIn: { [key: string]: any }): LogEntity {
    try {
      const { message, level, createAt = new Date(), origin } = objectIn._doc;

      if (!message || !level || !createAt || !origin)
        throw new Error("Invalid log format");

      const log: LogEntity = new LogEntity({
        level,
        message,
        origin,
        createdAt: createAt,
      });
      return log;
    } catch (error) {
      console.error(String(error));
      throw new Error("Invalid log format");
    }
  }
}
