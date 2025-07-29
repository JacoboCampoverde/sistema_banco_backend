const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        usu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        usu_soc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // 1 socio = 1 usuario
        },
        usu_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        usu_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'usuarios',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Usuario;
};
