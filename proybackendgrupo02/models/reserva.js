const mongoose = require('mongoose');
const { Schema } = mongoose;
const Mesa = require('./mesa');

const ReservaSchema = new Schema({
    hora: { type: String, required: true },
    fecha: { type: String, required: true },
    mesa: { type: Schema.Types.ObjectId, ref: Mesa },
    usuario: { type: String, required: true}
})

module.exports = mongoose.models.Reserva || mongoose.model('Reserva', ReservaSchema);