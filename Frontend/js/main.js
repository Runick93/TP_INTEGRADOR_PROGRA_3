const formulario = document.getElementById("formulario-inicio");
const inputUsuario = document.getElementById("input-usuario");

document.addEventListener("DOMContentLoaded", () => {
	const esInicio = window.location.pathname === "/" || window.location.pathname.endsWith("index.html");

	if (esInicio) {
		localStorage.removeItem("nombreUsuario");
		localStorage.removeItem("carrito");
		localStorage.removeItem("ticket");
	}

	const nombreUsuario = localStorage.getItem("nombreUsuario");

	if (!nombreUsuario && !esInicio) {
		window.location.href = "/index.html";
		return;
	}

	document.querySelectorAll(".nav-link-protected").forEach((item) => {
		item.style.display = nombreUsuario ? "" : "none";
	});

	const navLinks = document.querySelectorAll(".sidebar a");

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.forEach((item) => {
				item.classList.remove("active");
				item.removeAttribute("aria-current");
			});

			link.classList.add("active");
			link.setAttribute("aria-current", "page");
		});
	});


	if (formulario && inputUsuario){
		formulario.addEventListener("submit", (e) => {
			e.preventDefault();

			const nombreValido = inputUsuario.value.trim();

			if (nombreValido === ""){
				alert('Por favor, ingresa un nombre antes de continuar');
				return
			}

			localStorage.setItem('nombreUsuario', nombreValido);

			window.location.href = '/pages/products.html';
		});
	}
});