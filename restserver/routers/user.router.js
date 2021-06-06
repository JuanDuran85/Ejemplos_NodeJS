const { Router } = require('express');
const { check } = require('express-validator');

const { userGet, userPatch, userDelete, userPost, userPut } = require('../controllers/user.controllers');

const { validRole, existEmail, existIdUser } = require('../helpers/db-validators.helper');

const { validateFields } = require('../middlewares/valid-field.middleware');
const { validJWT } = require('../middlewares/valid-jwt.middleware');
const { adminRole } = require('../middlewares/valid-role.middleware');

const router = Router();

// no se ejecuta la funciones de los controllers
router.get('/', userGet);

router.put('/:id', [
    check('id','El ID no es permitido').not().isEmpty().withMessage('El id es obligatorio').isMongoId(),
    check('id').trim().escape().custom(existIdUser),
    check('role').not().isEmpty().withMessage('El rol no puede estar vacio').trim().escape().custom(validRole),
    validateFields
], userPut);

router.post('/', [
    check('name','El nombre es obligatorio').trim().not().isEmpty().isLength({min:2}).withMessage('El nombre debe llevar al menos dos caracteres').not().matches(/\d/).withMessage('El nombre no puede llevar numeros').escape(),
    check('password','La contraseña es obligatoria').not().isEmpty().isLength({min:6}).withMessage('contraseña debe contener al menos 6 caracteres').matches(/\d/).withMessage('La contraseña debe contener al menos un numero').not().isIn(['123456', 'password']).withMessage('No utilices palabras basicas como 123456').escape(),
    check('email','El correo no es valido').trim().isEmail().normalizeEmail().escape().not().isEmpty(),
    check('email').custom(existEmail),
    check('role').not().isEmpty().withMessage('El rol no puede estar vacio').trim().escape().custom(validRole), 
   /*  check('role','No es un role valido').trim().isIn(['ADMIN_ROLE','USER_ROLE']).escape(), */
    validateFields
], userPost);

router.delete('/:id', [
    validJWT,
    adminRole,
    check('id','El ID no es permitido').not().isEmpty().withMessage('El id es obligatorio').isMongoId(),
    check('id').trim().escape().custom(existIdUser),
    validateFields
], userDelete);

router.patch('/', userPatch);

module.exports = router;