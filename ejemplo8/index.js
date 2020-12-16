let express = require('express'); // llamando a express en la libreria
let app = express(); // 
let pieRepo = require('./repos/pieRepo');

let router = express.Router(); // rutas de express para dejar activa
let pies = pieRepo.get();

router.get('/',(req,res,next)=>{ // creando get para retornar un valor
/*     res.status(200).send(pies); */
    res.status(200).json({
        "status": 200,
        "statusText": "Ok",
        "message":"All data retrieved",
        "data": pies
    });
});

app.use('/api/', router); // agregando ruta

var server = app.listen(3000, ()=>{
    console.log("Servidor activo...");
});