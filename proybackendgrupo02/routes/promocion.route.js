//defino controlador para el manejo de CRUD 

const promocionCtrl = require('./../controllers/promocion.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida
router.get('/disponibles', promocionCtrl.promocionesDiponibles);
router.get('/', promocionCtrl.getPromociones); 
router.post('/', promocionCtrl.crearPromocion); 
router.get('/:id', promocionCtrl.getPromocion); 
router.put('/:id', promocionCtrl.editarPromocion);
router.delete('/:id', promocionCtrl.eliminarPromocion);
router.get('/:idpromocion/bebida/:idbebida', promocionCtrl.agregarBebida);//ruta para agregar una bebida
router.delete('/:idpromocion/bebida/:idbebida',promocionCtrl.eliminarBebida)//tura para eliminar una bebida

//exportamos el modulo de rutas 

module.exports = router;