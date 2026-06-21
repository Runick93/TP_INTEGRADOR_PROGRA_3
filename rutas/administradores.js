const express = require('express');
const router = express.Router();
const db = require('../conexion');
const Pelicula = require('../modelos/Pelicula');
const Snack = require('../modelos/Snack');
const Venta = require('../modelos/Venta');
const Usuario = require('../modelos/Usuario');
const ejs = require('ejs');
const path = require('path');
const { where } = require('sequelize');
const bcrypt = require('bcrypt');


router.get('/dashboard', async (req, res) => {
    try {
        const { producto, estado } = req.query;
        whereEstado = {};
        if (estado === 'activos') {
            whereEstado.activo = 1;
        } else if (estado === 'inactivos') {
            whereEstado.activo = 0;
        }
        let peliculas = [];
        let snacks = [];

        if(!producto || producto === 'todos'){
            peliculas = await Pelicula.findAll({
                where: whereEstado,
                raw: true
            });
            snacks = await Snack.findAll({
                where: whereEstado,
                raw: true
            });
            
        }else if(producto === 'peliculas'){
            peliculas = await Pelicula.findAll({ where: whereEstado });
        }else if (producto === 'snacks'){
            snacks = await Snack.findAll({ where: whereEstado });
        }

        res.render('dashboard', {peliculas : peliculas, snacks : snacks, estadoActual : estado || 'todos', productoActual: producto || 'todos'});    
    } catch (error) {
        console.error("Error al intentar traer peliculas", error);
        res.status(500).json({error: "No se pudieron traer las peliculas"});
    }
});

router.post('/:producto/:accion/:id', async (req, res) => {
    try {
        const {producto, accion, id} = req.params;
        const nuevoEstado = (accion === 'activar');

        var Modelo;
        if (producto === 'pelicula') {
            Modelo = Pelicula;
        } else if (producto === 'snack') {
            Modelo = Snack; 
        } else {
            return res.status(400).send("Error en tipo de producto");
        }

        await Modelo.update(
            { activo: nuevoEstado }, 
            { where: { id: id } }
        );

        res.redirect('/admin/dashboard');
    } catch (error) {
console.error(error);
        res.status(500).send("Error al realizar la modificaion");
    }
});

router.post('/login', async (req, res) => {
    try {
        const { correo, clave } = req.body;
        const usuario = await Usuario.findOne({ where: { correo: correo } });

        if (!usuario) {
            return res.status(400).send("Usuario incorrecto.");
        }

        const coincidencia = await bcrypt.compare(clave, usuario.contraseña);

        if (!coincidencia){
            return res.status(400).send('Contraseña incorrecta');
        }else{
            res.redirect('/admin/dashboard');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error en el servidor");
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login');     
    } catch (error) {
        console.log(error);
    }
});

router.get('/productos/nuevo', (req, res) => {
    res.render('formulario', {
        producto: {}, 
        edicion: false,
        tipoProducto: 'pelicula'});
});

router.get('/editar/:tipo/:id', async (req, res) => {
    try {
        const { tipo, id } = req.params;
        var producto;

        if (tipo === 'pelicula') {
            producto = await Pelicula.findByPk(id);
        } else if (tipo === 'snack') {
            producto = await Snack.findByPk(id);
        }

        res.render('formulario', {
            producto: producto,
            edicion: true,
            tipoProducto: tipo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar el producto");
    }
});

module.exports = router;