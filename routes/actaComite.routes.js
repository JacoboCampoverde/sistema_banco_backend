const express = require('express');
const router = express.Router();
const actaController = require('../controllers/actaComite.controller');

router.post('/', actaController.createActa);
router.get('/', actaController.getActas);

module.exports = router;
