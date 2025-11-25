import { afterAll, beforeAll, describe, expect, it, jest } from "@jest/globals";
import mongoose from "mongoose";
import { afterEach } from "node:test";
import { LogModel, MongoDataBase } from "../../../src/data";
import {
  LogEntity,
  LogSeverityLevel,
} from "../../../src/domain/entities/log.entity";
import { MongoLogDataSource } from "../../../src/infrastructure/datasources/mongo-log.datasource";

const saveLogDatasource: MongoLogDataSource = new MongoLogDataSource();

describe("mongo-log.datasource", () => {
  beforeAll(async () => {
    await MongoDataBase.connect({
      dbName: process.env.MONGO_DB_NAME!,
      mongoUrl: process.env.MONGO_URL!,
    });
    await LogModel.deleteMany({
      level: LogSeverityLevel.HIGH,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({
      level: LogSeverityLevel.HIGH,
    });
  });

  afterAll(async () => {
    await LogModel.deleteMany({
      level: LogSeverityLevel.HIGH,
    });
    mongoose.connection.close();
  });

  it("should create and save log", async () => {
    const logSpy = jest.spyOn(console, "debug");
    const newLogToSave: LogEntity = new LogEntity({
      level: LogSeverityLevel.HIGH,
      message: "test message",
      origin: "mongo-log.datasource.test.ts",
      createdAt: new Date(),
    });
    await saveLogDatasource.saveLog(newLogToSave);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining("Mongo Log Created: ")
    );
  });

  it("should get logs from db", async () => {
    const logFound: LogEntity[] = await saveLogDatasource.getLogs(
      LogSeverityLevel.HIGH
    );
    expect(logFound).toHaveLength(1);
    expect(logFound[0].level).toBe(LogSeverityLevel.HIGH);
  });
});
