const Role = require("../models/role.models");
const User = require('../models/user.model');

const validRole = async (role = '')=>{
    const existsRole = await Role.findOne({role});
    if (!existsRole) throw new Error(`El rol: ${role ? role : 'no entregado'}, no se encuentra disponible`);
};

// verificar si el correo existe
const existEmail = async (email = '') => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) throw new Error(`El correo: ${email}, ya existe`);
};


// verificar si el id existe
const existIdUser = async (id) => {
    const existsUser = await User.findById(id);
    if (!existsUser) throw new Error(`El id: ${id}, no existe`);
};

module.exports = {
    validRole,
    existEmail,
    existIdUser
};