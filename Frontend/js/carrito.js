function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function calcularTotal(carrito) {
    return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('carrito-container');
    const footer = document.getElementById('carrito-footer');
    const totalSpan = document.getElementById('carrito-total');

    container.innerHTML = '';

    if (carrito.length === 0) {
        container.innerHTML = '<p class="carrito-vacio">Tu carrito esta vacio.</p>';
        footer.style.display = 'none';
        return;
    }

    footer.style.display = 'flex';
    totalSpan.textContent = `$${calcularTotal(carrito)}`;

    carrito.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';

        const img = document.createElement('img');
        img.src = item.imagen;
        img.alt = item.titulo;

        const info = document.createElement('div');
        info.className = 'carrito-item-info';

        const titulo = document.createElement('h3');
        titulo.textContent = item.titulo;

        const precio = document.createElement('span');
        precio.className = 'precio';
        precio.textContent = `$${item.precio} c/u`;

        const subtotal = document.createElement('span');
        subtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;

        info.appendChild(titulo);
        info.appendChild(precio);
        info.appendChild(subtotal);

        const acciones = document.createElement('div');
        acciones.className = 'carrito-item-acciones';

        const cantidadContainer = document.createElement('div');
        cantidadContainer.className = 'cantidad-container';

        const btnMenos = document.createElement('button');
        btnMenos.className = 'btn-cantidad';
        btnMenos.type = 'button';
        btnMenos.textContent = '-';

        const cantidadSpan = document.createElement('span');
        cantidadSpan.className = 'cantidad-valor';
        cantidadSpan.textContent = item.cantidad;

        const btnMas = document.createElement('button');
        btnMas.className = 'btn-cantidad';
        btnMas.type = 'button';
        btnMas.textContent = '+';

        btnMenos.addEventListener('click', () => {
            const carrito = obtenerCarrito();
            const entrada = carrito.find((p) => p.id === item.id);
            if (!entrada) return;

            if (entrada.cantidad > 1) {
                entrada.cantidad--;
                guardarCarrito(carrito);
                renderizarCarrito();
            }
        });

        btnMas.addEventListener('click', () => {
            const carrito = obtenerCarrito();
            const entrada = carrito.find((p) => p.id === item.id);
            if (!entrada) return;

            entrada.cantidad++;
            guardarCarrito(carrito);
            renderizarCarrito();
        });

        cantidadContainer.appendChild(btnMenos);
        cantidadContainer.appendChild(cantidadSpan);
        cantidadContainer.appendChild(btnMas);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'btn-eliminar';
        btnEliminar.type = 'button';
        btnEliminar.textContent = 'Eliminar';

        btnEliminar.addEventListener('click', () => {
            const carrito = obtenerCarrito();
            const nuevo = carrito.filter((p) => p.id !== item.id);
            guardarCarrito(nuevo);
            renderizarCarrito();
        });

        acciones.appendChild(cantidadContainer);
        acciones.appendChild(btnEliminar);

        div.appendChild(img);
        div.appendChild(info);
        div.appendChild(acciones);

        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const contenedorNombre = document.getElementById('contenedor-nombre');
    const nombreUsuario = localStorage.getItem('nombreUsuario');


    if (contenedorNombre && nombreUsuario) {
        const h2 = document.createElement('h2');
        h2.textContent = nombreUsuario;
        contenedorNombre.appendChild(h2);
    }

    renderizarCarrito();


    document.getElementById('btn-vaciar').addEventListener('click', () => {
        if (confirm('Vaciar el carrito?')) {
            localStorage.removeItem('carrito');
            renderizarCarrito();
        }
    });

    const modal = document.getElementById('modal-confirmacion');
    const btnModalCancelar = document.getElementById('btn-modal-cancelar');
    const btnModalAceptar = document.getElementById('btn-modal-aceptar');
    const btnConfirmar = document.getElementById('btn-confirmar');

    if (btnConfirmar && modal) {
        btnConfirmar.addEventListener('click', () => {
            const carrito = obtenerCarrito();
            if (carrito.length === 0) return;
            modal.style.display = 'flex'; 
        });
    }

    if (btnModalCancelar && modal) {
        btnModalCancelar.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (btnModalAceptar) {
        btnModalAceptar.addEventListener('click', () => {
            const carrito = obtenerCarrito();
            const ticket = {
                usuario: nombreUsuario,
                fecha: new Date().toISOString(),
                items: carrito,
                total: calcularTotal(carrito),
            };
            localStorage.setItem('ticket', JSON.stringify(ticket));
            localStorage.removeItem('carrito');
            modal.style.display = 'none';
            window.location.href = 'ticket.html';
        });
    }
});
