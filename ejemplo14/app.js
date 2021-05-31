require('colors');
const { guardarDbInfo, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, borrarTareasLista, confirmar, mostrarListadoCheckList } = require('./helpers/inquirerConfig');
const Tareas = require('./models/tareas.model');

console.clear();

const main = async () => {
    let option = '';
    const tareas = new Tareas();
    const leerTareaDb = leerDb();

    if (leerTareaDb) {
        tareas.cargarTareasFromArray(leerTareaDb);
    };
    
    do {
        option = await inquirerMenu();

        switch (option) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;
            case '2':
                tareas.mostrarListado();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6':
                const id = await borrarTareasLista(tareas.listadoArr);
                if (id !== 0) {
                    const ok = await confirmar('¿Estas seguro de borrar la tarea');
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                };
            break;
        };

        guardarDbInfo(tareas.listadoArr);
        await pausa();
    } while (option !== '0');
};

main();