const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/roles', require('./routes/rol.routes'));
app.use('/api/socios', require('./routes/socio.routes'));
app.use('/api/aportes', require('./routes/aporte.routes'));
app.use('/api/creditos', require('./routes/credito.routes'));
app.use('/api/avales', require('./routes/aval.routes'));
app.use('/api/pagos', require('./routes/pagoCredito.routes'));
app.use('/api/multas', require('./routes/multa.routes'));
app.use('/api/sanciones', require('./routes/sancion.routes'));
app.use('/api/actas', require('./routes/actaComite.routes'));
app.use('/api/logs', require('./routes/log.routes'));
app.use('/api/auth', require('./routes/usuario.routes'));
app.use('/api/socio-usuario', require('./routes/socioUsuario.routes'));
app.use('/api/reportes', require('./routes/reporte.routes'));
app.use('/api/prorrogas', require('./routes/prorroga.routes'));

app.get('/', (req, res) => {
    res.send('API Caja Comunal Balsalito funcionando');
});

module.exports = app;
