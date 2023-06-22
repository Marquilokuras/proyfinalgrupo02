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

module.exports = menuCtrl;