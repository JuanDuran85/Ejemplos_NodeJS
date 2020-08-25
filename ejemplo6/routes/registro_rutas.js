const express = require('express');
const controladorRegistro = require('../controllers/registros');
const router = express.Router();

router.get('/signup', controladorRegistro.nuevo);

module.exports = router;