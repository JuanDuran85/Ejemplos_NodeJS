import { describe, it, expect } from "@jest/globals";
import { LogDatasources } from "../../../src/domain/datasources/log.datasources";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

const newLog: {
  level:
    | LogSeverityLevel.LOW
    | LogSeverityLevel.MEDIUM
    | LogSeverityLevel.HIGH
    | LogSeverityLevel.ERROR;
  message: string;
  origin: string;
  createdAt?: Date;
} = new LogEntity({
  origin: "log.datasource.test.ts",
  message: "Test One from LogDatasource test",
  level: LogSeverityLevel.HIGH,
});

describe("Log Data Source Test", () => {
  class MockLogDatasources implements LogDatasources {
    public async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    public async getLogs(
      severityLevel: LogSeverityLevel
    ): Promise<LogEntity[]> {
      return [newLog];
    }
  }
  it("Should test the abstract class", () => {
    const mockLogDatasources: MockLogDatasources = new MockLogDatasources();
    expect(mockLogDatasources).toBeInstanceOf(MockLogDatasources);
    expect(typeof mockLogDatasources.getLogs).toBe("function");
    expect(typeof mockLogDatasources.saveLog).toBe("function");
  });

  it("should save and return a log", async () => {
    const mockLogDatasources: MockLogDatasources = new MockLogDatasources();
    await mockLogDatasources.saveLog(newLog);
    const logs = await mockLogDatasources.getLogs(LogSeverityLevel.HIGH);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
