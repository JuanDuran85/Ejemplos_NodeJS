import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg: {
  [x: string]: unknown;
  b: number;
  l: number;
  s: boolean;
  n: string;
  d: string;
  _: (string | number)[];
  $0: string;
} = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiplication table base",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Multiplication table limit",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "File Name",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "output",
    describe: "File Destination",
  })
  .check((argv: any, options: any) => {
    if (argv.b < 1)
      throw new Error("Error: The base must be a number greater than 0");
    return true;
  })
  .parseSync();
