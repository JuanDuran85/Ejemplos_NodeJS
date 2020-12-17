let express = require('express'); // llamando a express en la libreria
let app = express(); // 
let pieRepo = require('./repos/pieRepo');

let router = express.Router(); // rutas de express para dejar activa
/* let pies = pieRepo.get(); */

router.get('/',function(req,res,next){ // creando get para retornar un valor
/*     res.status(200).send(pies); */
    pieRepo.get(function(data){
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message":"All data retrieved",
            "data": data
        });
    }, function(err){
        next(err);
    })
});

router.get('/search',function (req,res,next) {  
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };
    pieRepo.search(searchObject,function (data) {  
        res.status(200).json({
            "status": 200,
            "statusText": "Ok",
            "message":"All data retrieved",
            "data": data 
        })
    }, function (err) { 
        next(err) 
    });
})

router.get('/:id',function (req,res,next){
    pieRepo.getById(req.params.id,function (data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "Ok",
                "message":"Single data retrieved",
                "data": data 
            })
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message":"The data '"+req.params.id+"' could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The data '"+req.params.id+"' could not be found"
                }
            })
        }
    },function(err){
        next(err)
    });
});

app.use('/api/', router); // agregando ruta

var server = app.listen(3000, ()=>{
    console.log("Servidor activo...");
});