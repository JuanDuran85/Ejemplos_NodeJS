const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

// para peticiones get
const userGet = async (req, res = response) => {
    let { limit , to } = req.query

    limit = Number(limit) || 20;
    to = Number(to) || 0;
    
/*     const users = await User.find({status:true}).skip(to).limit(limit); 
    const total = await User.countDocuments({status:true}); */
    
    const [ total, users ] = await Promise.all([
        User.countDocuments({status:true}),
        User.find({status:true}).skip(to).limit(limit)
    ])

    res.json({
        total,
        users
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

const userDelete = async (req = require, res = response) => {
    const { id } = req.params;
    const executingUser = req.executingUser;
    // borrando fisicamente el usuario -(no se recomienda)-
   /*  const userDelete = await User.findByIdAndDelete(id); */

    // modificando status del usuario en la DB
    const affectedUser = await User.findByIdAndUpdate(id,{status:false});

    res.json({
        affectedUser, 
        executingUser
    });
};

const userPut = async (req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...userBodyPut } = req.body;
    
    if (password) {
        const salt = bcrypt.genSaltSync();
        userBodyPut.password = bcrypt.hashSync(password, salt)
    };

    const userActual = await User.findByIdAndUpdate(id,userBodyPut, {new: true});

    res.json(userActual);
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