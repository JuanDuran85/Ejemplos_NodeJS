const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');
const tarreas = require('./controllers/tarreas');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

/* const sequelize = new Sequelize('bdEjemplo',null,null,{
    dialect: 'sqlite',
    storage: './db/bdEjemplo.sqlite3'
}); */

app.set('view engine','pug');

app.get('/tareas', tarreas.home);

app.post('/datos',(req,res)=>{

    res.send("Enviados...");
});

app.listen(8080);
console.log("Servidor activo");