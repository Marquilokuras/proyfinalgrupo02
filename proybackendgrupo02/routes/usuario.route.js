//defino controlador para el manejo de CRUD
const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');
//creamos el manejador de rutas
const express = require('express');
const router = express.Router();

//ABM Usuario
router.post('/',usuarioCtrl.createUsuario); //Dar de alta un Usuario
router.get('/',autCtrl.verifyToken,usuarioCtrl.getUsuario); //Obtener todas los Usuario
router.delete('/:id',autCtrl.verifyToken,usuarioCtrl.deleteUsuario); //Eliminar un Usuario
router.put('/:id',autCtrl.verifyToken,usuarioCtrl.editUsuario); //Modificar un Usuario
router.get('/recuperarContrasena',usuarioCtrl.recuperarContrasena);

//Login
router.post('/login', usuarioCtrl.loginUsuario); 

//exportamos el modulo de rutas
module.exports = router;