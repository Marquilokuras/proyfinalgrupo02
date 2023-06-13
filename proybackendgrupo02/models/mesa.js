const mongoose = require('mongoose');
const { Schema } = mongoose;

const MesaSchema = new Schema({
    numeroMesa: { type: Number, required: true },
    disponibilidadReserva: { type: Boolean},
    cantidadMesa: { type: Number, required: true },
    cantidadSilla: { type: Number, required: true },
})

module.exports = mongoose.models.Mesa || mongoose.model('Mesa', MesaSchema);