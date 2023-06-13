//defino controlador para el manejo de CRUD
const mesaCtrl = require('./../controllers/mesa.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

router.post('/', mesaCtrl.createMesa); //Dar de alta un Mesa
router.get('/', mesaCtrl.getMesa); //Obtener todas los Mesa
//router.delete('/:id', usuarioCtrl.deleteUsuario); //Eliminar un Mesa
//router.put('/:id',usuarioCtrl.editUsuario); //Modificar un Mesa
//exportamos el modulo de rutas
module.exports = router;