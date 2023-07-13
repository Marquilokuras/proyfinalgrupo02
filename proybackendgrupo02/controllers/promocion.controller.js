const bebida = require('../models/bebida')
const Promocion = require('../models/promocion')

const promocionCtrl = {}

promocionCtrl.getPromociones = async (req, res) => {
    const promociones = await Promocion.find().populate('bebidas')
    res.json(promociones);
}

promocionCtrl.crearPromocion = async (req, res) => {
    var promocion = new Promocion(req.body)
    try {
        await promocion.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

promocionCtrl.editarPromocion = async (req, res) => {
    const promocion = new Promocion(req.body);
    try {
        await Promocion.updateOne({ _id: req.body._id }, promocion)
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

promocionCtrl.eliminarPromocion = async (req, res) => {
    try {
        await Promocion.deleteOne({ _id: req.params.id })
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

promocionCtrl.getPromocion = async (req, res) => {
    const promocion = await Promocion.findById(req.params.id).populate('bebidas')
    res.json(promocion)
}

promocionCtrl.buscarPromocion = async (req, res) => {
    const promocion = await Promocion.findOne({nombrePromocion : req.params.nombrePromo}).populate('bebidas')
    res.json(promocion)
}

promocionCtrl.promocionesDiponibles = async (req, res) => {
    try {
        const promociones = await Promocion.find({ disponibilidadPromocion: true }).populate('bebidas');
        res.json(promociones)
    } catch (error) {
        res.status(400).json({})
    }
};

promocionCtrl.agregarBebida = async (req, res) => {
    const idbebida = req.params.idbebida;
    const idPromocion = req.params.idpromocion;
    try {
        var promocion = await Promocion.findById(idPromocion);
        promocion.bebidas.push(idbebida);
        await promocion.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

promocionCtrl.eliminarBebida = async (req, res) => {
    const idbebida = req.params.idbebida;
    const idPromocion = req.params.idpromocion;
    try {
        var promocion = await Promocion.findById(idPromocion);
        promocion.bebidas.pop(idbebida);
        await promocion.save();
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

module.exports = promocionCtrl;