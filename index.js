const express = require('express');
const app = express();
require('dotenv').config();
const path = require('node:path');
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'public','pages' ,'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escucuhando en el puerto ${PORT}`);
});

