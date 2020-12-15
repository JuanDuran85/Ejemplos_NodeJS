const functions = require('firebase-functions'); 
const admin = require('firebase-admin'); 
admin.initializeApp(functions.config().firebase); 
const express = require('express'); 
const cors = require('cors');

const router = express();  // Automatically allow cross-origin requests
router.use(cors({ origin: true }));

router.get('/favoritos/:id', async(req, res) => {
    const persoFav = await admin.firestore().collection('personajesfavoritos').doc(req.params.id).get();  
    res.send(persoFav);
});

router.get('/favoritos', async(req, res) => {
    const personajesFav = await admin.firestore().collection('personajesfavoritos').get();
    var lista = [];  
    personajesFav.docs.forEach(doc => {   
        lista.push({ 
            id: doc.id, 
            data: doc.data(),
        }); 
    });  
    res.send(lista);
});

router.post('/favoritos', async(req, res) => {
    const personajesFav = await admin.firestore().collection('personajesfavoritos').add(req.body);
    res.send(personajesFav);
});

router.put('/favoritos/:id', async(req, res) => {
    const personajesFav = awaitadmin.firestore().collection('personajesfavoritos').doc(req.params.id)
        .update(req.body);   
    res.send(personajesFav);
});

router.delete('/favoritos/:id', async (req, res) => { 
    const personajesFav = awaitadmin.firestore().collection('personajesfavoritos').doc(req.params.id)
        .delete(); 
    res.send(personajesFav); 
});

// Expose Express API as a single Cloud Function:
exports.test = functions.https.onRequest(router);