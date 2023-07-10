//defino controlador para el manejo de CRUD
const mesaCtrl = require('./../controllers/mesa.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

router.post('/',autCtrl.verifyToken, mesaCtrl.createMesa); //Dar de alta un Mesa
router.get('/',autCtrl.verifyToken, mesaCtrl.getMesa); //Obtener todas las Mesas
router.get('/disponible',autCtrl.verifyToken, mesaCtrl.getMesasDisponibles); //Obtener mesas disponibles
router.get('/noDisponible',autCtrl.verifyToken, mesaCtrl.getMesasNoDisponibles); //Obtener mesas no disponibles
router.get('/:id',autCtrl.verifyToken, mesaCtrl.getUnaMesa); //Obtener todas las Mesas
// router.put('/reserva', mesaCtrl.reservarMesa); //Reserva 1 Mesa
router.delete('/:id',autCtrl.verifyToken, mesaCtrl.eliminarMesa); //Eliminar una mesa
router.put('/:id',autCtrl.verifyToken,mesaCtrl.editMesa); //Modificar un Mesa
//exportamos el modulo de rutas
module.exports = router;