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

mesaCtrl.editMesa = async (req, res) => {
    const vMesa = new Mesa(req.body);
    try {
    await Mesa.updateOne({_id: req.body._id}, vMesa);
    res.json({
    'status': '1',
    'msg': 'Mesa actualizada'
    })
    } catch (error) {
    res.status(400).json({
    'status': '0',
    'msg': 'Error procesando la operacion'
    })
    }
    }

// mesaCtrl.reservarMesa = async (req, res) => {
//     try {

//         const { numeroMesa } = req.params;

//         await Mesa.findByIdAndUpdate( { mesaReserva: numeroMesa },req.body, {new: true,});;
//         await mesa.save();
//         res.json({
//             'status': '1',
//             'msg': 'Mesa reservada.'
//         })
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener mesa a reservar' });
//     }
// }

mesaCtrl.eliminarMesa = async (req,res)=>{
    try{
        await Mesa.deleteOne({_id: req.params.id});
        res.json({ 
            status: '1', 
            msg: 'Mesa eliminada'
        }) 
    }catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        }) 
    } 
}

mesaCtrl.getUnaMesa = async (req, res) => {
    const mesa = await Mesa.findById(req.params.id)
    res.json(mesa);
    }

module.exports = mesaCtrl;