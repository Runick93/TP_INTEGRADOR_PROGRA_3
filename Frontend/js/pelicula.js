class Pelicula {
    id;
    titulo;
    descripcion;
    precio;
    imagen;
    cantidad;

    constructor(id, titulo, descripcion, precio, imagen){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
        this.cantidad = 0;
    }

    createHtmlElement() {
        const div = document.createElement('div');
        div.className = 'product-card';

        const imagenPeli = document.createElement('img');
        imagenPeli.setAttribute('src', this.imagen);
        imagenPeli.setAttribute('alt', this.titulo);

        const nombrePeli = document.createElement('h3');
        nombrePeli.className = 'product-title';
        nombrePeli.appendChild(document.createTextNode(this.titulo));

        const descripcionPeli = document.createElement('p');
        descripcionPeli.className = 'product-desc';
        descripcionPeli.appendChild(document.createTextNode(this.descripcion));

        const precioPeli = document.createElement('span');
        precioPeli.className = 'precio';
        precioPeli.appendChild(document.createTextNode(`$${this.precio}`));

        const addFlow = document.createElement('div');
        addFlow.className = 'add-flow';

        const cantidadContainer = document.createElement('div');
        cantidadContainer.className = 'cantidad-container';

        const btnMenos = document.createElement('button');
        btnMenos.className = 'btn-cantidad';
        btnMenos.type = 'button';
        btnMenos.textContent = '-';

        const cantidadSpan = document.createElement('span');
        cantidadSpan.className = 'cantidad-valor';
        cantidadSpan.textContent = this.cantidad;

        const btnMas = document.createElement('button');
        btnMas.className = 'btn-cantidad';
        btnMas.type = 'button';
        btnMas.textContent = '+';

        btnMenos.addEventListener('click', () => {
            if (this.cantidad > 0) {
                this.cantidad--;
                cantidadSpan.textContent = this.cantidad;
            }
        });

        btnMas.addEventListener('click', () => {
            this.cantidad++;
            cantidadSpan.textContent = this.cantidad;
        });

        cantidadContainer.appendChild(btnMenos);
        cantidadContainer.appendChild(cantidadSpan);
        cantidadContainer.appendChild(btnMas);

        const btnAgregar = document.createElement('button');
        btnAgregar.className = 'btn-agregar';
        btnAgregar.type = 'button';
        btnAgregar.textContent = 'Agregar al carrito';

        addFlow.appendChild(cantidadContainer);
        addFlow.appendChild(btnAgregar);

        const btnQuitar = document.createElement('button');
        btnQuitar.className = 'btn-quitar';
        btnQuitar.type = 'button';
        btnQuitar.textContent = 'Quitar del carrito';

        const yaEnCarrito = estaEnElCarrito(this.id);
        addFlow.style.display = yaEnCarrito ? 'none' : 'flex';
        btnQuitar.style.display = yaEnCarrito ? 'block' : 'none';

        btnAgregar.addEventListener('click', () => {
            if (this.cantidad === 0) {
                alert('Selecciona una cantidad antes de agregar al carrito');
                return;
            }

            agregarAlCarrito(this);

            this.cantidad = 0;
            cantidadSpan.textContent = this.cantidad;
            addFlow.style.display = 'none';
            btnQuitar.style.display = 'block';
        });

        btnQuitar.addEventListener('click', () => {
            quitarDelCarrito(this.id);
            addFlow.style.display = 'flex';
            btnQuitar.style.display = 'none';
        });

        div.appendChild(imagenPeli);
        div.appendChild(nombrePeli);
        div.appendChild(descripcionPeli);
        div.appendChild(precioPeli);
        div.appendChild(addFlow);
        div.appendChild(btnQuitar);

        return div;
    }

}

function estaEnElCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    return carrito.some((p) => p.id === id);
}

function agregarAlCarrito(item) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const existente = carrito.find((p) => p.id === item.id);

    if (existente) {
        existente.cantidad += item.cantidad;
    } else {
        carrito.push({
            id: item.id,
            titulo: item.titulo,
            precio: item.precio,
            imagen: item.imagen,
            cantidad: item.cantidad,
        });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function quitarDelCarrito(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevo = carrito.filter((p) => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevo));
}
