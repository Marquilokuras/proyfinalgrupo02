const mesaCtrl = require('./../controllers/mesa.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/',/*autCtrl.verifyToken,*/ mesaCtrl.createMesa);
router.get('/',/*autCtrl.verifyToken,*/ mesaCtrl.getMesa); 
router.get('/porNumero',/*autCtrl.verifyToken,*/ mesaCtrl.getMesaPorNumero); 
router.get('/disponible',/*autCtrl.verifyToken,*/ mesaCtrl.getMesasDisponibles); 
router.get('/noDisponible',/*autCtrl.verifyToken,*/ mesaCtrl.getMesasNoDisponibles); 
router.get('/:id',/*autCtrl.verifyToken,*/ mesaCtrl.getUnaMesa);

// router.put('/reserva', mesaCtrl.reservarMesa); 
router.delete('/:id'/* ,autCtrl.verifyToken */, mesaCtrl.eliminarMesa); 
router.put('/:id'/* ,autCtrl.verifyToken */,mesaCtrl.editMesa);

module.exports = router;