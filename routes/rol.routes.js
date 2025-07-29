const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol.controller');

router.get('/', rolController.getRoles);
router.post('/', rolController.createRol);

module.exports = router;
