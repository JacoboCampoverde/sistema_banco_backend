const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ActaComite = sequelize.define('ActaComite', {
        act_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        act_fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        act_contenido: {
            type: DataTypes.TEXT,
        },
        act_cre_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        tableName: 'actas_comite',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return ActaComite;
};
