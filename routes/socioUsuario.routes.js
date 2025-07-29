const express = require('express');
const router = express.Router();
const controller = require('../controllers/socioUsuario.controller');

router.post('/crear', controller.createSocioConUsuario);

module.exports = router;
