const express = require('express');
const router = express.Router();
const db = require('../conexion');
const Pelicula = require('../modelos/Pelicula');
const Snack = require('../modelos/Snack');

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

router.get('/combos', async (req, res) => {
    try {
        const combos = await Snack.findAll({
            where: { activo: true }
        });
        res.status(200).json(combos);    
    } catch (error) {
        console.error("Error al intentar traer los snacks", error);
        res.status(500).json({ error: "No se pudieron traer los snacks y combos" });
    }
});

module.exports = router;