const fs = require('fs');

console.clear();


const base = 7;
let salida = '';

console.log("------------------------");
console.log(`       Table del ${base}      `);
console.log("------------------------");

for (let i = 0; i <= 10; i++) {
    salida += `${base} * ${i} = ${base*i} \n`;
};

console.log(salida);

fs.writeFile(`tabla-${base}.txt`,salida,(error)=>{
    if(error) throw error;
    console.log(`Archivo tabla-${base}.txt creado`);
})

