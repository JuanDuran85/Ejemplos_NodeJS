const { response } = require('express');

// para peticiones get
const userGet = (req, res = response) => {
    res.json({
        msg: "get API - controller"
    });
};

const userPost = (req, res = response) => {
    const {nombre,edad} = req.body;
    res.json({
        msg: "post API - controller",
        nombre,
        edad
    });
};

const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller"
    });
};

const userPut = (req, res = response) => {
    res.json({
        msg: "put API - controller"
    });
};

const userPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controller"
    });
};




module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
};