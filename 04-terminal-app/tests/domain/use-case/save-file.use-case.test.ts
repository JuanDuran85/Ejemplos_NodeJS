import { afterEach, describe, expect, jest, test } from "@jest/globals";

import * as fs from "node:fs";
import { SaveFile } from "../../../src/domain/use-case/save-file.use-case";

describe("SaveFileUseCase", () => {
  afterEach(() => {
    const outputPath: string = "output";
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath, { recursive: true });
    }
  });

  test("Should save file with default values", () => {
    const outputPath: string = "output/table.txt";
    const saveFile: SaveFile = new SaveFile();
    const options = {
      fileContent: "test content to save",
    };

    const result: boolean = saveFile.execute(options);

    const checkFile: boolean = fs.existsSync(outputPath);
    const fileContent: string = fs.readFileSync(outputPath, "utf-8");

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile: SaveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("This is a custom message...");
    });
    const result = saveFile.execute({ fileContent: "test content to save" });
    expect(result).toBeFalsy();
    mkdirSpy.mockRestore();
  });
});

describe("SaveFileUseCase Test II", () => {
  afterEach(() => {
    const outputPath: string = "custom-outputs";
    if (fs.existsSync(outputPath)) {
      fs.rmSync(outputPath, { recursive: true });
    }
  });
  test("Should save file with custom values", () => {
    const saveFile: SaveFile = new SaveFile();
    const options = {
      fileContent: "test content to save with custom values",
      fileDestination: "custom-outputs/file-destination",
      fileName: "custom-table-name",
    };
    const outputPath: string = `${options.fileDestination}/${options.fileName}.txt`;

    const result: boolean = saveFile.execute(options);

    const checkFile: boolean = fs.existsSync(outputPath);
    const fileContent: string = fs.readFileSync(
      `${options.fileDestination}/${options.fileName}.txt`,
      "utf-8"
    );

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });
});
