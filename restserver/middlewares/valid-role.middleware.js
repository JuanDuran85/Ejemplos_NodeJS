const { response, request } = require("express");

const adminRole = (req = request, res = response, next) => {
    if (!req.executingUser) return res.status(500).json({msg: 'No se ha validado el token'});
    const { role, name } = req.executingUser;
    if (role !== 'ADMIN_ROLE') return res.status(401).json({msg: `El usuario: ${name} no tiene privilegios`});
    next();
};

const haveRole = (...roles) => {
    return (req = request, res = response, next) => {
        
        if (!req.executingUser) return res.status(500).json({msg: 'No se ha validado el token'});

        if (!roles.includes(req.executingUser.role)) return res.status(401).json({msg: `El usuario: ${req.executingUser.name} no tiene privilegios`});
        next();
    };
};

module.exports = {
    adminRole,
    haveRole
};