const mesa = require('../models/mesa');
const Mesa = require('../models/mesa');
const mesaCtrl = {}

mesaCtrl.getMesa = async (req, res) => { //se define una funcion asincrona
    var mesas = await Mesa.find();
    res.json(mesas);
}

mesaCtrl.createMesa = async (req, res) => {
    var mesa = new Mesa(req.body);
    try {
        await mesa.save();
        res.json({
            'status': '1',
            'msg': 'Mesa guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

mesaCtrl.reservarMesa = async (req, res) => {
    try {

        const { numeroMesa } = req.params;

        await Mesa.findByIdAndUpdate( { mesaReserva: numeroMesa },req.body, {new: true,});;
        await mesa.save();
        res.json({
            'status': '1',
            'msg': 'Mesa reservada.'
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener mesa a reservar' });
    }
}

module.exports = mesaCtrl;