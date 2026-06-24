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
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tipo = req.body.tipo || req.params.tipo;
        const carpeta = tipo === 'snack' ? 'images/snacks' : 'images';
        cb(null, path.join(__dirname, '..', 'Frontend', carpeta));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });


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

router.post('/usuarios', async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ error: "Correo y password son obligatorios" });
        }

        const existente = await Usuario.findOne({ where: { correo } });
        if (existente) {
            return res.status(409).json({ error: "Ya existe un usuario con ese correo" });
        }

        const hash = await bcrypt.hash(password, 10);
        const usuario = await Usuario.create({ correo, contraseña: hash });

        res.status(201).json({ id: usuario.id, correo: usuario.correo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

router.get('/productos/nuevo', (req, res) => {
    res.render('formulario', {
        producto: {},
        edicion: false,
        tipoProducto: 'pelicula'});
});

router.post('/productos/nuevo', upload.single('imagen'), async (req, res) => {
    try {
        const { tipo, titulo, descripcion, precio } = req.body;
        const imagen = req.file ? req.file.filename : null;

        if (tipo === 'pelicula') {
            await Pelicula.create({ titulo, descripcion, imagen });
        } else if (tipo === 'snack') {
            await Snack.create({ titulo, descripcion, imagen, precio });
        } else {
            return res.status(400).send("Error en tipo de producto");
        }

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el producto");
    }
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

router.post('/editar/:tipo/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { tipo, id } = req.params;
        const { titulo, descripcion, precio } = req.body;

        var Modelo;
        if (tipo === 'pelicula') {
            Modelo = Pelicula;
        } else if (tipo === 'snack') {
            Modelo = Snack;
        } else {
            return res.status(400).send("Error en tipo de producto");
        }

        const datos = { titulo, descripcion };
        if (req.file) {
            datos.imagen = req.file.filename;
        }
        if (tipo === 'snack') {
            datos.precio = precio;
        }

        await Modelo.update(datos, { where: { id: id } });

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al modificar el producto");
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

module.exports = router;