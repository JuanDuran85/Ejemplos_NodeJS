import { mkdirSync, writeFileSync } from "node:fs";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  public execute(options: Options): boolean {
    try {
      console.debug(
        `Executing Save File with options: ${JSON.stringify(options)}`
      );
      const {
        fileContent,
        fileDestination = "output",
        fileName = "table.txt",
      } = options;

      mkdirSync(fileDestination, { recursive: true });

      writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent, "utf-8");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
