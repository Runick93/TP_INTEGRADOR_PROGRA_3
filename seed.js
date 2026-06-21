const sequelize = require('./conexion');
const Pelicula = require('./modelos/Pelicula');
const Snack = require('./modelos/Snack');

async function cargarDatos() {
    try {
        await sequelize.sync();
        console.log('Conectado a SQLite para la carga de datos...');

        await Pelicula.bulkCreate([
            { titulo: 'Tiburon 4', descripcion: 'Durante su estadía en las Bermudas, Ellen Brody se da cuenta de que el tiburón que mató a su hijo la está acechando.' , imagen: 'tiburon_4.webp', activo: true },
            { titulo: 'Pesadilla en la calle Elm', descripcion: 'Un grupo de adolescentes sufre unas pesadillas horribles en las que un ser deforme con garras de acero les persigue.', imagen: 'a_nightmare_on_elm_street.webp', activo: true },
            { titulo: 'Top Gun', descripcion: 'El joven piloto Maverick Mitchell acude a una prestigiosa escuela aérea, famosa por formar a los mejores pilotos de combate del país.', imagen: 'top_gun.webp', activo: true }
        ]);
        console.log('¡Películas insertadas!');

    } catch (error) {
        console.error('Error al insertar los datos:', error);
    } finally {
        await sequelize.close();
        console.log('Conexión cerrada. Proceso terminado.');
    }
}

cargarDatos();