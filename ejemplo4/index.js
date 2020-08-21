const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    name: 'session',
    keys: ['5cf81845814ad6696a182af24cbe6e6d','f3b1e5e806faa1a0ad49e48b0c9946b8']
})); // se debe enviar un objeto json con la configuracion



app.listen(8080);