const Usuarios = require('../models').Usuarios;

module.exports = {
    nuevo: function (req,res) {
        res.render('sesiones/nuevo')
    },
    create: function(req,res){
        Usuarios.login(req.body.email,req.body.password).then(resp => {
            if (resp){
                console.log(resp.id)
                req.session.userId = resp.id;
            }
            res.json(resp);
        }).catch(error => {
            console.log(error);
            res.json(error);
        });
    }
}