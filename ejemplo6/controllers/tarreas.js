const Tarrea = require('../models').Tarrea;

module.exports = {
    create: function(req,res){
        Tarrea.create({
            descripcion: req.body.descripcion
        }).then(resultado=>{
            res.json(resultado);
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    },
    nueva: function (req,res){
        res.render('tarreas/nueva');
    },
    home: function (req,res) {
        Tarrea.findAll().then((datos)=>{
            res.render('tarreas/index',{
                tareas: datos
            });
        })
    }
}