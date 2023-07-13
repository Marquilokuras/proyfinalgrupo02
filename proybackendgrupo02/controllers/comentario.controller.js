const Comentario = require('../models/comentario');
const comentarioCtrl = {}

comentarioCtrl.getComentarios = async (req, res) => {
    const comentarios = await Comentario.find().populate('usuario');
    res.json(comentarios);
}

comentarioCtrl.createComentario = async (req, res) => {
    console.log(req.body);
    var comentario = new Comentario(req.body);
    try {
        const prueba = await comentario.save();
        console.log(prueba);
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

comentarioCtrl.editComentario = async (req, res) => {
    const comentario = new Comentario(req.body);
    
    try {
        await Comentario.updateOne({ _id: req.body._id }, comentario);
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

comentarioCtrl.deleteComentario = async (req, res) => {
    try {
        await Comentario.deleteOne({ _id: req.params.id });
        res.json({})
    } catch (error) {
        res.status(400).json({})
    }
}

comentarioCtrl.getComentario = async (req, res) => {
    const comentario = await Comentario.findById(req.params.id).populate('usuario')
    res.json(comentario);
}

comentarioCtrl.getComment = async (req, res) => {
    let criteria = {}
    if (req.query.puntajeComentario != null && req.query.puntajeComentario != "") {
        criteria.puntajeComentario = req.query.puntajeComentario;
    }
    var comment = await Comentario.find(criteria).populate('usuario')
    res.json(comment);
}

module.exports = comentarioCtrl;