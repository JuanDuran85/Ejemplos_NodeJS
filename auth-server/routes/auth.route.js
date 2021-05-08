const { Router } = require('express');
const { createUser, loginUser, tokenValid } = require('../controllers/auth.controller');

const router = Router();

/* definiendo rutas */

//crear un nuevo usuario
router.post('/new', createUser);

//login de usuario
router.post('/', loginUser);

//validar y revalidar token
router.get('/renew', tokenValid);

module.exports = router;