const Usuarios = require('../models').Usuarios;

module.exports = {
    nuevo: function(req,res){
        res.render('registros/nuevo');
    },
    create: function(req,res){
        let data = {
            email: req.body.email,
            passwod: req.body.password
        };

        Usuarios.create(data).then(respuesta => {
            res.json(respuesta);
        }).catch(err => {
            console.log(err);
        })
    }
}