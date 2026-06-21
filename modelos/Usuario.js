const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Usuario = sequelize.define('Usuario', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    correo: {type: DataTypes.STRING, allowNull: false, unique: true},
    contraseña: {type: DataTypes.STRING, allowNull: false}
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;