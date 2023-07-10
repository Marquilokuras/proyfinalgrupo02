//defino controlador para el manejo de CRUD 
const autCtrl = require('./../controllers/auth.controller');
const bebidaCtrl = require('./../controllers/bebida.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida
router.get('/disponibles',bebidaCtrl.mostrarBebidasDisponibles);
router.get('/',bebidaCtrl.getBebidas); 
router.post('/',autCtrl.verifyToken,bebidaCtrl.crearBebida); 
router.get('/:id',autCtrl.verifyToken,bebidaCtrl.getBebida); 
router.put('/:id',autCtrl.verifyToken,bebidaCtrl.editarBebida);
router.delete('/:id',autCtrl.verifyToken,bebidaCtrl.eliminarBebida);

//exportamos el modulo de rutas 

module.exports = router;