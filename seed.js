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
            { titulo: 'Tiburon 4', descripcion: 'Durante su estadía en las Bermudas, Ellen Brody se da cuenta de que el tiburón que mató a su hijo la está acechando.' , imagen: 'tiburon_4.webp', activo: true },
            { titulo: 'Pesadilla en la calle Elm', descripcion: 'Un grupo de adolescentes sufre unas pesadillas horribles en las que un ser deforme con garras de acero les persigue.', imagen: 'a_nightmare_on_elm_street.webp', activo: true },
            { titulo: 'Top Gun', descripcion: 'El joven piloto Maverick Mitchell acude a una prestigiosa escuela aérea, famosa por formar a los mejores pilotos de combate del país.', imagen: 'top_gun.webp', activo: true }
        ]);
        console.log('¡Películas insertadas!');

        // 2. Insertar Snacks
        /*await Snack.bulkCreate([
            { titulo: 'Pochoclos Megacinema', descripcion: 'Bolsa De Pochoclos Grande', precio: 15000, imagen: 'bolsa-pochoclos.webp', activo: true },
            { titulo: 'Gaseosa Grande', descripcion: 'Vaso de 1L a elección', precio: 7000, imagen: 'vaso.webp', activo: true },
            { titulo: 'Combo Balde Megacinema', descripcion: 'Balde de pchoclos + 2 Gaseosas de 1L a elección', precio: 25000, imagen: 'combo_pareja_balde.webp', activo: true }
        ]);
        console.log('¡Snacks insertados con éxito!');*/

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