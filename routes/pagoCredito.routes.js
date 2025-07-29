const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoCredito.controller');
const { verifyToken } = require('../middleware/auth.middleware'); // asegúrate de importar esto

router.post('/', pagoController.createPago);
router.get('/credito/:idCredito', pagoController.getPagosByCredito);
router.get('/',  pagoController.getPagos);

module.exports = router;