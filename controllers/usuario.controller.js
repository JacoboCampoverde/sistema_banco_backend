const { Usuario, Socio } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY || 'secreto_super_seguro'; // ⚠️ Define esto en tu .env

// Registro de un usuario (socio ya existente)
exports.registerUsuario = async (req, res) => {
    try {
        const { usu_soc_id, usu_email, usu_password } = req.body;

        const socio = await Socio.findByPk(usu_soc_id);
        if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });

        const existe = await Usuario.findOne({ where: { usu_email } });
        if (existe) return res.status(400).json({ error: 'Email ya está registrado.' });

        const hash = await bcrypt.hash(usu_password, 10);

        const usuario = await Usuario.create({
            usu_soc_id,
            usu_email,
            usu_password: hash
        });

        res.status(201).json({ message: 'Usuario registrado correctamente', usuario });
    } catch (err) {
        res.status(500).json({ error: 'Error al registrar usuario.', details: err.message });
    }
};

// Login de usuario (autenticación)
exports.login = async (req, res) => {
    try {
        const { usu_email, usu_password } = req.body;

        const usuario = await Usuario.findOne({ where: { usu_email }, include: Socio });
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });

        const valid = await bcrypt.compare(usu_password, usuario.usu_password);
        if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta.' });

        const payload = {
            usu_id: usuario.usu_id,
            soc_id: usuario.usu_soc_id,
            roles: usuario.Socio.soc_roles
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });

        res.json({
            message: 'Login exitoso',
            token,
            role: usuario.Socio.soc_roles.length > 0 ? usuario.Socio.soc_roles[0] : '' // o según como manejes roles
        });
    } catch (err) {
        res.status(500).json({ error: 'Error en login.', details: err.message });
    }
};

// Cambio de contraseña
exports.changePassword = async (req, res) => {
    try {
        const { usu_id } = req.user; // El middleware auth carga esto
        const { currentPassword, newPassword } = req.body;

        const usuario = await Usuario.findByPk(usu_id);
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });

        const valid = await bcrypt.compare(currentPassword, usuario.usu_password);
        if (!valid) return res.status(401).json({ error: 'Contraseña actual incorrecta.' });

        const hash = await bcrypt.hash(newPassword, 10);
        await usuario.update({ usu_password: hash });

        res.json({ message: 'Contraseña actualizada.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al cambiar contraseña.', details: err.message });
    }
};

exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['usu_id', 'usu_soc_id', 'usu_email'], // nunca devolvemos la contraseña
            include: {
                model: Socio,
                attributes: [
                    'soc_nombres',
                    'soc_cedula',
                    'soc_telefono',
                    'soc_direccion',
                    'soc_fecha_ingreso',
                    'soc_estado',
                    'soc_tiempo_como_socio',
                    'soc_roles'
                ]
            }
        });

        res.json({ usuarios });
    } catch (err) {
        res.status(500).json({
            error: 'Error al obtener usuarios combinados.',
            details: err.message
        });
    }
};