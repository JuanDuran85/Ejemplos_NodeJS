import { mkdirSync, writeFileSync } from "node:fs";
import { yarg } from "./config/plugins/yargs.plugins";

const { b: baseMultiplier, l: limit, s: show } = yarg;

let dataToSave: string = `
=========================================
      Table of ${baseMultiplier}         
=========================================\n
`;

for (let i = 1; i <= limit; i++) {
  dataToSave += `${baseMultiplier} * ${i} = ${baseMultiplier * i} \n`;
}

if (show) {
  console.debug(dataToSave);
}

const outputPath: string = "output";

mkdirSync(outputPath, { recursive: true });

writeFileSync(`output/table_${baseMultiplier}.txt`, dataToSave, "utf-8");
