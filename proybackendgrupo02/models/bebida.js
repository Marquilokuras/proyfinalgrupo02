const mongoose = require('mongoose');
const { Schema } = mongoose;

const BebidaSchema = new Schema ({
    ingredientesBebida : {type:String, requiere:true},
    nombreBebida : {type:String, requiere:true},
    precioBebida : {type:Number, requiere:true},
    tipoVasoBebida : {type:String, requiere:true}, 
    disponibilidadBebida : {type:Boolean, requiere:true},
    imagenBebida: {type:String,require:true},   
})

/*BebidaSchema.pre("deleteOne", async function(next){
    const Promocion = require('./promocion')
    const idBebida = this.getFilter()['_id'];

    const promociones = await Promocion.find({bebidas: idBebida})
    if(promociones.length>0){
        return next(new Error("error al intentar eliminar bebida que esta siendo usada en una promocion"))
    }
})*/


module.exports = mongoose.models.Bebida || mongoose.model('Bebida',BebidaSchema);