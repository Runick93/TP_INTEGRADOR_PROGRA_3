const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path');
const PORT = process.env.PORT;
const rutaCliente = require('./rutas/cliente');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'Frontend')));

app.use('/api', rutaCliente);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'Frontend' ,'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escucuhando en el puerto ${PORT}`);
});
