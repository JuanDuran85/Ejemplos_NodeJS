import { describe, expect, it } from "@jest/globals";
import { CreateTable } from "../../../src/domain/use-case/create-table.use-case";

describe("CreateTableUseCase", () => {
  it("should be create table with default values", () => {
    const options = {
      base: 6,
      limit: 20,
    };

    const createTable: CreateTable = new CreateTable();
    const table: string = createTable.execute(options);
    const row: number = table.split("\n").length;

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(typeof table).toBe("string");
    expect(table).toContain("6 x 1 = 6");
    expect(table).toContain("6 x 2 = 12");
    expect(table).toContain("6 x 20 = 120");
    expect(row).toBe(20);
  });

  it("should create table with custom values", () => {
    const options = {
      base: 7,
      limit: 7,
    };

    const createTable: CreateTable = new CreateTable();
    const table: string = createTable.execute(options);
    const row: number = table.split("\n").length;

    expect(row).toBe(options.limit);
    expect(table).toContain(
      `${options.base} x ${options.limit} = ${options.base * options.limit}`
    );
  });
});
