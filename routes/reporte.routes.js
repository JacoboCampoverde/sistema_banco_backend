const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporte.controller');
const { verifyToken } = require('../middleware/auth.middleware'); // Opcional: proteger con JWT

// Aportes por socio
router.get('/aportes/:idSocio', reporteController.reporteAportes);

// Créditos y saldos por socio
router.get('/creditos/:idSocio', reporteController.reporteCreditos);

// Socios en mora
router.get('/moras', reporteController.reporteMoras);

// Reporte global de todas las multas
router.get('/multas/global', reporteController.reporteMultasGlobal);

// Reporte global de avales
router.get('/avales/global', reporteController.reporteAvalesGlobal);

// Reporte de avales por socio
router.get('/avales/:idSocio', reporteController.reporteAvalesPorSocio);

// Multas por socio
router.get('/multas/:idSocio', reporteController.reporteMultas);

// Cartera general
router.get('/cartera', reporteController.reporteCartera);



module.exports = router;
