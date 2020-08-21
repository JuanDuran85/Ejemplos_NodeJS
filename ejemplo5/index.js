const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded(
    { 
        extended: true   
    }
))

let db = new sqlite3.Database('db-Ejemplo'); //si se pasa como argumento :memory, se crea una base de datos anonima que se borrar al cerrar el programa.

//vamos a correr una consulta
//db.run('CREATE TABLE tabla_ejemplo(ID int AUTO_INCREMENT,Descripcion varchar(255),Aprobado boolean)');

app.post('/pendientes',(req,res)=>{
    //db.run(`INSERT INTO tabla_ejemplo(Descripcion) VALUES('${req.body.Descripcion}')`);
    db.run(`INSERT INTO tabla_ejemplo(Descripcion) VALUES(?)`,req.body.Descripcion);
    console.log("finalizado proceso en DB");
    res.send("finalizado proceso en DB");
})

app.listen(8080);
console.log("Servidor trabajando...");

// sigint se activa cuando se utiliza el ctrl c
process.on('SIGINT',()=>{
    console.log('proceso cerrado...');
    db.close();
    process.exit(); //permite cerrar el servidor de node
}); //el proces on permite escuchar los eventos