//defino controlador para el manejo de CRUD
const comentarioCtrl = require('./../controllers/comentario.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', comentarioCtrl.getComentarios); // http://localhost:3000/api/comentario/
router.post('/', comentarioCtrl.createComentario);
router.get('/puntaje', comentarioCtrl.getComment);
router.put('/:id', comentarioCtrl.editComentario);
router.delete('/:id', comentarioCtrl.deleteComentario);
router.get('/:id', comentarioCtrl.getComentario);
//exportamos el modulo de rutas 
module.exports = router;