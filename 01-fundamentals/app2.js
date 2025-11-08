const fs = require("fs");

const content = fs.readFileSync("README.md", "utf8");
const countDolore = content.match(/dolore/gi).length;
const wordCount = content.split(/\s+/).length;

console.debug(`Count Dolore: ${countDolore}`);
console.debug(`Word Count: ${wordCount}`);
