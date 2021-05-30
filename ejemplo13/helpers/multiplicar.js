const fs = require('fs');
const colors = require('colors');

const getTablaMultiply = async (base = 1, lista = false, hasta = 10) => {
    try {
        console.clear();
        
        let salida = ''; 
        let consola = '';
        
        console.log("------------------------".green);
        console.log(`       Table del ${base}      `.underline.red);
        console.log("------------------------".green);

        for (let i = 0; i <= hasta; i++) {
            salida += `${base} * ${i} = ${base*i} \n`;
            consola += `${base} ${'*'.yellow} ${i} ${'='.yellow} ${base*i} \n`;
        };
        
        if (lista) {
            console.log(consola);
        }
        
        fs.writeFileSync(`./out/tabla-${base}.txt`,salida);
    
        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTablaMultiply
}

