const { ActaComite } = require('../models');

exports.createActa = async (req, res) => {
    try {
        const acta = await ActaComite.create(req.body);
        res.status(201).json(acta);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar acta.', details: err.message });
    }
};

exports.getActas = async (req, res) => {
    try {
        const actas = await ActaComite.findAll();
        res.json(actas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener actas.' });
    }
};
