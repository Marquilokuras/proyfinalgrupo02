//defino controlador para el manejo de CRUD 

const bebidaCtrl = require('./../controllers/bebida.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida

router.get('/', bebidaCtrl.getBebidas); // http://localhost:3000/api/producto/


router.post('/', bebidaCtrl.crearBebida); // http://localhost:3000/api/agente/


router.get('/:id', bebidaCtrl.getBebida);  // http://localhost:3000/api/agente/
router.put('/:id', bebidaCtrl.editarBebida);
router.delete('/:id', bebidaCtrl.eliminarBebida);
//router.get('/:destacado',productoCtrl.getProductosDestacados);

//exportamos el modulo de rutas 

module.exports = router;