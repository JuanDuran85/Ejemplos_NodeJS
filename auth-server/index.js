const express = require('express');

// crear el servidor - aplicacion de express
const app = express();

// configurar rutas con middlewer
app.use('/api/auth', require('./routes/auth') );


// levantando servidor
app.listen(4000, () => {
    console.log(`servidor corriendo en puerto ${4000}`);
});