const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const sequelize = new Sequelize('bdEjemplo',null,null,{
    dialect: 'sqlite'
});

app.post('/datos',(req,res)=>{

    res.send("Enviados...");
});

app.listen(8080);
console.log("Servidor activo");