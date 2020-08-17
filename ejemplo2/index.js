const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("mensaje desde servidor con express...");
});

app.listen(8080);
console.log("Ejecutando el servidor");