const express = require('express');

let SesionesControlador = require('../controllers/sesiones');
let router = express.Router();

router.route('/sesiones')
    .get(SesionesControlador.nuevo)
    .post(SesionesControlador.create);

module.exports = router;