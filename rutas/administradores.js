const express = require('express');
const router = express.Router();
const db = require('../conexion');
const Pelicula = require('../modelos/Pelicula');
const Snack = require('../modelos/Snack');
const Venta = require('../modelos/Venta');
const ejs = require('ejs');
const path = require('path');
const { where } = require('sequelize');


router.get('/peliculas', async (req, res) => {
    try {
        const { estado } = req.query;
        whereEstado = {};
        if (estado === 'activos') {
            whereEstado.activo = 1;
        } else if (estado === 'inactivos') {
            whereEstado.activo = 0;
        }
        
        const peliculas = await Pelicula.findAll({
            where: whereEstado,
            order: [[titulo, 'ASC']]
        });
        res.status(200).json(peliculas);    
    } catch (error) {
        console.error("Error al intentar traer peliculas", error);
        res.status(500).json({error: "No se pudieron traer las peliculas"});
    }
});

router.get('/combos', async (req, res) => {
    try {

        const { estado } = req.query;
        whereEstado = {};
        if (estado === 'activos') {
            whereEstado.activo = 1;
        } else if (estado === 'inactivos') {
            whereEstado.activo = 0;
        }

        const combos = await Snack.findAll({
            where: whereEstado,
            order: [[titulo, 'ASC']]
        });
        res.status(200).json(combos);    
    } catch (error) {
        console.error("Error al intentar traer los snacks", error);
        res.status(500).json({ error: "No se pudieron traer los snacks y combos" });
    }
});

router.get('/ventas', async (req, res) => {
    try {

        const ventas = await Snack.findAll({
        });
        res.status(200).json(ventas);    
    } catch (error) {
        console.error("Error al intentar traer los snacks", error);
        res.status(500).json({ error: "No se pudieron traer los snacks y combos" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo } });

        if (!usuario) {
            return res.status(401).send("Usuario o contraseña incorrectos (Mail no existe)");
        }
        if (usuario.contraseña !== password) {
            return res.status(401).send("Usuario o contraseña incorrectos (Clave mal)");
        }
        res.redirect('/vistas/dashboard');

    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get('/login', (req, res) => {
    res.render('admin/login'); 
});