const Reserva = require('../models/reserva');
const reservaCtrl = {}

reservaCtrl.getReserva = async (req, res) => { 
    let criteria = {}
     criteria.usuario = req.query.usuario
    var reservas = await Reserva.find({usuario : criteria.usuario});
    res.json(reservas);
}

reservaCtrl.getReservas = async (req, res) => { 
   
    var reservas = await Reserva.find();
    res.json(reservas);
}

// reservaCtrl.getReservasPorMesa = async (req, res) => { 
//     let criteria = {}
//     criteria.mesa.numeroMesa = req.query.mesa
//     var reservas = await Reserva.find({'mesa.numeroMesa' : criteria.mesa.numeroMesa});
//     res.json(reservas);
// }
reservaCtrl.getReservasPorMesa = async (req, res) => { 
    let criteria = {}
    criteria.numeroMesa = req.query.numeroMesa;
    var reservas = await Reserva.find({ numeroMesa : criteria.numeroMesa});
    res.json(reservas);
};

reservaCtrl.createReserva = async (req, res) => {
    var reserva = new Reserva(req.body);
    try {
        await reserva.save();
        res.json({
            'status': '1',
            'msg': 'reserva guardada.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

reservaCtrl.editReserva = async (req, res) => {
    const vReserva = new Reserva(req.body);
    try {
    await Reserva.updateOne({_id: req.body._id}, vReserva);
    res.json({
    'status': '1',
    'msg': 'Reserva actualizada'
    })
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    })
    }
    }


reservaCtrl.eliminarReserva = async (req,res)=>{
    try{
        await Reserva.deleteOne({_id: req.params.id});
        res.json({ 
            status: '1', 
            msg: 'Reserva eliminada'
        }) 
    }catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        }) 
    } 
}

reservaCtrl.getUnaReserva = async (req, res) => {
    const reserva = await Reserva.findById(req.params.id)
    res.json(reserva);
    }

module.exports = reservaCtrl;