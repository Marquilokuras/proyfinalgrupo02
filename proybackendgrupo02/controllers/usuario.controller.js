const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const usuarioCtrl = {}

usuarioCtrl.getUsuario = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json(usuarios);
}

usuarioCtrl.createUsuario = async (req, res) => {
    var usuario = new Usuario(req.body);
    try {
        await usuario.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

usuarioCtrl.loginUsuario = async (req, res) => {

    Usuario.findOne({ email: req.body.email, password: req.body.password })
        .then(user => {
            if (!user) {
                res.json({})
            } else {
                const unToken = jwt.sign({ id: user._id }, "secretkey");
                res.json({
                    status: 1,
                    msg: "success",
                    email: user.email,
                    tipoUsuario: user.tipoUsuario,
                    userid: user._id,
                    token: unToken
                })
            }
        }).catch(err => {
            if (err) {
                res.json({})
            }
        })
}

usuarioCtrl.editUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        req.body;
        await Usuario.findByIdAndUpdate({ _id: id }, req.body, { new: true, });
        res.json({});
    } catch (err) {
        res.status(400).json({})
    }
};

usuarioCtrl.deleteUsuario = async (req, res) => {
    try {
        await Usuario.deleteOne({ _id: req.params.id });
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

usuarioCtrl.recuperarContrasena = async (req, res) => {
    const email = req.query.email;
    const dniUsuario = req.query.dniUsuario;
    try {
        const usuario = await Usuario.findOne({ email, dniUsuario });
        res.json(usuario);
    } catch (error) {
        res.status(500).json();
    }
};

module.exports = usuarioCtrl;