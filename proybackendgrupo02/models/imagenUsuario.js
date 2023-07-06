const mongoose = require('mongoose');
const {Schema} = mongoose;

const ImagenUsuario = new Schema ({
    imagenUsuario: {type:String,require:true}, 
})

module.exports = mongoose.models.ImagenUsuario || mongoose.model('ImagenUsuario',ImagenUsuario)
