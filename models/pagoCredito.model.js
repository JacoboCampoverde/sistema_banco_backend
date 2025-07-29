const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PagoCredito = sequelize.define('PagoCredito', {
        pag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pag_cre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pag_monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        pag_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        pag_interes: {
            type: DataTypes.DECIMAL(10, 2),
        },
        pag_abono_capital: {
            type: DataTypes.DECIMAL(10, 2),
        },
    }, {
        tableName: 'pagos_credito',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return PagoCredito;
};
