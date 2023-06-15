const mongoose = require('mongoose');
const { Schema } = mongoose;
const BebidaSchema = new Schema ({
    ingredientesBebida : {type:String, requiere:true},
    nombreBebida : {type:String, requiere:true},
    precioBebida : {type:Number, requiere:true},
    tipoVasoBebida : {type:String, requiere:true},  
})
module.exports = mongoose.models.Bebida || mongoose.model('Bebida',BebidaSchema);