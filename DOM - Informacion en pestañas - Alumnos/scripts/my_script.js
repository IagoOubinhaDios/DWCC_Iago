const $d = document,
$contenedor = $d.querySelector(".btn-container"),
$pagina = $d.querySelector(".page-content");

$contenedor.addEventListener("click", ev => {
    let id = ev.target.dataset.id;
    if (id) {
        if (!ev.target.classList.contains("active")) {

            let botonActivo = $contenedor.querySelector(".active");
            let paginaActiva = $pagina.querySelector(".active");

            //Cambio boton marcado
            botonActivo.classList.remove("active");
            ev.target.classList.add("active");

            //Cambio página marcada
            let paginaMarcar = $pagina.querySelector(`#${id}`);
            paginaActiva.classList.remove("active");
            paginaMarcar.classList.add("active");
        }
    }
});