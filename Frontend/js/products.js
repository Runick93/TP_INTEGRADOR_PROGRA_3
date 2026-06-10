async function cargarProductosPeliculas() {
  try {
    const response = await fetch('/api/cartelera');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const productos = await response.json(); //ex data
    //const productos = data.results || [];
    //console.log(productos)

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    productos.forEach((producto) => {
      const productCard = new Pelicula(producto.id, producto.titulo, `/images/${producto.imagen}`);
      container.appendChild(productCard.createHtmlElement());
      console.log('Peliculas encontradas')
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
    const combos = Array.isArray(data) ? data : (data.results || data.items || []);

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    combos.forEach((c) => {
      const img = c.portrait_path
        ? (c.portrait_path.startsWith('http')
          ? c.portrait_path
          : 'https://thesimpsonsapi.com' + c.portrait_path)
        : 'https://via.placeholder.com/300x200?text=Combo';

      container.innerHTML +=
        '<div class="product-card">' +
          '<img src="' + img + '" alt="' + (c.name || 'Combo') + '">' +
          '<h3>' + (c.name || 'Combo') + '</h3>' +
          '<p>' + (c.occupation || 'Combo especial') + '</p>' +
          '<span class="precio">$' + (3000 + Math.floor(Math.random() * 3000)) + '</span>' +
        '</div>';
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
  h2.appendChild(document.createTextNode(nombreUsuario));
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