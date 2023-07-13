const autCtrl = require('./../controllers/auth.controller');
const bebidaCtrl = require('./../controllers/bebida.controller');
const express = require('express');
const router = express.Router();

router.get('/disponibles'/* ,autCtrl.verifyToken */,bebidaCtrl.mostrarBebidasDisponibles);
router.get('/',bebidaCtrl.getBebidas); 
router.post('/'/* ,autCtrl.verifyToken */,bebidaCtrl.crearBebida); 
router.get('/:id'/* ,autCtrl.verifyToken */,bebidaCtrl.getBebida); 
router.put('/:id'/* ,autCtrl.verifyToken */,bebidaCtrl.editarBebida);
router.delete('/:id'/* ,autCtrl.verifyToken */,bebidaCtrl.eliminarBebida);

module.exports = router;