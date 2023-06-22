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
        res.json({
            'status': '1',
            'msg': ' Bebida guardada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

bebidaCtrl.editarBebida = async (req, res) => {
    const bebida = new Bebida(req.body);
    try {
        await Bebida.updateOne({ _id: req.body._id }, bebida);
        res.json({
            'status': '1',
            'msg': 'Bebida Actualizada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

bebidaCtrl.eliminarBebida = async (req, res) => {
    try {
        await Bebida.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Bebida eliminada'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
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
        res.status(500).json({ error: 'Error' });
    }
};

module.exports = bebidaCtrl;