//@ts-ignore
import { existsSync, readFileSync, rmSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, test } from "@jest/globals";
import { SaveFile } from "../../../../src/domain/use-case/save-file.use-case";

describe("SaveFileUseCase", () => {
  beforeEach(() => {
    const outputPath: string = "output";
    if (existsSync(outputPath)) {
      rmSync(outputPath, { recursive: true });
    }
  });

  afterEach(() => {
    const outputPath: string = "output";
    if (existsSync(outputPath)) {
      rmSync(outputPath, { recursive: true });
    }
  });

  test("Should save file with default values", () => {
    const outputPath: string = "output/table.txt";
    const saveFile: SaveFile = new SaveFile();
    const options = {
      fileContent: "test content to save",
    };

    const result: boolean = saveFile.execute(options);

    const checkFile: boolean = existsSync(outputPath);
    const fileContent: string = readFileSync(outputPath, "utf-8");

    expect(result).toBeTruthy();
    expect(checkFile).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });
});
