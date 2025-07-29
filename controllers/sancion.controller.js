const { Sancion } = require('../models');

exports.createSancion = async (req, res) => {
    try {
        const sancion = await Sancion.create(req.body);
        res.status(201).json(sancion);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar sanción.', details: err.message });
    }
};

exports.getSancionesBySocio = async (req, res) => {
    try {
        const { idSocio } = req.params;
        const sanciones = await Sancion.findAll({ where: { san_soc_id: idSocio } });
        res.json(sanciones);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener sanciones.' });
    }
};
