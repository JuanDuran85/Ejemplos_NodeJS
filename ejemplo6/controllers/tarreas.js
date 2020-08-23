const Tarrea = require('../models').Tarrea;

module.exports = {
    home: function (req,res) {
        Tarrea.findAll().then((datos)=>{
            res.render('tarreas/index',{
                tareas: datos
            });
        })
    }
}