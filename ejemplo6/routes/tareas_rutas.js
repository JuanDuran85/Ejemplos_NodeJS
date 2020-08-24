const express = require('express');
let TarreasControlador = require('../controllers/tarreas');
const router = express.Router();

router.route('/tareas').get(TarreasControlador.index).post(TarreasControlador.create);

router.get('/tareas/nueva',TarreasControlador.nueva);
/* router.get('/tareas/index',TarreasControlador.home); */

router.get('/tareas/:id/edit',TarreasControlador.edit)

router.route('/tareas/:id')
    .get(TarreasControlador.show)
    .put(TarreasControlador.update)
    .delete(TarreasControlador.borrar);

module.exports = router;