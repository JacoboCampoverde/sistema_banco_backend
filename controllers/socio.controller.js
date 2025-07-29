const { Socio } = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

exports.getSocios = async (req, res) => {
    try {
        const socios = await Socio.findAll();
        res.json(socios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener socios.' });
    }
};

exports.getSocioById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await sequelize.query(`
        SELECT 
            s.soc_id,
            s.soc_nombres,
            s.soc_cedula,
            s.soc_telefono,
            s.soc_direccion,
            s.soc_fecha_ingreso,
            s.soc_estado,

            -- Aporte inicial: primer aporte registrado
            (
            SELECT a1.apo_monto
            FROM caja_comunal.aportes a1
            WHERE a1.apo_soc_id = s.soc_id
            ORDER BY a1.apo_fecha ASC
            LIMIT 1
            ) AS soc_aporte_inicial,

            -- Acumulado: suma actual de aportes
            SUM(a.apo_monto) AS soc_acumulado_aportes,

            s.soc_acepto_reglamento,
            s.soc_roles,

            -- Antigüedad en meses
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, s.soc_fecha_ingreso)) * 12 +
            EXTRACT(MONTH FROM AGE(CURRENT_DATE, s.soc_fecha_ingreso)) AS soc_tiempo_como_socio,

            -- Métricas adicionales
            COUNT(a.apo_id) AS cantidad_aportes,
            MAX(c.cre_monto_aprobado) AS credito_mas_grande

        FROM caja_comunal.socios s
        LEFT JOIN caja_comunal.aportes a ON s.soc_id = a.apo_soc_id
        LEFT JOIN caja_comunal.creditos c ON s.soc_id = c.cre_soc_id
        WHERE s.soc_id = :id
        GROUP BY s.soc_id
        `, {
            replacements: { id },
            type: QueryTypes.SELECT
        });

        if (!data.length) {
            return res.status(404).json({ error: 'Socio no encontrado.' });
        }

        res.json(data[0]);
    } catch (err) {
        console.error('❌ Error en getSocioById', err);
        res.status(500).json({ error: 'Error al buscar socio.', details: err.message });
    }
};


exports.createSocio = async (req, res) => {
    try {
        const socio = await Socio.create(req.body);
        res.status(201).json(socio);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear socio.', details: err.message });
    }
};

exports.updateSocio = async (req, res) => {
    try {
        const socio = await Socio.findByPk(req.params.id);
        if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });

        await socio.update(req.body);
        res.json(socio);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar socio.', details: err.message });
    }
};

exports.deleteSocio = async (req, res) => {
    try {
        const socio = await Socio.findByPk(req.params.id);
        if (!socio) return res.status(404).json({ error: 'Socio no encontrado.' });

        await socio.destroy();
        res.json({ message: 'Socio eliminado.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar socio.' });
    }
};

exports.getSocioByCedula = async (req, res) => {
    try {
        const { cedula } = req.params;

        const data = await sequelize.query(`
      SELECT 
          s.soc_id,
          s.soc_nombres,
          s.soc_cedula,
          s.soc_telefono,
          s.soc_direccion,
          s.soc_fecha_ingreso,
          s.soc_estado,

          -- Aporte inicial: primer aporte registrado
          (
          SELECT a1.apo_monto
          FROM caja_comunal.aportes a1
          WHERE a1.apo_soc_id = s.soc_id
          ORDER BY a1.apo_fecha ASC
          LIMIT 1
          ) AS soc_aporte_inicial,

          -- Acumulado: suma actual de aportes
          SUM(a.apo_monto) AS soc_acumulado_aportes,

          s.soc_acepto_reglamento,
          s.soc_roles,

          -- Antigüedad en meses
          EXTRACT(YEAR FROM AGE(CURRENT_DATE, s.soc_fecha_ingreso)) * 12 +
          EXTRACT(MONTH FROM AGE(CURRENT_DATE, s.soc_fecha_ingreso)) AS soc_tiempo_como_socio,

          -- Métricas adicionales
          COUNT(a.apo_id) AS cantidad_aportes,
          MAX(c.cre_monto_aprobado) AS credito_mas_grande

      FROM caja_comunal.socios s
      LEFT JOIN caja_comunal.aportes a ON s.soc_id = a.apo_soc_id
      LEFT JOIN caja_comunal.creditos c ON s.soc_id = c.cre_soc_id
      WHERE s.soc_cedula = :cedula
      GROUP BY s.soc_id
    `, {
            replacements: { cedula },
            type: QueryTypes.SELECT
        });

        if (!data.length) {
            return res.status(404).json({ error: 'Socio no encontrado con esa cédula.' });
        }

        res.json(data[0]);
    } catch (err) {
        console.error('❌ Error en getSocioByCedula', err);
        res.status(500).json({ error: 'Error al buscar socio por cédula.', details: err.message });
    }
};

