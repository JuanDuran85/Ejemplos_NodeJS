const Tarrea = require('../models').Tarrea;

module.exports = {
    index: function (req, res) {
        Tarrea.findAll().then(response => {
            res.render('tarreas/index', {
                tareas : response
            })
        })
    },
    show: function (req,res) {
        Tarrea.findByPk(req.params.id).then(response=>{
            res.render('tarreas/show',{tarea: response});
        });
    },
    edit: function (req, res) {
        Tarrea.findByPk(req.params.id).then(response=>{
            res.render('tarreas/edit',{tarea: response});
        });        
    },
    update: function (req,res) {
        Tarrea.update({descripcion: req.body.descripcion},{
            where: {
                id: req.params.id
            }
        }).then(response=>{
            res.redirect('/tareas/'+req.params.id);
        })
    },
    create: function(req,res){
        Tarrea.create({
            descripcion: req.body.descripcion
        }).then(resultado=>{
            res.redirect('/tareas')
        }).catch(err=>{
            console.log(err);
            res.json(err);
        })
    },
    nueva: function (req,res){
        res.render('tarreas/nueva');
    },
/*     home: function (req,res) {
        Tarrea.findAll().then((datos)=>{
            res.render('tarreas/index',{
                tareas: datos
            });
        })
    } */
}