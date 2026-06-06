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
});