const { Socio, Usuario } = require('../models');
const bcrypt = require('bcrypt');

exports.createSocioConUsuario = async (req, res) => {
    const t = await Socio.sequelize.transaction();

    try {
        const { socioData, usuarioData } = req.body;

        // Crear Socio
        const nuevoSocio = await Socio.create({
            soc_nombres: socioData.nombres,
            soc_cedula: socioData.cedula,
            soc_telefono: socioData.telefono,
            soc_direccion: socioData.direccion,
            soc_fecha_ingreso: new Date(),
            soc_estado: 'Activo',
            soc_roles: socioData.roles || ['socio'],
            soc_acepto_reglamento: socioData.acepto_reglamento || true,
        }, { transaction: t });

        // Crear Usuario vinculado al Socio
        const hash = await bcrypt.hash(usuarioData.password, 10);

        const nuevoUsuario = await Usuario.create({
            usu_soc_id: nuevoSocio.soc_id,
            usu_email: usuarioData.email,
            usu_password: hash,
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            message: 'Socio y usuario creados correctamente',
            socio: nuevoSocio,
            usuario: { usu_email: nuevoUsuario.usu_email }
        });

    } catch (err) {
        await t.rollback();
        console.error(err); // <-- Muestra el error completo en consola
        res.status(500).json({
            error: 'Error al crear socio y usuario.',
            details: err.message,
            full: err
        });
    }

};
