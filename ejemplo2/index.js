const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/mensaje',(req,res)=>{
    res.send(`mensaje desde servidor con express... El mensaje recibido es: ${req.query.mensaje}`);
});

app.post('/',(req,res)=>{
    res.send(`Mensaje enviado: ${req.body.texto}`)
})

app.listen(8080);
console.log("Ejecutando el servidor");