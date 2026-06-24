const { DataTypes } = require('sequelize');
const sequelize = require('../conexion');

const VentaSnack = sequelize.define('VentaSnack', {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio_unitario: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'venta_snacks',
    timestamps: false
});

module.exports = VentaSnack;
