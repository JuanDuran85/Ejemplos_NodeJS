const { response, request } = require('express');

// para peticiones get
const userGet = (req, res = response) => {
    const { q, nombre = "No name", apikey, page = 1, limit} = req.query
    res.json({
        msg: "get API - controller",
        q, 
        nombre, 
        apikey,
        page, 
        limit
    });
};

const userPost = (req = request, res = response) => {
    const { nombre, edad } = req.query;
    res.json({
        msg: "post API - controller",
        nombre,
        edad
    });
};

const userDelete = (req, res = response) => {
    res.json({
        msg: "delete API - controller",
    });
};

const userPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: "put API - controller",
        id
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