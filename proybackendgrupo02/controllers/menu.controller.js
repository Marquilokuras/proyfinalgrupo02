const Menu = require('../models/menu');

const menuCtrl = {}


menuCtrl.getMenu = async (req, res) => {
    const menus = await Menu.find().populate('bebida');
    res.json(menus);
}

menuCtrl.mostrarBebidasDisponibles = async (req, res) => {
    try {
        const menus = await Menu.find().populate('bebida');

        const bebidasDestacadas = menus.map(Menu => Menu.bebida).filter(bebida => bebida.disponibilidadBebida);

        console.log(bebidasDestacadas);
    } catch (error) {
        console.error('Error al obtener las bebidas destacadas:', error);
    }
};

menuCtrl.crearMenu = async (req,res)=>{
    var menu = new Menu(req.body)
    try{
        await menu.save();
        res.json({
            'status':'1',
            'msg':' Menu guardada'
        })
    }catch (error) {
        res.status(400).json({
            'status': '0', 
            'msg': 'Error procesando operacion.'
        })
    }
}

menuCtrl.editarMenu = async (req,res) =>{
    const menu = new Menu(req.body);
    try{
        await Menu.updateOne({_id: req.body._id },menu);
        res.json({
            'status': '1', 
            'msg': 'Menu Actualizado'
        })
    }catch (error) { 
        res.status(400).json({ 
            'status': '0', 
            'msg': 'Error procesando operacion.'}) 
    } 
}

module.exports = menuCtrl;