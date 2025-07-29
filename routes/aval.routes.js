const express = require('express');
const router = express.Router();
const avalController = require('../controllers/aval.controller');

router.post('/', avalController.createAval);

module.exports = router;
