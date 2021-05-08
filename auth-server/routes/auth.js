const { Router } = require('express');

const router = Router();

// definiendo rutas

//crear un nuevo usuario
router.post('/new',(req,res)=>{
    return res.json({
        ok:true,
        msg:"crear usuario /new"
    });
});

//login de usuario
router.post('/',(req,res)=>{
    return res.json({
        ok:true,
        msg:"crear usuario /"
    });
});

//validar y revalidar token
router.get('/renew',(req,res)=>{
    return res.json({
        ok:true,
        msg:"Renew /"
    });
});

module.exports = router;