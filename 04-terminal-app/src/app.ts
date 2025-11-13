import { writeFile } from "node:fs";

console.debug("=========================================");
console.debug("             TABLA DEL 5         ");
console.debug("=========================================");

let dataToSave = `
  =========================================
             TABLA DEL 5         
  =========================================
`;

for (let i = 1; i <= 10; i++) {
  console.debug(`5 * ${i} = ${5 * i}`);
  dataToSave += `5 * ${i} = ${5 * i} \n`;
}

writeFile("outputs/table_five.txt", dataToSave, "utf-8", (error) => {
  if (error) console.error("Something went wrong");
});
