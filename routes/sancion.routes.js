const express = require('express');
const router = express.Router();
const sancionController = require('../controllers/sancion.controller');

router.post('/', sancionController.createSancion);
router.get('/socio/:idSocio', sancionController.getSancionesBySocio);

module.exports = router;
