const pedidoBebidaCtrl = require('./../controllers/pedidoBebida.controller');

const express = require('express');
const router = express.Router();

router.post('/', pedidoBebidaCtrl.createPedidoBebida); 
router.get('/pedidos', pedidoBebidaCtrl.getPedidoBebida); 
router.delete('/:id', pedidoBebidaCtrl.deletePedidoBebida); 
router.put('/:id',pedidoBebidaCtrl.editPedidoBebida); 

module.exports = router;