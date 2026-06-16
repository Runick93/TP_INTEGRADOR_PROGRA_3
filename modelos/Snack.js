const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const Snack = sequelize.define('Snack', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    titulo: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.TEXT, allowNull: true},
    precio: {type: DataTypes.INTEGER, allowNull: false},
    imagen: {type: DataTypes.STRING, allowNull: true},
    activo: { type: DataTypes.BOOLEAN, defaultValue:true}
}, {
    tableName: 'snacks',
    timestamps: false
});

module.exports = Snack;