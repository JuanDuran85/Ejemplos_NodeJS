import { describe, expect, jest, test } from "@jest/globals";
import { CreateTable } from "../../../../src/domain/use-case/create-table.use-case";
import { SaveFile } from "../../../../src/domain/use-case/save-file.use-case";
import { ServerApp } from "../../../../src/presentation/server-app";

describe("ServerApp test", () => {
  test("Should create server app instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("Should run ServerApp with options", () => {
    const logSpy = jest.spyOn(console, "debug");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    const options = {
      base: 4,
      limit: 10,
      show: false,
      name: "table",
      destination: "output",
    };

    ServerApp.run(options);

    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith(
      `Server running with options: ${JSON.stringify(options)}...`
    );
    expect(logSpy).toHaveBeenLastCalledWith("File saved");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination: options.destination,
      fileName: `${options.name}_${options.base}`,
    });
  });
});
