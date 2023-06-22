const menuCtrl = require('./../controllers/menu.controller');

const express = require('express');
const router = express.Router();

router.get('/', menuCtrl.getMenu); //Obtener todas las bebidas del menu
router.get('/bebidas', menuCtrl.mostrarBebidasDisponibles); 
router.post('/', menuCtrl.crearMenu);
router.put('/edit',menuCtrl.editarMenu)

module.exports = router;