const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Prorroga = sequelize.define('Prorroga', {
        pro_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pro_cre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pro_fecha_solicitud: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        pro_motivo: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        pro_documento_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pro_estado: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'Pendiente', // 'Pendiente', 'Aprobada', 'Rechazada'
        },
        pro_fecha_aprobacion: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        pro_dias_concedidos: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        tableName: 'prorrogas',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Prorroga;
};
