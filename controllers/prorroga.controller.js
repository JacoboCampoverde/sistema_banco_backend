const { Prorroga } = require('../models');

exports.createProrroga = async (req, res) => {
    try {
        const prorroga = await Prorroga.create(req.body);
        res.status(201).json(prorroga);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar la prórroga.', details: err.message });
    }
};

exports.getProrrogas = async (req, res) => {
    try {
        const prorrogas = await Prorroga.findAll();
        res.status(200).json(prorrogas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las prórrogas.', details: err.message });
    }
};

exports.getProrrogaById = async (req, res) => {
    try {
        const { id } = req.params;
        const prorroga = await Prorroga.findByPk(id);
        if (!prorroga) {
            return res.status(404).json({ error: 'Prórroga no encontrada.' });
        }
        res.status(200).json(prorroga);
    } catch (err) {
        res.status(500).json({ error: 'Error al buscar la prórroga.', details: err.message });
    }
};

exports.updateEstadoProrroga = async (req, res) => {
    try {
        const { id } = req.params;
        const { pro_estado, pro_fecha_aprobacion, pro_dias_concedidos } = req.body;

        const prorroga = await Prorroga.findByPk(id);
        if (!prorroga) {
            return res.status(404).json({ error: 'Prórroga no encontrada.' });
        }

        prorroga.pro_estado = pro_estado;
        prorroga.pro_fecha_aprobacion = pro_fecha_aprobacion;
        prorroga.pro_dias_concedidos = pro_dias_concedidos;
        await prorroga.save();

        res.status(200).json(prorroga);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el estado de la prórroga.', details: err.message });
    }
};

exports.deleteProrroga = async (req, res) => {
    try {
        const { id } = req.params;
        const prorroga = await Prorroga.findByPk(id);
        if (!prorroga) {
            return res.status(404).json({ error: 'Prórroga no encontrada.' });
        }

        await prorroga.destroy();
        res.status(200).json({ message: 'Prórroga eliminada correctamente.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la prórroga.', details: err.message });
    }
};
