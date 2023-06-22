const mongoose = require('mongoose');
const { Schema } = mongoose;
const Bebida = require('./bebida');
const MenuSchema = new Schema({
    fechaActualizacion: { type: String, required: true },
    bebida: {type: Schema.Types.ObjectId, ref: Bebida, required: true }
})

module.exports = mongoose.models.Menu || mongoose.model('Menu', MenuSchema)