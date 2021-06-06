const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { existIdUser } = require('../helpers/db-validators.helper');

const validJWT = async (req = request,res = response,next) => {
    
    const token = req.header('api_token');

    if (!token) return res.status(401).json({msg:'No existe token en la petición'});

    try {
        const { uid } = jwt.verify(token,process.env.PRIVATEKEY);
        // leer usuario que corresponde al UID en el modelo
        const executingUser = await User.findById(uid);
        // verificar si existe usuario
        if (!executingUser) return res.status(401).json({msg:'Token no válido'});
        // verificar si el uid tiene status en true
        if (!executingUser.status) return res.status(401).json({msg:'Token no válido'});

        req.executingUser = executingUser;
        next();
    } catch (error) {
        res.status(401).json({
            msg:'Token no válido'
        });
    };
};

module.exports = {
    validJWT
}