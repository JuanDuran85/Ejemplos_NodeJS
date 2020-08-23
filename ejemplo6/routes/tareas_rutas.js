const express = require('express');
const router = express.Router();

router.route('/tareas').get(function (req,res){
    console.log('desde la ruta tareas...');
    res.send("mensaje desde la ruta tareas con get...");
}).post(function (req,res){
    console.log("En la ruta tareas con post");
});

module.exports = router;