const express = require('express');

let app = express();
app.set('view engine','ejs');

//app.use('/assets',express.static('assets'));
//app.use('/assets', express.static(__dirname + '/assets')); // otra manera...
app.use('/assets', express.static(`${__dirname}/assets/`,{
    etag: false,
    maxAge: 60000,
})); // otra forma

/* curl http://localhost:8080/assets/style.css -v */


/* app.get('/',(req,res)=>{
    res.sendFile('index.html',{
        root: __dirname})
}); */

app.get('/',(req, res)=>{
    res.render('index');
});

app.listen(8080);
console.log("Ejecutando el servidor...");