const Mesa = require('../models/mesa');
const mesaCtrl = {}

mesaCtrl.getMesa = async (req, res) => { //se define una funcion asincrona
    var mesas = await Mesa.find();
    res.json(mesas);
}

module.exports = mesaCtrl;