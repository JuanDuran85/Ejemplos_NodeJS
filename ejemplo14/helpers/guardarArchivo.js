const fs = require('fs');
const archivo = './db/data.json';

const guardarDbInfo = (data) => {
    fs.writeFileSync(archivo,JSON.stringify(data));
};

const leerDb = () => {
    if (!fs.existsSync(archivo)){
        return null;
    };

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const tarea = JSON.parse(info);
    return tarea;
};

module.exports = {
    guardarDbInfo,
    leerDb
}