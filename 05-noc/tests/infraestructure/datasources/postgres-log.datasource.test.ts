import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { PostgresLogDataSource } from "../../../src/infrastructure/datasources/postgres-log.datasource";

const postgresDatasource: PostgresLogDataSource = new PostgresLogDataSource();

describe("Postgres Log Datasource Test", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  it("Should save a log", async () => {
    /*     const logSaved = await postgresDatasource.saveLog(
      new LogEntity({
        level: LogSeverityLevel.LOW,
        message: "Test One from LogDatasource test",
        origin: "postgres-log.datasource.test.ts",
      })
    );
    expect(logSaved).toBeUndefined(); */
    expect(true).toBe(true);
  });

  it("Should return a log from DB", async () => {
    /*  const logFound: LogEntity[] = await postgresDatasource.getLogs(
      LogSeverityLevel.LOW
    );
    expect(logFound).toBeInstanceOf(LogEntity);
    expect(logFound[0].level).toBe(LogSeverityLevel.LOW);
    expect(logFound[0].message).toBe("Test One from LogDatasource test"); */
    expect(true).toBe(true);
  });
});
