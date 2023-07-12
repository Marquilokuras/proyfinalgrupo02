const usuarioCtrl = require('./../controllers/usuario.controller');
const autCtrl = require('./../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/',usuarioCtrl.createUsuario); 
router.get('/'/* ,autCtrl.verifyToken */,usuarioCtrl.getUsuario); 
router.delete('/:id'/* ,autCtrl.verifyToken */,usuarioCtrl.deleteUsuario);
router.put('/:id'/* ,autCtrl.verifyToken */,usuarioCtrl.editUsuario);
router.get('/recuperarContrasena',usuarioCtrl.recuperarContrasena);

router.get('/auth/autenticacion'/* ,autCtrl.verifyToken */,usuarioCtrl.mostrarUsuariosLogeados);
router.post('/login', usuarioCtrl.loginUsuario); 

module.exports = router;