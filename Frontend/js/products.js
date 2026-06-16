async function cargarProductosPeliculas() {
  try {
    const response = await fetch('/api/cartelera');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const peliculas = await response.json(); // esto cambia el nombre de data a productos porque ahora vienen directamente los objetos en el json
    //const personajes = data.results || []; // esta linea ya no es necesaria porque no existe mas un .results

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    peliculas.forEach((p) => {
      //const descripcion = `${personaje.species} - ${personaje.status} - Origen: ${personaje.origin.name}`; linea ya no necesaria 
      const precio = 3000 + Math.floor(Math.random() * 3000);

      const productCard = new Pelicula(`pelicula-${p.id}`, p.titulo, p.descripcion, precio, `/images/${p.imagen}`); 
      container.appendChild(productCard.createHtmlElement());
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

async function cargarProductosCombos() {
  try {
    const response = await fetch('/api/combos');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const combos = await response.json();
    //const combos = data.results || [];

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    combos.forEach((c) => {
      // const img = c.portrait_path
      //   ? 'https://cdn.thesimpsonsapi.com' + c.portrait_path
      //   : 'https://via.placeholder.com/300x200?text=Combo';  // esto ya no haria falta

      const descripcion = c.descripcion || 'Combo especial';
      //const precio = 3000 + Math.floor(Math.random() * 3000); /// el precio lo tiene la tabla combos

      const productCard = new Pelicula(`combo-${c.id}`, c.titulo || 'Combo', descripcion, c.precio, `/images/${c.imagen}`); //por ahora usamos la clase pelicula
      container.appendChild(productCard.createHtmlElement());
    });
  } catch (error) {
    console.error('Error al cargar combos:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPeliculas = document.getElementById('btn-peliculas');
  const btnCombos = document.getElementById('btn-combos');
  const nombreUsuario = localStorage.getItem('nombreUsuario');
  const contenedorNombre = document.getElementById('contenedor-nombre');
  const h2 = document.createElement("h2");
  
  console.log(nombreUsuario);
  h2.appendChild(document.createTextNode(`¡Hola ${nombreUsuario}!`));
  contenedorNombre.appendChild(h2);


  btnPeliculas.addEventListener('click', () => {
  btnPeliculas.classList.add('active-filter');
  btnCombos.classList.remove('active-filter');
  cargarProductosPeliculas();
  });

  btnCombos.addEventListener('click', () => {
  btnCombos.classList.add('active-filter');
  btnPeliculas.classList.remove('active-filter');
  cargarProductosCombos();
  });

  cargarProductosPeliculas();
});






