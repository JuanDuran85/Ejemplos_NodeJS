const { response } = require('express');
const  User = require('../models/User.model');
const { generateJwt } = require('../helpers/jwt.helper');
const bcrypt = require('bcryptjs');

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
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password , salt);
    //generar el JWT
        const token = await generateJwt(dbUser.id, name);

    //Crear usuario de DB
        await dbUser.save();

    //generar respuesta exitosa
        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name,
            token, 
            email
        })
        
    } catch (error) {
        return res.json({
            ok  : false,
            msg : "Por favor, contacta al administrador..."
        });
    }
};

//controlador para login de usuario
const loginUser = async (req,res = response) => {

    const { email, password } = req.body;

    try {
        
        //verificar si no existe un correo igual
        const usuario = await User.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ 
                ok : false,
                msg: 'Los datos no son correctos'
            });
        }

        //confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword){
            return res.status(400).json({ 
                ok : false,
                msg: 'Los datos no son correctos'
            }); 
        }

        //generar el JWT
        const token = await generateJwt(usuario.id, usuario.name);

        //respuesta del servicio (solo fines educativos)
        return res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token,
            email
        });

    } catch (error) {
        return res.status(500).json({
            ok : false,
            msg:"Por favor, contacta al administrador..."
        });
    }
}

//controlador para validar y revalidar token
const tokenValid = async (req,res = response) => {
    const { uid } = req;

    const usuario = await User.findById(uid);

    //generar el JWT
    const token = await generateJwt(uid, usuario.name);

    return res.json({
        ok:true,
        msg:"Renew /",
        name: usuario.name,
        uid,
        email: usuario.email,
        token
    });
}

//exportando controladores
module.exports = {
    createUser,
    loginUser,
    tokenValid
}