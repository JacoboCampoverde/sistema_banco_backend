const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,     
    process.env.DB_USER,     
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
                dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            //schema: process.env.DB_SCHEMA,
            freezeTableName: true,
        },
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
    }
};

module.exports = { sequelize, testConnection };
