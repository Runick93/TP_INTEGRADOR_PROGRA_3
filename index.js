const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path');
const PORT = process.env.PORT;
const rutaCliente = require('./rutas/cliente');
const rutaAdmins = require('./rutas/administradores');
const sequelize = require('./conexion');
const Venta = require('./modelos/Venta');
const Usuario = require('./modelos/Usuario');
require('./modelos/asociaciones');

app.set('view engine', 'ejs');
app.set('views', './vistas');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'Frontend')));

app.use('/api', rutaCliente);
app.use('/admin', rutaAdmins);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'Frontend' ,'index.html'));
});

sequelize.sync().then(() => {
        console.log('Base de datos sincronizada correctamente.');
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    })
    .catch(err => {
        console.error(err);
    });