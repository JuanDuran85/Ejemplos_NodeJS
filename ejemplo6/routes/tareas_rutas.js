const express = require('express');
let TarreasControlador = require('../controllers/tarreas');
const router = express.Router();

router.route('/tareas').get(TarreasControlador.index).post(TarreasControlador.create);

router.get('/tareas/nueva',TarreasControlador.nueva);
/* router.get('/tareas/index',TarreasControlador.home); */

router.route('/tareas/:id').get(TarreasControlador.show).put(TarreasControlador.update);

module.exports = router;