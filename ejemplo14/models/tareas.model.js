const Tarea = require('./tarea.model');
const colors = require('colors');

class Tareas {

    _listado = {};

    get listadoArr(){
        let lista = [];
        Object.keys(this._listado).forEach(result => {
            lista.push(this._listado[result]);
        });
        return lista;
    };

    constructor() {
        this._listado = {};
    };

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    };

    mostrarListado(){
        this.listadoArr.forEach((tarea,index) => {
            console.log(`${colors.green(index+1)}. ${tarea.desc} :: ${tarea.completadoEnd ? 'Completado'.green : 'Pendiente'.red}`);
        });
    };
    
    listarPendientesCompletadas(completadas = true){
        const completas = this.listadoArr.filter((result) => result.completadoEnd);
        const pendientes = this.listadoArr.filter(result => !result.completadoEnd);
        if (completadas) {
            completas.forEach((e,index) => {
                console.log(`${colors.green(index+1)}. ${e.desc} :: ${e.completadoEnd}`);
            });
        } else {
            pendientes.forEach((e,index)=>{
                console.log(`${colors.green(index+1)}. ${e.desc} :: ${e.completadoEnd ? 'Completado'.green : 'Pendiente'.red}`);
            });
        }
    };

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        };
    };
}

module.exports = Tareas;