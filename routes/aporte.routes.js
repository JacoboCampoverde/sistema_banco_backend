const express = require('express');
const router = express.Router();
const aporteController = require('../controllers/aporte.controller');

router.post('/', aporteController.createAporte);
router.get('/socio/:idSocio', aporteController.getAportesBySocio);
router.get('/', aporteController.getAportes);

module.exports = router;
