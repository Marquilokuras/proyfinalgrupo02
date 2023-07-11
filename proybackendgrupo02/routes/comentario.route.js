const comentarioCtrl = require('./../controllers/comentario.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/', comentarioCtrl.getComentarios); 
router.get('/puntaje', comentarioCtrl.getComment);
router.post('/',autCtrl.verifyToken, comentarioCtrl.createComentario);
router.put('/:id',autCtrl.verifyToken, comentarioCtrl.editComentario);
router.delete('/:id',autCtrl.verifyToken, comentarioCtrl.deleteComentario);
router.get('/:id',autCtrl.verifyToken, comentarioCtrl.getComentario);

module.exports = router;