const { v4 : uudiv4 } = require('uuid');

class Tarea {

    id = "";
    desc = "";
    completadoEnd = null;

    constructor(desc = ''){
        this.id = uudiv4();
        this.desc = desc;
        this.completadoEnd = null;
    }
}

module.exports = Tarea;