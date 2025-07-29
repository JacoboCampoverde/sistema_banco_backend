const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Credito = sequelize.define('Credito', {
        cre_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cre_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cre_monto_solicitado: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        cre_monto_aprobado: {
            type: DataTypes.DECIMAL(10, 2),
        },
        cre_plazo_meses: {
            type: DataTypes.INTEGER,
        },
        cre_tasa_interes: {
            type: DataTypes.DECIMAL(5, 2),
        },
        cre_forma_pago: {
            type: DataTypes.STRING(50),
        },
        cre_estado: {
            type: DataTypes.ENUM('Pendiente', 'Activo', 'Cancelado', 'Mora', 'Rechazado'),
            defaultValue: 'Pendiente',
        },
        cre_fecha_solicitud: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        cre_fecha_aprobacion: {
            type: DataTypes.DATEONLY,
        },
        cre_motivo: {
            type: DataTypes.TEXT,
        },
        cre_tipo_garantia: {
            type: DataTypes.STRING(50),
        },
        cre_des_prestamo: {
            type: DataTypes.STRING(50),
        },
        cre_meses_gracia: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 2,
            },
        },
    }, {
        tableName: 'creditos',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Credito;
};
