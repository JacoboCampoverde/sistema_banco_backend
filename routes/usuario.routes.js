const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', usuarioController.registerUsuario);
router.post('/login', usuarioController.login);
router.post('/change-password', verifyToken, usuarioController.changePassword);
router.get('/usuarios', usuarioController.getUsuarios);
module.exports = router;
