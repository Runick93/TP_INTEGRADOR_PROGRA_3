const Venta = require('./Venta');
const Pelicula = require('./Pelicula');
const Snack = require('./Snack');
const VentaPelicula = require('./VentaPelicula');
const VentaSnack = require('./VentaSnack');

Venta.belongsToMany(Pelicula, { through: VentaPelicula, foreignKey: 'venta_id' });
Pelicula.belongsToMany(Venta, { through: VentaPelicula, foreignKey: 'pelicula_id' });

Venta.belongsToMany(Snack, { through: VentaSnack, foreignKey: 'venta_id' });
Snack.belongsToMany(Venta, { through: VentaSnack, foreignKey: 'snack_id' });
