const fs = require('fs');
const { getTablaMultiply } = require('./helpers/multiplicar');

getTablaMultiply(2)
    .then(resp => console.log(resp))
    .catch(error => console.log(error));