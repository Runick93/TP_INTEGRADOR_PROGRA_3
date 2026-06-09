const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DB_USUARIO, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;