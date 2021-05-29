const fs = require('fs');

const getTablaMultiply = async (base) => {
    try {
        console.clear();
        
        let salida = '';
        
        console.log("------------------------");
        console.log(`       Table del ${base}      `);
        console.log("------------------------");
        
        for (let i = 0; i <= 10; i++) {
            salida += `${base} * ${i} = ${base*i} \n`;
        };
        
        console.log(salida);
        
        fs.writeFileSync(`tabla-${base}.txt`,salida);
    
        return `tabla-${base}.txt`;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getTablaMultiply
}

