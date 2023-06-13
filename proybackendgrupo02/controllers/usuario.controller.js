const Usuario = require('../models/usuario');
const usuarioCtrl = {}

usuarioCtrl.getUsuario = async (req, res) => { //se define una funcion asincrona
    var usuarios = await Usuario.find();
    res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({
            'status': '1',
            'msg': 'Usuario guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Usuario.findByIdAndUpdate( { _id: id },req.body, {new: true,});
      
        res.json({
            status: '1',
            msg: 'Usuario Modifiado'
        });

    } catch (err) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

module.exports = usuarioCtrl;