const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirerConfig");
const Busquedas = require("./busquedas.model");
const colors = require('colors');

const main = async () => {

    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                //mostrar mensajes
                const terminoBuscar = await leerInput('Cuidad: ');

                //buscar los lugares
                const lugares = await busquedas.ciudad(terminoBuscar);

                //listando lugares encontrados para seleccion
                const idSelecion = await listarLugares(lugares);

                if (idSelecion === '0') continue;
                
                
                //Mostrando el lugar seleccionado
                const lugarSeleccionado = lugares.find(e => e.id === idSelecion);
                
                // guardar en DB
                busquedas.agregarHistoial(lugarSeleccionado.nombre);

                //buscando clima de lugar seleccionado
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);
                //console.clear();
                console.log("\n Informacion de la ciudad \n".green);
                console.log("Ciudad: ", lugarSeleccionado.nombre);
                console.log("Lat: ", lugarSeleccionado.lat);
                console.log("Lng: ", lugarSeleccionado.lng);
                console.log("Temperatura: ", clima.feels_like, " °C");
                console.log("Sensación Térmica: ", clima.temp, " °C");
                console.log("Mínima: ", clima.t_min, " °C");
                console.log("Máxima: ", clima.t_max, " °C");
                console.log("Velocidad del Viento: ", clima.speed_wind, " m/s");
                console.log("Condición climática: ", clima.descriWeather);
                break;
            case 2:
                busquedas.historialCapi.forEach((result, index) => {
                    console.log(`${colors.green(index+1)}${'.'.green} ${result}`);
                })
                break;
            default:
                break;
        };

        if (opt !== 0) await pausa();
        
    } while (opt !== 0);
};

main();