const bebida = require('../models/bebida')
const Promocion = require('../models/promocion')

const promocionCtrl = {}

promocionCtrl.getPromociones = async (req, res)=>{
    const promociones = await Promocion.find().populate('bebidas')//como parametro del populate va el nombre del campo como esta definido en el modelo promocion
    res.json(promociones)
}


promocionCtrl.crearPromocion = async (req, res) =>{
    var promocion = new Promocion(req.body)
    try{
        await promocion.save();
        res.json({
            'status': '1',
            'msg': ' Promocion guardada'
        })
    }catch(error) {
        res.status(400).json({
            'status': '0',
            'msg': 'error de procesamiento'
        })
    }
}

promocionCtrl.editarPromocion = async (req, res) =>{
    const promocion = new Promocion(req.body);
    try{
        await Promocion.updateOne({_id: req.body._id},promocion)
        res.json({
            'status': '1',
            'msg': 'Promocion Actualizada'
        })
    }  catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }  
}

promocionCtrl.eliminarPromocion = async (req,res)=> {
    try{
        await Promocion.deleteOne({_id: req.params.id})
        res.json({
            status: '1',
            msg: 'Promocion Eliminada'
        })
    }catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

promocionCtrl.getPromocion = async (req,res) =>{
    const promocion = await Promocion.findById(req.params.id).populate('bebidas');
    res.json(promocion)
}


promocionCtrl.promocionesDiponibles = async (req,res)=>{
    try{
        const promociones = await Promocion.find({disponibilidadPromocion : true})
        res.json(promociones)
    }catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': error
        })
    }
};

promocionCtrl.agregarBebida = async (req,res)=>{
    const idbebida = req.params.idbebida; 
    const idPromocion = req.params.idpromocion;
    try{
        var promocion = await Promocion.findById(idPromocion);
        promocion.bebidas.push(idbebida);
        await promocion.save();
        res.json({
            'status': '1',
            'msg': ' bebida guardad'
        })
    }catch(error) {
        res.status(400).json({
            'status': '0',
            'msg': 'error de procesamiento'
        })
    }
    
}

promocionCtrl.eliminarBebida = async (req,res)=>{
    const idbebida = req.params.idbebida; 
    const idPromocion = req.params.idpromocion;
    try{
        var promocion = await Promocion.findById(idPromocion);
        promocion.bebidas.pop(idbebida);
        await promocion.save();
        res.json({
            'status': '1',
            'msg': ' bebida eliminada'
        })
    }catch(error) {
        res.status(400).json({
            'status': '0',
            'msg': 'error de procesamiento'
        })
    }
}

module.exports = promocionCtrl;