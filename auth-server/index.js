const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config.database');
require('dotenv').config();

// crear el servidor - aplicacion de express
const app = express();

// conexion a base de datos

dbConnection();

// Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// configurar rutas con middlewer
app.use('/api/auth', require('./routes/auth.route') );

//manejo de otras rutas
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// levantando servidor
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});