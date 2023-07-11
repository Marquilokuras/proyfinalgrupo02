const ImagenUsuario = require('../models/imagenUsuario');
const imagenUsuarioCtrl = {}

imagenUsuarioCtrl.getImagenes = async(req,res)=>{
    const imagenes = await ImagenUsuario.find();
    res.json(imagenes);
}

imagenUsuarioCtrl.crearImagen = async (req,res) => {
    var imagen = new ImagenUsuario(req.body)
    try{
        await imagen.save();
        res.json({
            'status':'1',
            'msg': 'Imagen guardad'
        })
    }catch (error){
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

module.exports = imagenUsuarioCtrl;