const express = require('express');
const router = express.Router();
const socioController = require('../controllers/socio.controller');

router.get('/', socioController.getSocios);
router.get('/:id', socioController.getSocioById);
router.get('/cedula/:cedula', socioController.getSocioByCedula);
router.post('/', socioController.createSocio);
router.put('/:id', socioController.updateSocio);
router.delete('/:id', socioController.deleteSocio);

module.exports = router;
