const Usuarios = require('../models').Usuarios;

module.exports = function (req,res,next) {
    if (req.session.userId){
        Usuarios.findById(req.session.userId).then(usuario =>{
            console.log(usuario);
            if (usuario){
                req.user = usuario;
                next();
            }
        }).catch(error => console.log(error))
    } else {
        next();
    }
}