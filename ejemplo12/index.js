const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(fileUpload());

app.post('/api/single-file', (req,res)=>{
    const archivo = req.files.miArchivo;
    res.set('Content-Type', 'text/html');
    archivo.mv('./uploads/' + archivo.name);
    res.send(`
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Peso</th>
                    <th>Mime type</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${archivo.name}</td>
                    <td>${archivo.size}</td>
                    <td>${archivo.mimetype}</td>
                </tr>
            </tbody>
        </table>
    `);
});

app.post('/api/multi-file',(req,res)=>{
    res.set('Content-Type', 'text/html');
    let respuesta = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Peso</th>
                    <th>Mime type</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (const archivo of req.files.misArchivos) {
        archivo.mv('./uploads/' + archivo.name);
        respuesta += `
            <tr>
                <td>${archivo.name}</td>
                <td>${archivo.size}</td>
                <td>${archivo.mimetype}</td>
            </tr>
        `; 
    };
    respuesta += '</tbody></table>';
    res.send(respuesta);
});

app.get('/api/download', (_req,res)=>{
    res.download('./public/assets/img/perros1.jpg', 'imagen.jpg');
});

app.get('/api/sendfile', (_req,res)=>{
    res.sendFile(path.join(__dirname, './public/assets/img/perros1.jpg'));
});

app.get('/api/attachment', (_req,res)=>{
    res.attachment('./public/assets/img/perros1.jpg');
});

const port = 3000;

app.listen(port, () =>
    console.log(`Server is running and listening on port ${port}`)
);
