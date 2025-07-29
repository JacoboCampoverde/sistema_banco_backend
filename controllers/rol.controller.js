const { Rol } = require('../models');

exports.getRoles = async (req, res) => {
    try {
        const roles = await Rol.findAll();
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener roles.' });
    }
};

exports.createRol = async (req, res) => {
    try {
        const rol = await Rol.create(req.body);
        res.status(201).json(rol);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear rol.', details: err.message });
    }
};
