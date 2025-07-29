const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Multa = sequelize.define('Multa', {
        mul_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mul_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mul_motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        mul_monto: {
            type: DataTypes.DECIMAL(10, 2),
        },
        mul_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        mul_estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'Pendiente',
        },
    }, {
        tableName: 'multas',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Multa;
};
