const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dniUsuario: { type: String, required: true },
    edadUsuario: { type: Number, required: true },
    tipoUsuario: { type: String, required: true, enum: ['cliente','gestor', 'administrador'] },
})

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema);