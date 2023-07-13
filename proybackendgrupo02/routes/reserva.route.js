const reservaCtrl = require('./../controllers/reserva.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/'/* ,autCtrl.verifyToken */, reservaCtrl.createReserva); 
router.get('/'/* ,autCtrl.verifyToken */, reservaCtrl.getReserva); 
router.get('/todas'/* ,autCtrl.verifyToken */, reservaCtrl.getReservas); 
router.get('/mesa'/* ,autCtrl.verifyToken */, reservaCtrl.getReservasPorMesa); 
router.get('/:id'/* ,autCtrl.verifyToken */, reservaCtrl.getUnaReserva);
router.delete('/:id'/* ,autCtrl.verifyToken */, reservaCtrl.eliminarReserva); 
router.put('/:id'/* ,autCtrl.verifyToken */,reservaCtrl.editReserva); 

module.exports = router;