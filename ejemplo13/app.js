const fs = require('fs');
const { getTablaMultiply } = require('./helpers/multiplicar');
const argv = require('./config/yargs');

getTablaMultiply(argv.b, argv.l, argv.h)
    .then(resp => console.log(resp))
    .catch(error => console.log(error));