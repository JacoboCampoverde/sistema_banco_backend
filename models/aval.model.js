const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Aval = sequelize.define('Aval', {
        ava_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        ava_cre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ava_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'avales',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Aval;
};
