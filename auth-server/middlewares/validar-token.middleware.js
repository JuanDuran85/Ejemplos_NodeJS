const { response } = require('express');
const jwt = require('jsonwebtoken');

const validToken = (req,res = response ,next) => {
    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'error en el token...'
        })
    }

    try {

        const {uid,name} = jwt.verify(token, process.env.jwt_SEED);
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'error en Token...'
        })
    }

    next();
}

module.exports = {
    validToken
}