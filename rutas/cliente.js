const express = require('express');
const router = express.Router();
const db = require('../conexion');
const Pelicula = require('../modelos/Pelicula');

router.get('/cartelera', async (req, res) => {
    try {
        const cartelera = await Pelicula.findAll({
            where:{activo: true}
        });
        res.status(200).json(cartelera);    
    } catch (error) {
        console.error("Error al intentar traer peliculas", error);
        res.status(500).json({error: "No se pudieron traer las peliculas"});
    }
});

module.exports = router;