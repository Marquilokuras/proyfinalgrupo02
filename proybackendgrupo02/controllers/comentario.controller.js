const Comentario = require('../models/comentario');

const comentarioCtrl = {}


comentarioCtrl.getComentarios = async (req, res) =>{
    const comentarios = await Comentario.find()
    res.json(comentarios);
}

comentarioCtrl.createComentario = async (req,res)=>{
    var comentario = new Comentario(req.body);
    try{
        await comentario.save();
        res.json({
            'status':'1',
            'msg':' Comentario guardado'
        })
    }catch (error) {
        res.status(400).json({
            'status': '0', 
            'msg': 'Error procesando operacion.'
        })
    }
}

comentarioCtrl.editComentario = async (req,res) =>{
    const comentario = new Comentario(req.body);
    try{
        await Comentario.updateOne({_id: req.body._id },comentario);
        console.log(comentario);
        res.json({
            'status': '1', 
            'msg': 'Comentario Actualizado'
        })
    }catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando operacion.'}) 
    } 
}

comentarioCtrl.deleteComentario = async (req,res)=>{
    try{
        await Comentario.deleteOne({_id: req.params.id});
        res.json({ 
            status: '1', 
            msg: 'Comentario eliminado'
        }) 
    }catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando la operacion' 
        }) 
    } 
}

comentarioCtrl.getComentario = async (req, res)=>{
    const comentario = await Comentario.findById(req.params.id)
    res.json(comentario);
}

comentarioCtrl.getComment = async (req, res) => {
    let criteria ={}
    if (req.query.puntajeComentario != null && req.query.puntajeComentario!=""){
        criteria.puntajeComentario = req.query.puntajeComentario;
    }
    var comment = await Comentario.find(criteria)
    res.json(comment);
}

module.exports = comentarioCtrl;