const formulario = document.getElementById("formulario-inicio");
const inputUsuario = document.getElementById("input-usuario");

document.addEventListener("DOMContentLoaded", () => {
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