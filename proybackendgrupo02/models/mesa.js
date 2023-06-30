const mongoose = require('mongoose');
const { Schema } = mongoose;

const MesaSchema = new Schema({
    numeroMesa: { type: Number, required: true },
    disponibilidadReserva: { type: Boolean},
    cantidadMesa: { type: Number, required: true },
    cantidadSilla: { type: Number, required: true },
    usuario:{ type: String, required: false},
})

module.exports = mongoose.models.Mesa || mongoose.model('Mesa', MesaSchema);