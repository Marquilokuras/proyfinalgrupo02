const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bebida = require('./bebida');

const PromocionSchema = new Schema({
    nombrePromocion: { type: String, required: true },
    totalPrecioPromocion: { type: Number, required: true },
    totalPrecioBebidasSinDescuento: {type:Number, required: true},
    descuento: {type:Number, required: true},
    disponibilidadPromocion : {type:Boolean, requiere:true},
    fechaPromocion : {type:Date, required: true},
    bebidas: [{type: Schema.Types.ObjectId, ref: Bebida, required: true }] 
})
module.exports = mongoose.models.Promocion || mongoose.model('Promocion', PromocionSchema)