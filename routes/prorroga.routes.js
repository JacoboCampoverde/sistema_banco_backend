const express = require('express');
const router = express.Router();
const prorrogaController = require('../controllers/prorroga.controller');

// Crear una prórroga
router.post('/', prorrogaController.createProrroga);

// Obtener todas las prórrogas
router.get('/', prorrogaController.getProrrogas);

// Obtener una prórroga por ID
router.get('/:id', prorrogaController.getProrrogaById);

// Actualizar estado de prórroga
router.put('/:id', prorrogaController.updateEstadoProrroga);

// Eliminar una prórroga
router.delete('/:id', prorrogaController.deleteProrroga);

module.exports = router;
