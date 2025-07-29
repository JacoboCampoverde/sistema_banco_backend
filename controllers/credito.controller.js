const { Credito } = require('../models');
const { Socio } = require('../models');

exports.createCredito = async (req, res) => {
    try {
        const credito = await Credito.create(req.body);
        res.status(201).json(credito);
    } catch (err) {
        res.status(400).json({ error: 'Error al solicitar crédito.', details: err.message });
    }
};

exports.getCreditosBySocio = async (req, res) => {
    try {
        const { idSocio } = req.params;
        const creditos = await Credito.findAll({ where: { cre_soc_id: idSocio } });
        res.json(creditos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener créditos.' });
    }
};

exports.getCreditos = async (req, res) => {
    try {
        const creditos = await Credito.findAll();
        res.json(creditos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener créditos.' });
    }
};

exports.updateCredito = async (req, res) => {
    try {
        const credito = await Credito.findByPk(req.params.id);
        if (!credito) return res.status(404).json({ error: 'Crédito no encontrado.' });

        // Actualiza cualquier campo enviado en el body, como estado, monto aprobado, fecha aprobación, etc
        await credito.update(req.body);

        res.json({ message: 'Crédito actualizado.', credito });
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar crédito.', details: err.message });
    }
};

exports.getCreditoById = async (req, res) => {
    try {
        const credito = await Credito.findByPk(req.params.id);
        if (!credito) {
            return res.status(404).json({ error: 'Crédito no encontrado.' });
        }
        res.json(credito);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener crédito.', details: err.message });
    }
};

exports.getCreditosAprobados = async (req, res) => {
    try {
        const creditos = await Credito.findAll({
            where: {
                cre_estado: ['Activo', 'Aprobado']
            }

        });
        res.json(creditos);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener créditos aprobados.', details: err.message });
    }
};

// GET /api/creditos/por-cedula/:cedula
exports.getCreditosPorCedula = async (req, res) => {
    const { cedula } = req.params;

    try {
        const creditos = await Credito.findAll({
            where: {
                cre_estado: ['Activo', 'Aprobado']
            },
            include: {
                model: Socio,
                where: { soc_cedula: cedula }
            }
        });

        res.json(creditos);
    } catch (err) {
        res.status(500).json({
            error: 'Error al obtener créditos por cédula.',
            details: err.message
        });
    }
};
