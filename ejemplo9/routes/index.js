let express = require('express');
let router = express.Router();
let apiHelpers = require('../helpers/apiHelpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  apiHelpers.callApi('http://localhost:5000/api/')
    .then(response => {
      console.log(response);
      res.render('index', { 
        title: 'Conectar con API',
        subtitle: 'Ejemplo NodeJS Express',
        informacion: 'Traer información',
        data: response.data
      });
    })
    .catch(error => console.log(error))

});

module.exports = router;
