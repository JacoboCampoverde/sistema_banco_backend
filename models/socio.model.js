const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Socio = sequelize.define('Socio', {
        soc_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        soc_nombres: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        soc_cedula: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        soc_telefono: {
            type: DataTypes.STRING(20),
        },
        soc_direccion: {
            type: DataTypes.TEXT,
        },
        soc_fecha_ingreso: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        soc_estado: {
            type: DataTypes.ENUM('Activo', 'Suspendido', 'Expulsado'),
            defaultValue: 'Activo',
        },
        soc_aporte_inicial: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        soc_acumulado_aportes: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0,
        },
        soc_acepto_reglamento: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        soc_tiempo_como_socio: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        soc_roles: {
            type: DataTypes.JSONB,
        },
    }, {
        tableName: 'socios',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Socio;
};
