import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  public static run(options: RunOptions): void {
    console.debug(`Server running with options: ${JSON.stringify(options)}...`);
    const { base, limit, show, destination, name } = options;
    const table: string = new CreateTable().execute({ base, limit });
    const wasFileSaved: boolean = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: `${name}_${base}`,
    });
    show ? console.debug(table) : console.debug("Table not shown");
    wasFileSaved
      ? console.debug("File saved")
      : console.error("File not saved");
  }
}
