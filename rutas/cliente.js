const express = require('express');
const router = express.Router();
const db = require('../conexion');
const Pelicula = require('../modelos/Pelicula');
const Snack = require('../modelos/Snack');
const Venta = require('../modelos/Venta');
const puppeteer = require('puppeteer');
require('dotenv').config;
const ejs = require('ejs');
const path = require('path');

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

router.post('/ventas', async (req, res) => {
    try {
        const { nombreUsuario, total, carrito } = req.body;

        if (!nombreUsuario || !total || !carrito || carrito.length === 0) {
            return res.status(400).json({ error: "Datos de la compra incompletos." });
        }

        const nuevaVenta = await Venta.create({
            nombre_usuario: nombreUsuario,
            total: total,
            detalle: JSON.stringify(carrito)
        });

        res.status(200).json({
            mensaje: "Compra guardada con éxito",
            id_orden: nuevaVenta.id,
            fecha: nuevaVenta.fecha
        });

    } catch (error) {
        console.error("Error al procesar la venta:", error);
        res.status(500).json({ error: "Hubo un error en el servidor al procesar el pago." });
    }
});

router.get('/ventas/:id/html-ticket', async (req, res) => {
    try {
        const { id } = req.params;
        const venta = await Venta.findByPk(id);
        
        if (!venta) {
            return res.status(404).send("<h1>Venta no encontrada</h1>");
        }

        const items = JSON.parse(venta.detalle);

        res.render('ticket', {venta : venta, items: items});
    } catch (error) {
        console.error("Error al renderizar el ticket:", error);
        res.status(500).send("Error interno del servidor");
    }
});

router.get('/ventas/:id/pdf', async (req, res) => {
    try {
        const { id } = req.params;
        const PORT = process.env.PORT;

        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto(`http://localhost:${PORT}/api/ventas/${id}/html-ticket`, {
            waitUntil: 'networkidle0' 
        });

        const ticketPdf = await page.pdf({
            width: '80mm',       
            height: '180mm',      
            printBackground: true,
            margin: { top: '3mm', right: '3mm', bottom: '3mm', left: '3mm' }
        });

        await browser.close();

        res.contentType("application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=ticket-megacinema-${id}.pdf`);
        
        res.send(ticketPdf);
    } catch (error) {
        console.error("Error al generar el PDF", error);
        res.status(500).send("No se pudo procesar el PDF");
    }
});

module.exports = router;