const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateJWT } = require('../helpers/generate_jwt.helper');

const loginController = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // 1. verificar si el email existe
        const userDate = await User.findOne({ email });

        if (!userDate) {
            return res.status(400).json({ 
                msg: 'El usuario o la contraseña no son correctos'
            });
        };
        
        // 2. verificar si el usuario esta activo
        if (!userDate.status) {
            return res.status(400).json({ 
                msg: 'El usuario o la contraseña no son correctos'
            })
        }

        // 3. verificar la contraseña
        const validPass = bcrypt.compareSync(password, userDate.password);
        if (!validPass) {
            return res.status(400).json({ 
                msg: 'El usuario o la contraseña no son correctos'
            });
        };

        // 4. generar el JWT
        const token = await generateJWT(userDate.id);

        res.json({
            userDate,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Comunicate con el administrador'
        })
    }
};

module.exports = {
    loginController,
}