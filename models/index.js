const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

// Importar modelos individuales
const Rol = require('./rol.model')(sequelize);
const Socio = require('./socio.model')(sequelize);
const Aporte = require('./aporte.model')(sequelize);
const Credito = require('./credito.model')(sequelize);
const Aval = require('./aval.model')(sequelize);
const PagoCredito = require('./pagoCredito.model')(sequelize);
const Multa = require('./multa.model')(sequelize);
const Sancion = require('./sancion.model')(sequelize);
const ActaComite = require('./actaComite.model')(sequelize);
const LogAccion = require('./logAccion.model')(sequelize);
const Usuario = require('./usuario.model')(sequelize);
const Prorroga = require('./prorroga.model')(sequelize);

// Definir relaciones

// Socio tiene muchos Aportes
Socio.hasMany(Aporte, { foreignKey: 'apo_soc_id' });
Aporte.belongsTo(Socio, { foreignKey: 'apo_soc_id' });

// Socio tiene muchos Créditos
Socio.hasMany(Credito, { foreignKey: 'cre_soc_id' });
Credito.belongsTo(Socio, { foreignKey: 'cre_soc_id' });

// Crédito tiene muchos Avales
Credito.hasMany(Aval, { foreignKey: 'ava_cre_id' });
Aval.belongsTo(Credito, { foreignKey: 'ava_cre_id' });

// Crédito tiene muchos Pagos
Credito.hasMany(PagoCredito, { foreignKey: 'pag_cre_id' });
PagoCredito.belongsTo(Credito, { foreignKey: 'pag_cre_id' });

// Socio tiene muchas Multas
Socio.hasMany(Multa, { foreignKey: 'mul_soc_id' });
Multa.belongsTo(Socio, { foreignKey: 'mul_soc_id' });

// Socio tiene muchas Sanciones
Socio.hasMany(Sancion, { foreignKey: 'san_soc_id' });
Sancion.belongsTo(Socio, { foreignKey: 'san_soc_id' });

// Acta puede tener referencia a un Crédito (opcional)
Credito.hasMany(ActaComite, { foreignKey: 'act_cre_id' });
ActaComite.belongsTo(Credito, { foreignKey: 'act_cre_id' });

// Relación Usuario-Socio (1:1)
Socio.hasOne(Usuario, { foreignKey: 'usu_soc_id' });
Usuario.belongsTo(Socio, { foreignKey: 'usu_soc_id' });

// Relación Crédito-Prórroga
Credito.hasMany(Prorroga, { foreignKey: 'pro_cre_id' });
Prorroga.belongsTo(Credito, { foreignKey: 'pro_cre_id' });

// Exportar modelos
module.exports = {
    sequelize,
    Rol,
    Socio,
    Aporte,
    Credito,
    Aval,
    PagoCredito,
    Multa,
    Sancion,
    ActaComite,
    LogAccion,
    Usuario,
    Prorroga 
};
