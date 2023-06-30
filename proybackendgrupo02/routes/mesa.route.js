//defino controlador para el manejo de CRUD
const mesaCtrl = require('./../controllers/mesa.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

router.post('/', mesaCtrl.createMesa); //Dar de alta un Mesa
router.get('/', mesaCtrl.getMesa); //Obtener todas las Mesas
router.get('/disponible', mesaCtrl.getMesasDisponibles); //Obtener mesas disponibles
router.get('/noDisponible', mesaCtrl.getMesasNoDisponibles); //Obtener mesas no disponibles
router.get('/:id', mesaCtrl.getUnaMesa); //Obtener todas las Mesas
// router.put('/reserva', mesaCtrl.reservarMesa); //Reserva 1 Mesa
router.delete('/:id', mesaCtrl.eliminarMesa); //Eliminar una mesa
router.put('/:id',mesaCtrl.editMesa); //Modificar un Mesa
//exportamos el modulo de rutas
module.exports = router;