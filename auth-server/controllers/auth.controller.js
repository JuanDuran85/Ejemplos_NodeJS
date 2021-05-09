const { response } = require('express');
const  User = require('../models/User.model');
const { generateJwt } = require('../helpers/jwt.helper');
const bycript = require('bcryptjs');

//controlador para crear usuario
const createUser = async (req,res = response) => {

    const { name, email, password } = req.body;

    try {

    //verificar si no existe un correo igual
        const usuario = await User.findOne({ email });

        if (usuario) {
            return res.status(400).json({ 
                ok : false,
                msg: 'EL correo ya existe en la base de datos'
            })
        }

    // crear usario con el modelo (se crea la nueva instancia del modelo del usuario)

        const dbUser = new User(req.body);

    //encriptar o hash la contraseña
        const salt = bycript.genSaltSync();
        dbUser.password = bycript.hashSync( password , salt);
    //generar el JWT
        const token = await generateJwt(dbUser.id, name);

    //Crear usuario de DB
        await dbUser.save();

    //generar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            ok  : false,
            msg : "Por favor, contacta al administrador..."
        });
    }
};

//controlador para login de usuario
const loginUser = (req,res = response) => {

    const { email, password } = req.body;

    return res.json({
        ok:true,
        msg:"login de usuario /"
    });
}

//controlador para validar y revalidar token
const tokenValid = (req,res = response) => {
    return res.json({
        ok:true,
        msg:"Renew /"
    });
}

//exportando controladores
module.exports = {
    createUser,
    loginUser,
    tokenValid
}