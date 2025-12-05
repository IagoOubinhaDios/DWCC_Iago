const libros = [
  {
    id: 1,
    nombre: "Java 17. Fundamentos prácticos de programación",
    precio: 45,
    imagen: "/Formularios y Eventos - Carro Compra Libreria Virtual - Alumnos/imagenes/libro1.jpg",
    seleccionado: false
  },
  {
    id: 2,
    nombre: "HTML y CSS",
    precio: 35,
    imagen: "/Formularios y Eventos - Carro Compra Libreria Virtual - Alumnos/imagenes/libro2.jpg",
    seleccionado: false
  },
  {
    id: 3,
    nombre: "JavaScript",
    precio: 94,
    imagen: "/Formularios y Eventos - Carro Compra Libreria Virtual - Alumnos/imagenes/libro3.jpg",
    seleccionado: false
  }
];

const $d = document,
  $libros = $d.querySelector(".columnas"),
  $botones = $d.querySelector(".botones"),
  $total = $d.querySelector("#total");

let total = 0;

function renderLibros() {
  let totalActual = 0;
  let seleccionar = "";
  $libros.innerHTML = libros.reduce((anterior, actual) => {
    totalActual += actual.seleccionado ? actual.precio : 0;
    seleccionar = actual.seleccionado ? " seleccionado" : "";
    return (
      anterior +
      `<div class="libro${seleccionar}" data-id="${actual.id}">
        <strong>${actual.nombre}</strong>
        <figure>
          <img src="${actual.imagen}" alt="#" />
        </figure>
        <p class="linea">
          <strong>${actual.precio}€</strong>
          <input type="checkbox" name="libro" value="${total}" ${seleccionar ? "checked" : ""}/>
        </p>
     </div>`
    );
  }, "");

  renderTotal(totalActual);
}

function renderTotal(totalActual){
  $total.innerHTML = `<label for="resultado">Total Compra:</label>
    <input type="text" name="resultado" id="resultado" size="8" value="${totalActual} €"/>`;
  total = totalActual;
  totalActual = 0;
}

$libros.addEventListener("click", (ev) => {
  let id = ev.target.dataset.id;
  if (id) {
    let check = ev.target.querySelector("p>input");
    let libro = libros.find(el => el.id == id);
    if(check.checked){
      libro.seleccionado = false;
    } else {
      libro.seleccionado = true;
    }
  }
  renderLibros();
});

$botones.addEventListener("click", ev => {
  ev.preventDefault();
  let value = ev.target.value;
  if (value){
    if(value == "Comprar"){
      alert(total > 0 ? `Se procesa pedido de ${total} €` : `No has comprado nada`);
    } else if (value == "Limpiar"){
      libros.forEach(el => el.seleccionado = false);
      renderLibros();
    }
  }
})

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderLibros();
});
