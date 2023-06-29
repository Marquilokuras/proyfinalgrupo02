const Pedido = require('../models/pedidoBebida');
const Bebida = require('../models/bebida');
const pedidoCtrl = {}

pedidoCtrl.getPedidoBebida = async (req, res) => { 
    var pedidos = await Pedido.find().populate('bebidasPedido.bebida');
    res.json(pedidos);
}

pedidoCtrl.createPedidoBebida = async (req, res) => {
    let pedido = new Pedido({ totalPedido: 0, bebidasPedido: [] })
    try {
        let cantidadBebidas = 0;
        let precioDetalle = 0;
        let bebidaId = ""
        let precioPedido = 0;
        const arrayBebida = req.body.bebidasPedido;

        for (let i = 0; i < arrayBebida.length; i++) {
            cantidadBebidas = arrayBebida[i].cantidadBebidas;
            precioDetalle = arrayBebida[i].precioDetalle
            bebidaId = arrayBebida[i].bebida
            pedido.bebidasPedido.push({cantidadBebidas, precioDetalle, bebida:bebidaId })
            precioPedido = precioPedido + precioDetalle * cantidadBebidas; 
        }

        pedido.totalPedido = precioPedido
        pedido.save();
        res.json({
            'status': '1',
            'msg': 'Pedido guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

pedidoCtrl.editPedidoBebida = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Pedido.findByIdAndUpdate({ _id: id }, req.body, { new: true, });

        res.json({
            status: '1',
            msg: 'Pedido Modifiado'
        });

    } catch (err) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
};

pedidoCtrl.deletePedidoBebida = async (req, res) => {
    try {
        await Pedido.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Pedido eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = pedidoCtrl;