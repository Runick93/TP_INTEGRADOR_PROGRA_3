const sequelize = require('./conexion');
const Pelicula = require('./modelos/Pelicula');
const Snack = require('./modelos/Snack');

async function cargarDatos() {
    try {
        // Conectar a la base de datos
        await sequelize.sync();
        console.log('Conectado a SQLite para la carga de datos...');

        // 1. Insertar Películas
        await Pelicula.bulkCreate([
            { titulo: 'Batman', descripcion: 'El caballero de la noche', imagen: 'batman.webp', activo: true },
            { titulo: 'Scarface', descripcion: 'Mafia y drogas', imagen: 'scarface.webp', activo: true },
            { titulo: 'Viernes 13 Parte III', descripcion: 'Terror', imagen: 'viernes_13_3.webp', activo: true },
            { titulo: 'Película Vieja', descripcion: 'Ya no se proyecta', precio: 3000, imagen: 'vieja.jpg', activo: false } // 👈 Probamos el activo: false
        ]);
        console.log('¡Películas insertadas!');

        // 2. Insertar Snacks
        await Snack.bulkCreate([
            { titulo: 'Pochoclos Megacinema', descripcion: 'Bolsa De Pochoclos Grande', precio: 15000, imagen: 'bolsa-pochoclos.webp', activo: true },
            { titulo: 'Gaseosa Grande', descripcion: 'Vaso de 1L a elección', precio: 7000, imagen: 'vaso.webp', activo: true },
            { titulo: 'Combo Balde Megacinema', descripcion: 'Balde de pchoclos + 2 Gaseosas de 1L a elección', precio: 25000, imagen: 'combo_pareja_balde.webp', activo: true }
        ]);
        console.log('¡Snacks insertados con éxito!');

    } catch (error) {
        console.error('Error al insertar los datos:', error);
    } finally {
        // Cerrar la conexión al terminar
        await sequelize.close();
        console.log('Conexión cerrada. Proceso terminado.');
    }
}

// Ejecutar la función
cargarDatos();