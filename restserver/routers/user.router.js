const { Router } = require('express');
const { userGet, userPatch, userDelete, userPost, userPut } = require('../controllers/user.controllers');

const router = Router();

// no se ejecuta la funciones de los controllers
router.get('/', userGet);

router.put('/:id', userPut);

router.post('/', userPost);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;