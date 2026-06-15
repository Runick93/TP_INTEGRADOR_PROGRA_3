async function cargarProductosPeliculas() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    const personajes = data.results || [];

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    personajes.forEach((personaje) => {
      const descripcion = `${personaje.species} - ${personaje.status} - Origen: ${personaje.origin.name}`;
      const precio = 3000 + Math.floor(Math.random() * 3000);

      const productCard = new Pelicula(`pelicula-${personaje.id}`, personaje.name, descripcion, precio, personaje.image);
      container.appendChild(productCard.createHtmlElement());
    });
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

async function cargarProductosCombos() {
  try {
    const response = await fetch('https://thesimpsonsapi.com/api/characters?page=1');
    if (!response.ok) throw new Error('Error: ' + response.status);

    const data = await response.json();
    const combos = data.results || [];

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    combos.forEach((c) => {
      const img = c.portrait_path
        ? 'https://cdn.thesimpsonsapi.com' + c.portrait_path
        : 'https://via.placeholder.com/300x200?text=Combo';

      const descripcion = c.occupation || 'Combo especial';
      const precio = 3000 + Math.floor(Math.random() * 3000);

      const productCard = new Pelicula(`combo-${c.id}`, c.name || 'Combo', descripcion, precio, img);
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