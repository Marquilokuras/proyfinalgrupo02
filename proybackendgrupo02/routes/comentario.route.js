const comentarioCtrl = require('./../controllers/comentario.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/', comentarioCtrl.getComentarios); 
router.get('/puntaje', comentarioCtrl.getComment);
router.post('/'/* ,autCtrl.verifyToken */, comentarioCtrl.createComentario);
router.delete('/:id'/* ,autCtrl.verifyToken */, comentarioCtrl.deleteComentario);

module.exports = router;