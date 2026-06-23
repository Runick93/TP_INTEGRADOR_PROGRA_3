const sequelize = require('./conexion');
const Pelicula = require('./modelos/Pelicula');
const Snack = require('./modelos/Snack');

async function cargarDatos() {
    try {
        await sequelize.sync();
        console.log('Conectado a SQLite para la carga de datos...');

        await Pelicula.update(
            { titulo: 'Blade Runner', descripcion: 'En un futuro sombrio y lluvioso, un ex policia vuelve al servicio para buscar y destruir a un grupo de androides que fingen ser humanos para, integrados en la sociedad, encontrar a su creador y matarlo.' , imagen: 'blade_runner.webp', activo: true },
            {where : {id : 4}}
        );
        console.log('Peliculas insertadas!');

    } catch(error) {
        console.error('Error al insertar los datos:', error);
    } finally {
        await sequelize.close();
        console.log('Conexion cerrada. Proceso terminado.');
    }
};

cargarDatos();