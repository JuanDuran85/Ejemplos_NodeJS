const { response } = require('express');

//controlador para crear usuario
const createUser = (req,res = response) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    return res.json({
        ok:true,
        msg:"crear usuario /new"
    });
};

//controlador para login de usuario
const loginUser = (req,res = response) => {
    const { email, password } = req.body;
    console.log(email, password);
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