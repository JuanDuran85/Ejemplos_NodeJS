const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = [
    {
       type: 'list',
       name: 'opciones',
       message:'¿Qué desea hacer?',
       choices: [
           {
               value: '1',
               name: `${'1.'.green} Crear una Tarea`
           },
           {
               value: '2',
               name: `${'2.'.green} Listar tareas`
           },
           {
               value: '3',
               name: `${'3.'.green} Listar tareas completadas`
           },
           {
               value: '4',
               name: `${'4.'.green} Listar tareas pendientes`
           },
           {
               value: '5',
               name: `${'5.'.green} Completar Tarea(s)`
           },
           {
               value: '6',
               name: `${'6.'.green} Borrar Tarea`
           },
           {
               value: '0',
               name: `${'0.'.green} Salir\n`
           },
       ]
    }
];

const enterPausa = [
    {
        type: 'input',
        name: 'pausaInput',
        message: `\nPresione ${'Enter'.green} para continuar\n`
    }
];

const inquirerMenu = async () => {
    console.clear();
    console.log('==============================='.green);
    console.log('     Seleccione una opción     '.white);
    console.log('=============================== \n'.green);

    const {opciones} = await inquirer.prompt(preguntas);
    return opciones;
};

const pausa = async () => {
    console.log('\n');
    const result = await inquirer.prompt(enterPausa);
    return result;
};

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                };
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
};

const borrarTareasLista = async (tareas = []) => {
    const choices = tareas.map((tarea,index) => {
        return {
            value: tarea.id,
            name: `${colors.green(index+1)}${'.'.green} ${tarea.desc}`
        };
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message:'Borrar',
            choices
        }
    ];

    const {id} = await inquirer.prompt(preguntas);

    return id;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarTareasLista
}