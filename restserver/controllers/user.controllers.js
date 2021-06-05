const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// para peticiones get
const userGet = (req, res = response) => {
    const { q, nombre = "No name", apikey, page = 1, limit} = req.query
    res.json({
        msg: "get API - controller",
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });
};

const userPost = async (req = request, res = response) => {
    const { name, email, password, role } = req.body;
    const user = new User({name, email, password, role});
   
    // encriptar la contraseña con hastSync para una sola via y con 10 vueltas
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    // guardar en BD
    await user.save();

    res.json({
        user
    });
};

const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller",
    });
};

const userPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "put API - controller",
        id
    });
};

const userPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controller"
    });
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};