const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

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

usuarioCtrl.loginUsuario = async (req, res) => {

    //el método findOne retorna un objeto que cumpla con los criterios de busqueda
    Usuario.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (!user) {
                res.json({
                    status: 0,
                    msg: "not found"
                })
            } else {
                const unToken = jwt.sign({id: user._id}, "secretkey");
                res.json({
                    status: 1,
                    msg: "success",
                    email: user.email, //retorno información útil para el frontend
                    tipoUsuario: user.tipoUsuario, //retorno información útil para el frontend
                    userid: user._id, //retorno información útil para el frontend
                    token : unToken
                })
            }
        }) .catch(err => {
            if (err) {
                res.json({
                    status: 0,
                    msg: 'error'
                })
            }
        })

}

usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Usuario.findByIdAndUpdate({ _id: id }, req.body, { new: true, });

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