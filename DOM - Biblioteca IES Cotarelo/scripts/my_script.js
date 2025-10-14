const $d = document,
  $libros = $d.querySelector("#libros-container>ul"),
  $buscar = $d.querySelector("#buscarLibros>input"),
  $ocultar = $d.querySelector("#ocultar"),
  $addLibro = $d.querySelector("#libro-add>button"),
  $libroTitle = $d.querySelector("#libro-add>input");

const libros = [
  "Eloquent JavaScript",
  "Scope & Closures",
  "Understanding ECMAScript 6",
  "Beginning Node.js",
  "Web development with Node & Express",
];

$libros.addEventListener("click", (ev) => {
  let id = ev.target.dataset.libroId;
  if (id) {
    libros.splice(id, 1);
    renderLibros(libros);
  }
});

$buscar.addEventListener("keyup", (ev) => {
  const librosFiltrados = libros.filter((libro) =>
    libro.toLowerCase().includes(ev.target.value.toLowerCase())
  );
  renderLibros(librosFiltrados);
});

$ocultar.addEventListener("click", (ev) => {
  $libros.classList.toggle("ocultar");
});

$addLibro.addEventListener("click", (ev) => {
  ev.preventDefault();

  let titulo = $libroTitle.value;
  if (titulo) {
    if (!libros.some((libro) => libro.toLowerCase() == titulo.toLowerCase())) {
      libros.push(titulo);
      renderLibros(libros);
      $libroTitle.value = "";
    } else {
      alert("El libro ya existe");
    }
  } else {
    alert("Debes añadir un título");
  }
});

function renderLibros(libros) {
  $libros.innerHTML = libros.reduce(
    (anterior, actual, i) =>
      anterior +
      `
    <li>
    <span class="titulo">${actual}</span>
    <span class="borrar" data-libro-id="${i}">-</span>
    </li>`,
    ""
  );
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderLibros(libros);
});
