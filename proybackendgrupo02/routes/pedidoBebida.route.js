const pedidoBebidaCtrl = require('./../controllers/pedidoBebida.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.get('/pedidos'/* ,autCtrl.verifyToken */, pedidoBebidaCtrl.getPedidoBebida); 
router.post('/'/* ,autCtrl.verifyToken */, pedidoBebidaCtrl.createPedidoBebida); 
router.delete('/:id'/* ,autCtrl.verifyToken */, pedidoBebidaCtrl.deletePedidoBebida); 
router.put('/:id'/* ,autCtrl.verifyToken */,pedidoBebidaCtrl.editPedidoBebida); 

module.exports = router;