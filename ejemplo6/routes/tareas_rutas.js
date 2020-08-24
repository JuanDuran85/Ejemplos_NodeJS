const express = require('express');
let TarreasControlador = require('../controllers/tarreas');
const router = express.Router();

router.route('/tareas').get(function (req,res){
    console.log('desde la ruta tareas...');
    //res.send("mensaje desde la ruta tareas con get...");
}).post(TarreasControlador.create);

router.get('/tareas/nueva',TarreasControlador.nueva);
router.get('/tareas/index',TarreasControlador.home);

module.exports = router;