const { Multa } = require('../models');

exports.createMulta = async (req, res) => {
    try {
        const multa = await Multa.create(req.body);
        res.status(201).json(multa);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar multa.', details: err.message });
    }
};

exports.getMultasBySocio = async (req, res) => {
    try {
        const { idSocio } = req.params;
        const multas = await Multa.findAll({ where: { mul_soc_id: idSocio } });
        res.json(multas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener multas.' });
    }
};

exports.updateEstadoMulta = async (req, res) => {
    try {
        const { idMulta } = req.params;
        const { estado } = req.body;

        const multa = await Multa.findByPk(idMulta);

        if (!multa) {
            return res.status(404).json({ error: 'Multa no encontrada.' });
        }

        multa.mul_estado = estado;
        await multa.save();

        res.json({ message: 'Estado de la multa actualizado correctamente.', multa });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el estado.', details: err.message });
    }
};
