const express = require('express');
const cors = require('cors');
require('dotenv').config();

// crear el servidor - aplicacion de express
const app = express();

// Directorio publico
app.use(express.static('public'));

//CORS
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// configurar rutas con middlewer
app.use('/api/auth', require('./routes/auth.route') );


// levantando servidor
app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});