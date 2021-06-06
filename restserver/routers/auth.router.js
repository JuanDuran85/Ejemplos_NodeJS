const { Router } = require('express');
const { check } = require('express-validator');
const { loginController } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/valid-field.middleware');

const router = Router();

// no se ejecuta la funciones de los controllers
router.post('/login', [
    check('email','El correo es obligatorio').trim().isEmail().normalizeEmail().escape().not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty().escape(),
    validateFields
], loginController);

module.exports = router;