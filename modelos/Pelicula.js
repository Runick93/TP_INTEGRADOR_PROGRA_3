const {DataTypes} = require('sequelize');
const sequelize = require('../conexion');

const Pelicula = sequelize.define('Pelicula', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    titulo: {type: DataTypes.STRING, allowNull: false},
    imagen: {type: DataTypes.STRING},
    activo: { type: DataTypes.BOOLEAN, defaultValue:true}
}, {
    tableName: 'peliculas',
    timestamps: false
});

module.exports = Pelicula;