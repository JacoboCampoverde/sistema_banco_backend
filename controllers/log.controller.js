const { LogAccion } = require('../models');

exports.getLogs = async (req, res) => {
    try {
        const logs = await LogAccion.findAll();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener logs.' });
    }
};

exports.createLog = async (req, res) => {
    try {
        const log = await LogAccion.create(req.body);
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar log.', details: err.message });
    }
};
