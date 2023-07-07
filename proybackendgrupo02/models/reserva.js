const mongoose = require('mongoose');
const { Schema } = mongoose;
const Mesa = require('./mesa');

const ReservaSchema = new Schema({
    hora: { type: String, required: true },
    fecha: { type: Date, required: true },
    cantidadMesa: { type: Number, required: true },
    cantidadSilla: { type: Number, required: true },
    numeroMesa: { type: Number, required: true },
    usuario: { type: String, required: true}
})

module.exports = mongoose.models.Reserva || mongoose.model('Reserva', ReservaSchema);