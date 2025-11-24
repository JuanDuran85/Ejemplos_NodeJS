import { describe, expect, it } from "@jest/globals";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

const newLogObject = {
  message: "New Message Log",
  level: LogSeverityLevel.MEDIUM,
  origin: "log.entity.test.ts",
};

describe("Log Entity Test", () => {
  const log: LogEntity = new LogEntity(newLogObject);
  it("should create a LogEntity instance", () => {
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toEqual(newLogObject.level);
    expect(log.origin).toEqual(newLogObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.message).toEqual(newLogObject.message);
  });

  it("should cerate LogEntity instance from Json", () => {
    const jsonLog: string = `{"level":"low","message":"Service http://alirafael.com is working","origin":"check-service","createdAt":"2025-11-23T20:53:00.901Z"}`;
    const newLog = LogEntity.fromJson(jsonLog);
    expect(newLog.level).toBe("low");
    expect(newLog).toBeInstanceOf(LogEntity);
    expect(newLog.origin).toEqual("check-service");
    expect(newLog.createdAt).toBeInstanceOf(Date);
    expect(newLog.message).toEqual("Service http://alirafael.com is working");
  });

  it("should create a log entity instant from object", () => {
    const log = LogEntity.fromObjectDoc(newLogObject);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toEqual(newLogObject.level);
    expect(log.origin).toEqual(newLogObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
    expect(log.message).toEqual(newLogObject.message);
  });

  it("should generate an error from wrong json", () => {
    const jsonLog: string = `{"origin":"check-service","createdAt":"2025-11-23T20:53:00.901Z"}`;

    try {
      LogEntity.fromJson(jsonLog);
    } catch (error) {
      expect(String(error)).toBe("Error: Invalid log format");
    }
  });

  it("should generate an error from wrong log object", () => {
    const newLogObject = {
      message: "New Message Log",
      level: LogSeverityLevel.MEDIUM,
    };

    try {
      LogEntity.fromObjectDoc(newLogObject);
    } catch (error) {
      expect(String(error)).toBe("Error: Invalid log format");
    }
  });
});
