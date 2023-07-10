const imagenUsuarioCtrl = require('../controllers/imagenUsuario.controller');
const express = require('express');
const router = express.Router();

router.get('/',imagenUsuarioCtrl.getImagenes);
router.post('/',imagenUsuarioCtrl.crearImagen);

module.exports = router;