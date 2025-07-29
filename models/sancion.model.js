const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Sancion = sequelize.define('Sancion', {
        san_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        san_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        san_tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        san_motivo: {
            type: DataTypes.TEXT,
        },
        san_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        san_estado: {
            type: DataTypes.STRING(20),
            defaultValue: 'Activa',
        },
    }, {
        tableName: 'sanciones',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Sancion;
};
