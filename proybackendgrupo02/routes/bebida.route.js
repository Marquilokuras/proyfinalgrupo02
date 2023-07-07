//defino controlador para el manejo de CRUD 

const bebidaCtrl = require('./../controllers/bebida.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida
router.get('/disponibles',bebidaCtrl.mostrarBebidasDisponibles);
router.get('/', bebidaCtrl.getBebidas); 
router.post('/', bebidaCtrl.crearBebida); 
router.get('/:id', bebidaCtrl.getBebida); 
router.put('/:id', bebidaCtrl.editarBebida);
router.delete('/:id', bebidaCtrl.eliminarBebida);


//exportamos el modulo de rutas 

module.exports = router;