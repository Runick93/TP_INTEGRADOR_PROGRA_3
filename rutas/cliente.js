const express = require('express');
const router = express.Router();
const db = require('../conexion');

router.get('/cartelera', async (req, res) => {
    try{
        const [cartelera] = await db.query('SELECT * FROM peliculas');
        res.status(200).json(cartelera); 
    }catch(e){
        console.error('Error al cargar la cartelera');
        res.status(500).json({e: "No se pudieron traer las peliculas"});
    }
});

module.exports = router;