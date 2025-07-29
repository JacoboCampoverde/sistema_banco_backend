const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const LogAccion = sequelize.define('LogAccion', {
        log_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        log_usuario: {
            type: DataTypes.STRING(100),
        },
        log_accion: {
            type: DataTypes.STRING(50),
        },
        log_tabla: {
            type: DataTypes.STRING(50),
        },
        log_fecha_hora: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        log_descripcion: {
            type: DataTypes.TEXT,
        },
    }, {
        tableName: 'logs_acciones',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return LogAccion;
};
