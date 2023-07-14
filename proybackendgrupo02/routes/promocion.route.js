const promocionCtrl = require('./../controllers/promocion.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/disponibles', promocionCtrl.promocionesDiponibles);

router.get('/'/* ,autCtrl.verifyToken */, promocionCtrl.getPromociones); 
router.post('/'/* ,autCtrl.verifyToken*/ , promocionCtrl.crearPromocion); 
router.get('/:id'/* ,autCtrl.verifyToken */, promocionCtrl.getPromocion); 
router.put('/:id'/* ,autCtrl.verifyToken */, promocionCtrl.editarPromocion);
router.delete('/:id'/* ,autCtrl.verifyToken */, promocionCtrl.eliminarPromocion);
router.get('/:idpromocion/bebida/:idbebida'/* ,autCtrl.verifyToken */, promocionCtrl.agregarBebida);
router.delete('/:idpromocion/bebida/:idbebida'/* ,autCtrl.verifyToken */,promocionCtrl.eliminarBebida);
router.get('/idPromo/:nombrePromo'/* ,autCtrl.verifyToken */, promocionCtrl.buscarPromocion);

module.exports = router;
