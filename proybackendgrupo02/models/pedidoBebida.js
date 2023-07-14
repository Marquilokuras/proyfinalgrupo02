const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bebida = require('./bebida');
const Promocion = require('./promocion');

const PedidoSchema = new Schema({
    //promocion: { type: Schema.Types.ObjectId, ref: Promocion },
    promo : [
        {
            promocion : { type: String }
        }
    ],
    numeroPedido: { type: Number , required: true },
    totalPedido: { type: Number , required: true },
    fechaPedido: { type: String, required: true},
    bebidasPedido: [
        {
            cantidadBebidas: { type: Number, required: true },
            precioDetalle: { type: Number},
            bebida: {type: Schema.Types.ObjectId, ref: 'Bebida', required: true }
        },
    ],
})
module.exports = mongoose.models.Pedido || mongoose.model('Pedido', PedidoSchema)