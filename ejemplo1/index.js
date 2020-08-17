const http = require('http');

function resPeticion(request,response) {
    response.end("Mensaje desde el servidor");
};

let server = http.createServer(resPeticion);

server.listen(8080);
console.log("Ejecutando servidor de ejemplo...")