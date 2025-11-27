//@ts-ignore
import * as path from "node:path";

import { beforeEach, describe, expect, it } from "@jest/globals";
//@ts-ignore
import * as fs from "node:fs";
import { FileSystemDatasource } from "../../../src/infrastructure/datasources/file-system.datasource";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";

//@ts-ignore
const logPath: string = path.join(__dirname, "../../../logs");

describe("File System DataSource Test", () => {
  beforeEach(async () => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  it("Should create log files if the do not exists", async () => {
    new FileSystemDatasource();
    const files: string[] = fs.readdirSync(logPath);
    expect(files).toEqual([
      "all-logs.log",
      "error-logs.log",
      "high-logs.log",
      "low-logs.log",
      "medium-logs.log",
    ]);
  });

  it("Should save a log in all-logs.log file", async () => {
    const fileSaved: FileSystemDatasource = new FileSystemDatasource();
    const newLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.LOW,
      message: "Test One from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    await fileSaved.saveLog(newLog);
    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, {
      encoding: "utf-8",
    });
    expect(allLogs).toContain(newLog.message);
    expect(allLogs).toContain(JSON.stringify(newLog));
  });

  it("Should save a log in all-logs.log and medium-logs.log files", async () => {
    const fileSaved: FileSystemDatasource = new FileSystemDatasource();
    const newLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.MEDIUM,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    await fileSaved.saveLog(newLog);
    const mediumLogs = fs.readFileSync(`${logPath}/medium-logs.log`, {
      encoding: "utf-8",
    });
    expect(mediumLogs).toContain(newLog.message);
    expect(mediumLogs).toContain(JSON.stringify(newLog));
  });

  it("Should save a log in all-logs.log and high-logs.log files", async () => {
    const fileSaved: FileSystemDatasource = new FileSystemDatasource();
    const newLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.HIGH,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    await fileSaved.saveLog(newLog);
    const highLogs = fs.readFileSync(`${logPath}/high-logs.log`, {
      encoding: "utf-8",
    });
    expect(highLogs).toContain(newLog.message);
    expect(highLogs).toContain(JSON.stringify(newLog));
  });

  it("should return all logs", async () => {
    const fileSaved: FileSystemDatasource = new FileSystemDatasource();
    const newAllLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.LOW,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    const newMediumLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.MEDIUM,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    const newHighLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.HIGH,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    const newErrorLog: LogEntity = new LogEntity({
      level: LogSeverityLevel.ERROR,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });

    await fileSaved.saveLog(newAllLog);
    await fileSaved.saveLog(newMediumLog);
    await fileSaved.saveLog(newHighLog);
    await fileSaved.saveLog(newErrorLog);

    const allLogs = await fileSaved.getLogs(LogSeverityLevel.LOW);
    expect(allLogs).toHaveLength(4);
    expect(allLogs).toContainEqual(newAllLog);
    expect(allLogs).toContainEqual(newMediumLog);
    expect(allLogs).toContainEqual(newHighLog);
    expect(allLogs).toContainEqual(newErrorLog);

    const mediumLogs = await fileSaved.getLogs(LogSeverityLevel.MEDIUM);
    expect(mediumLogs).toHaveLength(1);
    expect(mediumLogs).toContainEqual(newMediumLog);

    const highLogs = await fileSaved.getLogs(LogSeverityLevel.HIGH);
    expect(highLogs).toHaveLength(1);
    expect(highLogs).toContainEqual(newHighLog);

    const errorLogs = await fileSaved.getLogs(LogSeverityLevel.ERROR);
    expect(errorLogs).toHaveLength(1);
    expect(errorLogs).toContainEqual(newErrorLog);
  });

  it("should throw an error if Invalid severity level is passed", async () => {
    const fileSaved: FileSystemDatasource = new FileSystemDatasource();
    const customSeverityLevel = "NO_LEVEL" as LogSeverityLevel;
    const newAllLog: LogEntity = new LogEntity({
      level: customSeverityLevel,
      message: "Test Two from LogDatasource test",
      origin: "file-system.datasource.test.ts",
    });
    await fileSaved.saveLog(newAllLog);
    try {
      await fileSaved.getLogs(customSeverityLevel);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      console.debug(error);
      expect(error).toHaveProperty(
        "message",
        `Invalid severity level. The ${customSeverityLevel}, is not valid`
      );
    }
  });
});
