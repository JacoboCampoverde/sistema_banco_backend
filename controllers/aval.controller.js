const { Aval } = require('../models');

exports.createAval = async (req, res) => {
    try {
        const aval = await Aval.create(req.body);
        res.status(201).json(aval);
    } catch (err) {
        res.status(400).json({ error: 'Error al registrar aval.', details: err.message });
    }
};
