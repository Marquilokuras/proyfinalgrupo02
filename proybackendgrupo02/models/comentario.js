const mongoose = require('mongoose');
const Usuario = require('./usuario');
const { Schema } = mongoose;

const ComentarioSchema = new Schema ({
    usuario: {type: Schema.Types.ObjectId, ref: Usuario, required: true },
    descripcionComentario: {type:String, requiere:true},
    puntajeComentario : {type:Number, requiere:true},
    fechaComentario : {type:String, requiere:true},  
})
module.exports = mongoose.models.Comentario || mongoose.model('Comentario',ComentarioSchema);