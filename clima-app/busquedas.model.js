const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

class Busquedas {
    historial = [];
    pathDB = './db/database.json';

    constructor(){
        this.leerDb();      
    };

    get paramsMaxBox(){
        return {
            'access_token': process.env.MAXBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    };

    get paramsWeather(){
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang' : 'es'
        }
    };

    get historialCapi(){
        return this.historial.map(registro => {
            let palabras = registro.split(' ');
            palabras = palabras.map(unaPalabra=>unaPalabra[0].toUpperCase() + unaPalabra.substring(1));
            return palabras.join(' ');
        });
    };

    async ciudad(lugar = ''){
        const intanceAxios = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar.trim().toLowerCase()}.json`,
            params: this.paramsMaxBox
        });

        const result = await intanceAxios.get();

        return result.data.features.map(lugar => ({
            id: lugar.id,
            nombre: lugar.place_name,
            lng: lugar.center[0],
            lat: lugar.center[1]
        }));
    };

    async climaLugar(lat="",lon=""){
        const intanceAxios = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {...this.paramsWeather, lat, lon}
        });

        const result = await intanceAxios.get();
        const {weather, main, wind} = result.data;

        return {
            descriWeather: weather[0].description,
            t_min: main.temp_min,
            t_max: main.temp_max,
            humidity: main.humidity,
            temp: main.temp,
            speed_wind: wind.speed,
            feels_like: main.feels_like
        }
    };

    agregarHistoial(lugar = ""){
        if (this.historial.includes(lugar.toLowerCase())) {
            return;
        };
        this.historial = this.historial.splice(0,4);
        this.historial.unshift(lugar.toLowerCase());
        this.grabarDb();
    }

    grabarDb(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.pathDB, JSON.stringify(payload));
    };

    leerDb(){
        if (!fs.existsSync(this.pathDB)) return;
        const info = fs.readFileSync(this.pathDB,{encoding: 'utf-8'});
        if (!info) return;
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;