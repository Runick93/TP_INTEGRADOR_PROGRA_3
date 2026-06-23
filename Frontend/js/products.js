const PRODUCTOS_POR_PAGINA = 3;
let paginaActual = 1;
let productosActuales = [];

function renderizarPagina() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  const inicio = (paginaActual - 1) * PRODUCTOS_POR_PAGINA;
  const items = productosActuales.slice(inicio, inicio + PRODUCTOS_POR_PAGINA);

  items.forEach(({ id, titulo, descripcion, precio, imagen }) => {
    const productCard = new Pelicula(id, titulo, descripcion, precio, imagen);
    container.appendChild(productCard.createHtmlElement());
  });

  renderizarPaginacion();
}

function renderizarPaginacion() {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = '';

  const totalPaginas = Math.ceil(productosActuales.length / PRODUCTOS_POR_PAGINA);
  if (totalPaginas <= 1) return;

  const crearBoton = (texto, disabled, onClick) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-filter pagination-btn';
    btn.textContent = texto;
    btn.disabled = disabled;
    btn.addEventListener('click', onClick);
    return btn;
  };

  paginationContainer.appendChild(
    crearBoton('« Anterior', paginaActual === 1, () => {
      paginaActual--;
      renderizarPagina();
    })
  );

  const indicador = document.createElement('span');
  indicador.className = 'pagination-indicador';
  indicador.textContent = `Pagina ${paginaActual} de ${totalPaginas}`;
  paginationContainer.appendChild(indicador);

  paginationContainer.appendChild(
    crearBoton('Siguiente »', paginaActual === totalPaginas, () => {
      paginaActual++;
      renderizarPagina();
    })
  );
}

async function cargarProductosPeliculas() {
  try {
    const response = await fetch('/api/cartelera');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const peliculas = await response.json();

    productosActuales = peliculas.map((p) => ({
      id: `pelicula-${p.id}`,
      titulo: p.titulo,
      descripcion: p.descripcion,
      precio: 3000 + Math.floor(Math.random() * 3000),
      imagen: `/images/${p.imagen}`,
    }));
    paginaActual = 1;
    renderizarPagina();
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

async function cargarProductosCombos() {
  try {
    const response = await fetch('/api/combos');
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const combos = await response.json();

    productosActuales = combos.map((c) => ({
      id: `combo-${c.id}`,
      titulo: c.titulo || 'Combo',
      descripcion: c.descripcion || 'Combo especial',
      precio: c.precio,
      imagen: `/images/snacks/${c.imagen}`,
    }));
    paginaActual = 1;
    renderizarPagina();
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






