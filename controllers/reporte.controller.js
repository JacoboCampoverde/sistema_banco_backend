const { Aporte, Credito, PagoCredito, Multa, Socio, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

// Reporte de aportes por socio
exports.reporteAportes = async (req, res) => {
    try {
        const { idSocio } = req.params;

        const aportes = await Aporte.findAll({
            where: { apo_soc_id: idSocio },
            order: [['apo_fecha', 'DESC']]
        });

        const total = await Aporte.sum('apo_monto', { where: { apo_soc_id: idSocio } });

        res.json({ total, aportes });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener aportes.', details: err.message });
    }
};

// Reporte de créditos y saldo pendiente por socio
exports.reporteCreditos = async (req, res) => {
    try {
        const { idSocio } = req.params;

        const data = await sequelize.query(`
      SELECT 
          c.cre_id,
          c.cre_monto_aprobado,
          c.cre_plazo_meses,
          c.cre_estado,
          c.cre_fecha_aprobacion,
          COALESCE(SUM(p.pag_monto), 0) AS total_pagado,
          c.cre_monto_aprobado - COALESCE(SUM(p.pag_monto), 0) AS saldo_pendiente
      FROM 
          caja_comunal.creditos c
      LEFT JOIN 
          caja_comunal.pagos_credito p ON c.cre_id = p.pag_cre_id
      WHERE 
          c.cre_soc_id = :idSocio
      GROUP BY 
          c.cre_id
    `, {
            replacements: { idSocio },
            type: QueryTypes.SELECT
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener créditos.', details: err.message });
    }
};

// Reporte de créditos potencialmente morosos
exports.reporteMoras = async (req, res) => {
    try {
        const data = await sequelize.query(`
      SELECT 
          s.soc_id,
          s.soc_nombres,
          s.soc_telefono,
          c.cre_id,
          c.cre_soc_id,
          c.cre_monto_aprobado,
          c.cre_fecha_aprobacion,
          c.cre_tasa_interes,
          c.cre_plazo_meses,
          c.cre_forma_pago,
          c.cre_meses_gracia
      FROM 
          caja_comunal.socios s
      JOIN 
          caja_comunal.creditos c ON s.soc_id = c.cre_soc_id
      WHERE 
          c.cre_estado IN ('Activo', 'Desembolsado', 'En Curso') -- según tu lógica de estado actual
    `, {
            type: QueryTypes.SELECT
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener créditos.', details: err.message });
    }
};

// Reporte de multas por socio
exports.reporteMultas = async (req, res) => {
    try {
        const { idSocio } = req.params;

        const multas = await Multa.findAll({
            where: { mul_soc_id: idSocio },
            order: [['mul_fecha', 'DESC']]
        });

        res.json(multas);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener multas.', details: err.message });
    }
};

// Reporte general de cartera
exports.reporteCartera = async (req, res) => {
    try {
        const data = await sequelize.query(`
      SELECT 
          cre_estado,
          COUNT(*) AS cantidad_creditos,
          SUM(cre_monto_aprobado) AS monto_total
      FROM 
          caja_comunal.creditos
      GROUP BY 
          cre_estado
    `, {
            type: QueryTypes.SELECT
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener cartera.', details: err.message });
    }
};

// Reporte global de multas (opcional: por rango de fechas)
exports.reporteMultasGlobal = async (req, res) => {
    try {
        const data = await sequelize.query(`
      SELECT
          s.soc_id,
          s.soc_nombres,
          m.mul_id,
          m.mul_monto,
          m.mul_fecha,
          m.mul_motivo,
          m.mul_estado
      FROM
          caja_comunal.multas m
      JOIN
          caja_comunal.socios s ON m.mul_soc_id = s.soc_id
      ORDER BY
          m.mul_fecha DESC
    `, { type: QueryTypes.SELECT });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener reporte de multas.', details: err.message });
    }
};

// Reporte de avales en los que participa el socio
exports.reporteAvalesPorSocio = async (req, res) => {
    try {
        const { idSocio } = req.params;

        const data = await sequelize.query(`
      SELECT
          c.cre_id,
          c.cre_monto_aprobado,
          c.cre_fecha_aprobacion,
          c.cre_estado,
          s.soc_nombres AS titular_nombre
      FROM
          caja_comunal.avales a
      JOIN
          caja_comunal.creditos c ON a.aval_cre_id = c.cre_id
      JOIN
          caja_comunal.socios s ON c.cre_soc_id = s.soc_id
      WHERE
          a.aval_soc_id = :idSocio
      ORDER BY
          c.cre_fecha_aprobacion DESC
    `, {
            replacements: { idSocio },
            type: QueryTypes.SELECT
        });

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener avales del socio.', details: err.message });
    }
};

// Reporte de avales en los que participa el socio
exports.reporteAvalesGlobal = async (req, res) => {
    try {
        const data = await sequelize.query(`
      SELECT a.*, c.*, s1.soc_nombres AS titular, s2.soc_nombres AS avalista
      FROM caja_comunal.avales a
      JOIN caja_comunal.creditos c ON a.ava_cre_id = c.cre_id
      JOIN caja_comunal.socios s1 ON c.cre_soc_id = s1.soc_id
      JOIN caja_comunal.socios s2 ON a.ava_soc_id = s2.soc_id
      LIMIT 5
    `, { type: QueryTypes.SELECT });

        res.json(data);
    } catch (err) {
        console.error('❌ Error en reporteAvalesGlobal:', err);
        res.status(500).json({
            error: 'Error interno al obtener avales.',
            details: err.message
        });
    }
};