const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Aporte = sequelize.define('Aporte', {
        apo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        apo_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        apo_monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        apo_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        apo_tipo: {
            type: DataTypes.STRING(50),
            defaultValue: 'Mensual',
        },
    }, {
        tableName: 'aportes',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Aporte;
};
