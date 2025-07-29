const { Aporte } = require('../models');

exports.createAporte = async (req, res) => {
    try {
        const aporte = await Aporte.create(req.body);
        res.status(201).json(aporte);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar aporte.', details: err.message });
    }
};

exports.getAportes = async (req, res) => {
    try {
        const aportes = await Aporte.findAll();
        res.json(aportes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener aportes.', details: err.message });
    }
};

exports.getAportesBySocio = async (req, res) => {
    try {
        const { idSocio } = req.params;
        const aportes = await Aporte.findAll({ where: { apo_soc_id: idSocio } });
        res.json(aportes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener aportes por socio.', details: err.message });
    }
};
