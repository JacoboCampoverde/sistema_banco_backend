const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'secreto_super_seguro';

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'Token no proporcionado.' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.user = decoded; // Carga usu_id, soc_id y roles en req.user
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido o expirado.' });
    }
};
