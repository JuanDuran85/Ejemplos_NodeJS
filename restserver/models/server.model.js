const express = require('express');
const cors = require('cors');
const { dbConexion } = require('../database/config.database');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/users';

        // conectando a la Base de Datos
        this.conexionDB();
        
        //Middlewares
        this.middlewares();

        //Rutas de la aplicacion
        this.routes();
    };

    async conexionDB(){
        await dbConexion();
    }

    middlewares(){
        //cors de proteccion
        this.app.use(cors());

        //lectura y parseo del body
        this.app.use(express.json());
        
        //Directorio Publico
        this.app.use(express.static('public'));
    }
    
    routes(){
        //middlewares para rutas
        this.app.use(this.userPath, require('../routers/user.router'));
    };

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Serviror en el puerto ${this.port}`);
        });
    };
};

module.exports = Server;