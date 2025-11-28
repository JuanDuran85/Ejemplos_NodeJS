import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { LogDatasources } from "../../../src/domain/datasources/log.datasources";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { LogRepositoryImpl } from "../../../src/infrastructure/repositories/log.repository.impl";

const logDatasources = {
  saveLog: jest.fn(),
  getLogs: jest.fn(),
} as LogDatasources;

describe("LogRepositoryImpl", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call saveLog", async () => {
    const logRepositoryImpl: LogRepositoryImpl = new LogRepositoryImpl(
      logDatasources
    );
    const log: LogEntity = new LogEntity({
      message: "Test log",
      level: LogSeverityLevel.LOW,
      origin: "Test origin",
    });

    await logRepositoryImpl.saveLog(log);

    expect(logDatasources.saveLog).toHaveBeenCalledWith(log);
    expect(logDatasources.saveLog).toHaveBeenCalledTimes(1);
  });

  it("should call getLogs", async () => {
    const logRepositoryImpl: LogRepositoryImpl = new LogRepositoryImpl(
      logDatasources
    );

    const severityLog = LogSeverityLevel.LOW;

    await logRepositoryImpl.getLogs(severityLog);

    expect(logDatasources.getLogs).toHaveBeenCalledWith(severityLog);
    expect(logDatasources.getLogs).toHaveBeenCalledTimes(1);
  });
});
