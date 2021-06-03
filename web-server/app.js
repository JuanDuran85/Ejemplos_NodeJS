const express = require('express');
const app = express();
const hbs = require('hbs');
require('dotenv').config();

const port = process.env.PORT;

//usando hbs
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials'); 

//servir contenido estatico
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home',{
    nombre:'Juan',
    titulo: 'Curso de NodeJS'
  });
});

app.get('/generic',(req, res)=>{
  res.render('generic',{
    nombre:'Juan',
    titulo: 'Curso de NodeJS'
  });
});

app.get('/elements',(req, res)=>{
  res.render('elements',{
    nombre:'Juan',
    titulo: 'Curso de NodeJS'
  })
});

/* el * es comodin para cualquier otra ruta */
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, ()=>{
  console.log(`Corriendo en el puerto: http://localhost:${port}`);
});