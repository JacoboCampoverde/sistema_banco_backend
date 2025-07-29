const express = require('express');
const router = express.Router();
const multaController = require('../controllers/multa.controller');

router.post('/', multaController.createMulta);
router.get('/socio/:idSocio', multaController.getMultasBySocio);
router.patch('/:idMulta/estado', multaController.updateEstadoMulta);

module.exports = router;
