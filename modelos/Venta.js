const { DataTypes } = require('sequelize');
const sequelize = require('../conexion'); 

const Venta = sequelize.define('Venta', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    detalle: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, {
    tableName: 'ventas',
    timestamps: false
});

module.exports = Venta;