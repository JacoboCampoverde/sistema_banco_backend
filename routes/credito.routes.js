const express = require('express');
const router = express.Router();
const creditoController = require('../controllers/credito.controller');

router.post('/', creditoController.createCredito);
router.get('/aprobados', creditoController.getCreditosAprobados);
router.get('/cedula/:cedula', creditoController.getCreditosPorCedula);
router.get('/socio/:idSocio', creditoController.getCreditosBySocio);
router.get('/cedula/:cedula', creditoController.getCreditosPorCedula);
router.patch('/:id', creditoController.updateCredito);
router.get('/', creditoController.getCreditos);
router.get('/:id', creditoController.getCreditoById);

module.exports = router;
