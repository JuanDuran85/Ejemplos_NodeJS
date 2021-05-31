require('colors');
const { guardarDbInfo, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, borrarTareasLista } = require('./helpers/inquirerConfig');
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
            case '6':
                const id = await borrarTareasLista(tareas.listadoArr);
                console.log({id});
            break;
        };

        guardarDbInfo(tareas.listadoArr);
        await pausa();
    } while (option !== '0');
};

main();