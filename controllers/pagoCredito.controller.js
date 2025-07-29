const { PagoCredito } = require('../models');

exports.createPago = async (req, res) => {
  try {
    const pago = await PagoCredito.create(req.body);
    res.status(201).json(pago);
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar pago.', details: err.message });
  }
};

exports.getPagos = async (req, res) => {
    try {
        const aportes = await PagoCredito.findAll();
        res.json(aportes);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener aportes.', details: err.message });
    }
};

exports.getPagosByCredito = async (req, res) => {
  try {
    const { idCredito } = req.params;
    const pagos = await PagoCredito.findAll({ where: { pag_cre_id: idCredito } });
    res.json(pagos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos.' });
  }
};

