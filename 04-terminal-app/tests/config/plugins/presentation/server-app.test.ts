import { describe, expect, jest, test } from "@jest/globals";
import { CreateTable } from "../../../../src/domain/use-case/create-table.use-case";
import { SaveFile } from "../../../../src/domain/use-case/save-file.use-case";
import { ServerApp } from "../../../../src/presentation/server-app";

const options = {
  base: 4,
  limit: 10,
  show: false,
  name: "table",
  destination: "output",
};

describe("ServerApp test", () => {
  test("Should create server app instance", () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  test("Should run ServerApp with options", () => {
    const debugSpy = jest.spyOn(console, "debug");
    const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

    ServerApp.run(options);

    expect(debugSpy).toHaveBeenCalledTimes(4);
    expect(debugSpy).toHaveBeenCalledWith(
      `Server running with options: ${JSON.stringify(options)}...`
    );
    expect(debugSpy).toHaveBeenLastCalledWith("File saved");

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

  test("should ", () => {
    const returnCreate: string = "1 x 2 = 2";

    const debugMock = jest.fn();
    const errorMock = jest.fn();
    const createMock = jest.fn().mockReturnValue(returnCreate);
    const saveFilaMock = jest.fn().mockReturnValue(true);

    console.debug = debugMock;
    console.error = errorMock;
    CreateTable.prototype.execute = createMock as any;
    SaveFile.prototype.execute = saveFilaMock as any;

    ServerApp.run(options);

    expect(debugMock).toHaveBeenCalledTimes(3);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(saveFilaMock).toHaveBeenCalledTimes(1);

    expect(debugMock).toHaveBeenCalledWith(
      `Server running with options: ${JSON.stringify(options)}...`
    );
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFilaMock).toHaveBeenCalledWith({
      fileContent: returnCreate,
      fileDestination: options.destination,
      fileName: `${options.name}_${options.base}`,
    });
  });
});
