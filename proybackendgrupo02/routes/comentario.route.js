//defino controlador para el manejo de CRUD
const comentarioCtrl = require('./../controllers/comentario.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de agente
router.get('/', comentarioCtrl.getComentarios); // http://localhost:3000/api/comentario/
router.get('/puntaje', comentarioCtrl.getComment);
router.post('/',autCtrl.verifyToken, comentarioCtrl.createComentario);
router.put('/:id',autCtrl.verifyToken, comentarioCtrl.editComentario);
router.delete('/:id',autCtrl.verifyToken, comentarioCtrl.deleteComentario);
router.get('/:id',autCtrl.verifyToken, comentarioCtrl.getComentario);
//exportamos el modulo de rutas

module.exports = router;