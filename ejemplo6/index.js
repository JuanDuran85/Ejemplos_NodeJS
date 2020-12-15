const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');
//const tarreas = require('./controllers/tarreas');

const app = express();

const tareasRoute = require('./routes/tareas_rutas');
const registroRoute = require('./routes/registro_rutas');
const sesionesRoute = require('./routes/sesiones_rutas');
const buscarUsuario = require('./middleware/encontrar_usuario');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine','pug');

app.use(session({
    secret: ['retgouih56likjsfdg245lksjfdg234', 'poipoi534pok31nbdjlk428953lwu9'],
    saveUninitialized: false,
    resave: false
}));

app.use(tareasRoute);
app.use(registroRoute);
app.use(sesionesRoute);
app.use(buscarUsuario);

app.get('/', (req,res)=>{
    res.render('index',{usuario: req.user})
})

/* const sequelize = new Sequelize('bdEjemplo',null,null,{
    dialect: 'sqlite',
    storage: './db/bdEjemplo.sqlite3'
}); */

/* app.get('/tareas', tarreas.home);

app.post('/datos',(req,res)=>{

    res.send("Enviados...");
}); */

app.listen(8080);
console.log("Servidor activo");