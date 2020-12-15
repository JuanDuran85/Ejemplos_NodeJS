const Usuarios = require('../models').Usuarios;

module.exports = function (req,res,next) {
    if (req.sessionID){
        console.log("req.sessionID")
        console.log(req.sessionID);
        
        Usuarios.findByPk(req.sessionID).then(usuario =>{
            console.log("usuario encontrado con findByPk")
            console.log(usuario)
            if (usuario){
                req.user = usuario;
                next();
            }
        }).catch(error => console.log(error))
    } else {
        next();
    }
}