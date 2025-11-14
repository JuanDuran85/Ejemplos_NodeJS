import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
}

export class ServerApp {
  public static run(options: RunOptions): void {
    console.debug(`Server running with options: ${JSON.stringify(options)}...`);
    const { base, limit, show } = options;
    const table: string = new CreateTable().execute({ base, limit });
    const wasFileSaved: boolean = new SaveFile().execute({
      fileContent: table,
      fileDestination: "output",
      fileName: `table_${base}`,
    });
    show ? console.debug(table) : console.debug("Table not shown");
    wasFileSaved
      ? console.debug("File saved")
      : console.error("File not saved");
  }
}
