
const { PUBLIC, ProgramData, USERNAME } = process.env;
console.debug("-----------------------");
console.table({ ProgramData, USERNAME });
console.debug(process.env.PORT ?? 3000);
