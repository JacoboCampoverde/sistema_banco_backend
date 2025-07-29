const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Rol = sequelize.define('Rol', {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rol_nombre: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
        },
        rol_descripcion: {
            type: DataTypes.TEXT,
        },
    }, {
        tableName: 'roles',
        schema: 'caja_comunal',
        timestamps: false,
    });

    return Rol;
};
