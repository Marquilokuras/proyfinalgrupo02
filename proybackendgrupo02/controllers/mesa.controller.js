const Mesa = require('../models/mesa');
const mesaCtrl = {}

mesaCtrl.getMesa = async (req, res) => {
    var mesas = await Mesa.find();
    res.json(mesas);
}

mesaCtrl.getMesasDisponibles = async (req, res) => {
    var mesas = await Mesa.find({ disponibilidadReserva: true });
    res.json(mesas);
}

mesaCtrl.getMesasNoDisponibles = async (req, res) => {
    var mesas = await Mesa.find({ disponibilidadReserva: false });
    res.json(mesas);
}

mesaCtrl.createMesa = async (req, res) => {
    var mesa = new Mesa(req.body);
    try {
        await mesa.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

mesaCtrl.editMesa = async (req, res) => {
    const vMesa = new Mesa(req.body);
    try {
        await Mesa.updateOne({ _id: req.body._id }, vMesa);
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

mesaCtrl.eliminarMesa = async (req, res) => {
    try {
        await Mesa.deleteOne({ _id: req.params.id });
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

mesaCtrl.getUnaMesa = async (req, res) => {
    const mesa = await Mesa.findById(req.params.id)
    res.json(mesa);
}

mesaCtrl.getMesaPorNumero = async (req, res) => {
    let criteria = {}
    criteria.numeroMesa = parseInt(req.query.numero)
    const mesa = await Mesa.find({ numeroMesa: criteria.numeroMesa })
    res.json(mesa);
}

module.exports = mesaCtrl;