const datos = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    titulo: "Explorar El Mundo",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1572276596237-5db2c3e16c5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    titulo: "Bosques Salvajes",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1353&q=80",
    titulo: "Playas Soleadas",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
    titulo: "La Ciudad en Invierno",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    titulo: "Montañas y Nubes",
  },
];

const $d = document,
  $contenedor = $d.querySelector(".container");

function renderPaneles(id) {
  $contenedor.innerHTML = datos.reduce((anterior, actual,i) => {
    return (
      anterior +
      `<div ${i+1==id?"class='panel active'":"class='panel'"}
            style="
              background-image: url('${actual.url}');
            ">
            <h3>${actual.titulo}</h3>
        </div>`
    );
  }, "");
}

$contenedor.addEventListener("click", (ev) => {
  let panel = ev.target;
  if (!panel.classList.contains("active")) {
    $contenedor.querySelectorAll(".panel").forEach(el=>el.classList.remove("active"))
    panel.classList.add("active");
  }
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderPaneles(1);
});

/*let $panelActivo = $contenedor.querySelector(".active");

function renderPaneles() {
  let $activo = datos.find((el) => el.titulo == $panelActivo.querySelector("h3").textContent);
  $contenedor.innerHTML = datos.reduce((anterior, actual) => {
    let $texto = $activo == actual ? " active" : "";
    return (
      anterior +
      `<div
            class= "panel${$texto}"
            style="
              background-image: url('${actual.url}');
            ">
            <h3>${actual.titulo}</h3>
        </div>`
    );
  }, "");
}

$contenedor.addEventListener("click", (ev) => {
  let el = ev.target;
  if (!ev.target.classList.contains("active")) {
    $contenedor.querySelectorAll("div").forEach(el=>el.classList.remove("active"));
    el.classList.add("active");
  }
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderPaneles();
});*/
