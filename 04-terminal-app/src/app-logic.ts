import { mkdirSync, writeFileSync } from "node:fs";

const baseMultiplier: number = 5;
let dataToSave: string = `
=========================================
            TABLA DEL ${baseMultiplier}         
=========================================\n
`;

for (let i = 1; i <= 10; i++) {
  dataToSave += `${baseMultiplier} * ${i} = ${baseMultiplier * i} \n`;
}
console.debug(dataToSave);

const outputPath: string = "output";

mkdirSync(outputPath, { recursive: true });

writeFileSync(`output/table_${baseMultiplier}.txt`, dataToSave, "utf-8");
