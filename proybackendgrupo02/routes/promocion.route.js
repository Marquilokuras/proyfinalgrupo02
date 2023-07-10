//defino controlador para el manejo de CRUD 

const promocionCtrl = require('./../controllers/promocion.controller');
const autCtrl = require('./../controllers/auth.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida
router.get('/disponibles', promocionCtrl.promocionesDiponibles);
router.get('/',autCtrl.verifyToken, promocionCtrl.getPromociones); 
router.post('/',autCtrl.verifyToken, promocionCtrl.crearPromocion); 
router.get('/:id',autCtrl.verifyToken, promocionCtrl.getPromocion); 
router.put('/:id',autCtrl.verifyToken, promocionCtrl.editarPromocion);
router.delete('/:id',autCtrl.verifyToken, promocionCtrl.eliminarPromocion);
router.get('/:idpromocion/bebida/:idbebida',autCtrl.verifyToken, promocionCtrl.agregarBebida);//ruta para agregar una bebida
router.delete('/:idpromocion/bebida/:idbebida',autCtrl.verifyToken,promocionCtrl.eliminarBebida)//tura para eliminar una bebida

//exportamos el modulo de rutas 

module.exports = router;