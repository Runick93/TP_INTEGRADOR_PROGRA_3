const btnPdf = document.getElementById('btn-pdf');

function renderizarTicket() {
    const container = document.getElementById('ticket-container');
    const ticket = JSON.parse(localStorage.getItem('ticket'));

    container.innerHTML = '';

    if (!ticket) {
        container.innerHTML = '<p class="carrito-vacio">No hay ningun ticket para mostrar.</p>';
        return;
    }

    const header = document.createElement('div');
    header.className = 'ticket-header';

    const empresa = document.createElement('h3');
    empresa.textContent = 'Megacinema';

    const fecha = document.createElement('span');
    fecha.textContent = `Fecha: ${new Date(ticket.fecha).toLocaleDateString('es-AR')}`;

    header.appendChild(empresa);
    header.appendChild(fecha);
    container.appendChild(header);

    ticket.items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'carrito-item';

        const img = document.createElement('img');
        img.src = item.imagen;
        img.alt = item.titulo;

        const info = document.createElement('div');
        info.className = 'carrito-item-info';

        const titulo = document.createElement('h3');
        titulo.textContent = item.titulo;

        const cantidad = document.createElement('span');
        cantidad.textContent = `Cantidad: ${item.cantidad}`;

        const precio = document.createElement('span');
        precio.textContent = `Precio unitario: $${item.precio}`;

        const subtotal = document.createElement('span');
        subtotal.className = 'precio';
        subtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;

        info.appendChild(titulo);
        info.appendChild(cantidad);
        info.appendChild(precio);
        info.appendChild(subtotal);

        div.appendChild(img);
        div.appendChild(info);

        container.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'carrito-footer';

    const totalLabel = document.createElement('span');
    totalLabel.textContent = 'Total pagado:';

    const totalValor = document.createElement('span');
    totalValor.textContent = `$${ticket.total}`;

    totalDiv.appendChild(totalLabel);
    totalDiv.appendChild(totalValor);
    container.appendChild(totalDiv);
}

btnPdf.addEventListener('click', () => {
    const ticket = JSON.parse(localStorage.getItem('ticket'));
    
    if (ticket && ticket.id_orden) {
        window.location.href = `/api/ventas/${ticket.id_orden}/pdf`;
    } else {
        alert("No se encontro el numero de orden de este ticket.");
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const contenedorNombre = document.getElementById('contenedor-nombre');
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    if (contenedorNombre && nombreUsuario) {
        const h2 = document.createElement('h2');
        h2.textContent = nombreUsuario;
        contenedorNombre.appendChild(h2);
    }

    renderizarTicket();

    document.getElementById('btn-salir').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});
