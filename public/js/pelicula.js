class Pelicula {
    id;
    titulo;
    imagen;

    constructor(id, titulo, imagen){
        this.id = id;
        this.titulo = titulo;
        this.imagen = imagen;
    }

    createHtmlElement() {
        const div = document.createElement('div');
        div.className = 'product-card';

        var nombrePeli = document.createElement("h3");
        nombrePeli.appendChild(document.createTextNode(`Titulo: ${this.titulo}`));
       
        var imagenPeli = document.createElement("img");
        imagenPeli.setAttribute("src", this.imagen);
        //imagenPeli.addEventListener("click", () =>{ window.open(this.url, '_blank')})

        div.appendChild(nombrePeli);
        div.appendChild(imagenPeli);

        return div;
        
    }

}