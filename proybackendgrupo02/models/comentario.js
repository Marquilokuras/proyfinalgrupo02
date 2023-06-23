const mongoose = require('mongoose');
const Usuario = require('./usuario');
const { Schema } = mongoose;
const ComentarioSchema = new Schema ({
    usuario:{type:String, requiere:true},
    descripcionComentario: {type:String, requiere:true},
    puntajeComentario : {type:Number, requiere:true},
    fechaComentario : {type:String, requiere:true},  
})
module.exports = mongoose.models.Comentario || mongoose.model('Comentario',ComentarioSchema);