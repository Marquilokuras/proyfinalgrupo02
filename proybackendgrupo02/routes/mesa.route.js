//defino controlador para el manejo de CRUD
const mesaCtrl = require('./../controllers/mesa.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();
//definimos las rutas para la gestion de producto
//router.post('/', usuarioCtrl.createUsuario); //Dar de alta un Usuario
router.get('/', mesaCtrl.getMesa); //Obtener todas los Usuario
//router.delete('/:id', usuarioCtrl.deleteUsuario); //Eliminar un Usuario
//router.put('/:id',usuarioCtrl.editUsuario); //Modificar un Usuario
//exportamos el modulo de rutas
module.exports = router;