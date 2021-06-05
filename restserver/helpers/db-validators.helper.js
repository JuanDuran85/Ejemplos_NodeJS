const Role = require("../models/role.models");
const User = require('../models/user.model');

const validRole = async (role = '')=>{
    const existsRole = await Role.findOne({role});
    if (!existsRole) throw new Error(`El rol: ${role}, no se encuentra disponible`);
};

// verificar si el correo existe
const existEmail = async (email = "") => {
    const existsEmail = await User.findOne({email});
    if (existsEmail) throw new Error(`El correo: ${email}, ya existe`);
};

module.exports = {
    validRole,
    existEmail
};