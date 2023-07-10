const Bebida = require('../models/bebida');
const bebidaCtrl = {}

bebidaCtrl.getBebidas = async (req, res) => {
    const bebidas = await Bebida.find();
    res.json(bebidas);
}

bebidaCtrl.crearBebida = async (req, res) => {
    var bebida = new Bebida(req.body)
    try {
        await bebida.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

bebidaCtrl.editarBebida = async (req, res) => {
    const bebida = new Bebida(req.body);
    try {
        await Bebida.updateOne({ _id: req.body._id }, bebida);
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

bebidaCtrl.eliminarBebida = async (req, res) => {
    try {
        await Bebida.deleteOne({ _id: req.params.id });
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

bebidaCtrl.getBebida = async (req, res) => {
    const bebida = await Bebida.findById(req.params.id);
    res.json(bebida);
}

bebidaCtrl.mostrarBebidasDisponibles = async (req, res) => {
    try {
        const bebida = await Bebida.find({ disponibilidadBebida: true });
        res.status(200).json(bebida);
    } catch (error) {
        res.status(500).json();
    }
};

module.exports = bebidaCtrl;