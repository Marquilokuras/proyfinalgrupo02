//defino controlador para el manejo de CRUD 

const imagenUsuarioCtrl = require('../controllers/imagenUsuario.controller');

//creamos el manejador de rutas 

const express = require('express');
const router = express.Router();

//definimos las rutas para la gestion de bebida
router.get('/',imagenUsuarioCtrl.getImagenes);
router.post('/',imagenUsuarioCtrl.crearImagen);

//exportamos el modulo de rutas 
module.exports = router;