const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const VentaPelicula = sequelize.define('VentaPelicula', {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'venta_peliculas',
    timestamps: false
});

module.exports = VentaPelicula;
