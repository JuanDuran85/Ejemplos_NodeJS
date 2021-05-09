const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, tokenValid } = require('../controllers/auth.controller');
const { validFields } = require('../middlewares/validar-campos.middleware');
const { validToken } = require('../middlewares/validar-token.middleware');

const router = Router();

/* definiendo rutas */

//crear un nuevo usuario
router.post('/new', [
    check('email','El email es obligatorio').isEmail().normalizeEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}).withMessage('La contraseña debe contener al menos 6 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un numero').not().isIn(['123456', 'password']).withMessage('No utilices palabras basicas como 123456'),
    check('name','El nombre es obligatorio').not().isEmpty().isLength({min:2}).withMessage('El nombre debe llevar al menos dos caracteres').not().matches(/\d/).withMessage('El nombre no puede llevar numeros'),
    validFields
] ,createUser);

//login de usuario
router.post('/', [
    check('email','El email es obligatorio').isEmail().normalizeEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}).withMessage('La contraseña debe contener al menos 6 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un numero').not().isIn(['123456', 'password']).withMessage('No utilices palabras basicas como 123456'),
    validFields
], loginUser);

//validar y revalidar token
router.get('/renew', validToken ,tokenValid);

module.exports = router;