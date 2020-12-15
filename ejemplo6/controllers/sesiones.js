const Usuarios = require('../models').Usuarios;

module.exports = {
    nuevo: function (req,res) {
        res.render('sesiones/nuevo')
    },
    create: function(req,res){
        Usuarios.login(req.body.email,req.body.password).then(resp => {
            if (resp){
                console.log(req.sessionID);
                console.log("si hay usuario");
                req.session.userId = resp.id;
                console.log(req.sessionID);
            } else {
                console.log("no hay usuario...");
            }
            res.json(resp);
        }).catch(error => {
            console.log("error en login...");
            console.log(error);
            res.json(error);
        });
    }
}