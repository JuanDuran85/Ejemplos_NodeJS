const express = require('express');

let app = express();
//app.use('/assets',express.static('assets'));
//app.use('/assets', express.static(__dirname + '/assets')); // otra manera...
app.use('/assets', express.static(`${__dirname}/assets/`)); // otra forma

app.get('/',(req,res)=>{
    res.sendFile('index.html',{
        root: __dirname})
});

app.listen(8080);
console.log("Ejecutando el servidor...");