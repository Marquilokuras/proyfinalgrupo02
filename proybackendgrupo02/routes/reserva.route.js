const reservaCtrl = require('./../controllers/reserva.controller');
const express = require('express');
const router = express.Router();

router.post('/', reservaCtrl.createReserva); 
router.get('/', reservaCtrl.getReserva); 
router.get('/todas', reservaCtrl.getReservas); 
router.get('/mesa', reservaCtrl.getReservasPorMesa); 
router.get('/:id', reservaCtrl.getUnaReserva);
router.delete('/:id', reservaCtrl.eliminarReserva); 
router.put('/:id',reservaCtrl.editReserva); 

module.exports = router;