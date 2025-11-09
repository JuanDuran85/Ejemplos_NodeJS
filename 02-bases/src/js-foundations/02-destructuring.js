console.debug(process.env);
console.debug(process.env.PORT ?? 3000);

const { PUBLIC, ProgramData, USERNAME } = process.env;

console.table({PUBLIC, ProgramData, USERNAME});
