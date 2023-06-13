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

module.exports = mesaCtrl;