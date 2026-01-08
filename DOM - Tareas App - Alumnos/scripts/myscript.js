
const $d = document,
  $formulario = $d.querySelector("#formulario"),
  $itemsTareas = $d.querySelector("#tareas"),
  $submit = $formulario.querySelector("button");
const tareas = [];

function renderTareas(tareas) {
  $itemsTareas.innerHTML = tareas.length
    ? tareas.reduce(
        (anterior, actual) =>
          anterior +
          `<div class="alert alert-warning dsubmit-flex justify-content-between align-items-center">
                <p style=${!actual.estado?"text-decoration":""}>${actual.tarea}</p>
                <h3 class="m-0">
                    <i class="fas fa-check-circle text-success" role="button" data-tarea-id="${actual.id}"></i>
                    <i class="fas fa-minus-circle text-danger" role="button" data-tarea-id="${actual.id}"></i>
                </h3>
            </div>`,
        ``
      )
    : `<p class="alert alert-dark text-center">Sin tareas pendientes &#10084;</p>`;
    console.log(tareas);
}

$formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let tareaNueva = $formulario.input.value;
  if (tareaNueva) {
    let id = $submit.dataset.tareaId;
    if (id){
      // Modificar
      let tarea = tareas.find(tarea => tarea.id == id);
      tarea.tarea = tareaNueva;
      $submit.textContent = "Añadir";
      delete $submit.dataset.tareaId;
      $itemsTareas.addEventListener("click", procressTarea);
    } else {
      // Añadir
      tareas.push({id:Date.now(), tarea:tareaNueva, estado:true});
    }
    $formulario.input.value = "";
    renderTareas(tareas);
  } else {
    alert("Escribe el nombre de la tarea");
  }
});

$itemsTareas.addEventListener("click", procressTarea);

function procressTarea (ev) {
  let id = ev.target.dataset.tareaId;
  
  if (id) {
    if (ev.target.classList.contains("text-danger")) {
      // Borrar
      let index = tareas.indexOf(tarea => tarea.id == id);
      tareas.splice(index, 1);
      renderTareas(tareas);
    } else {
      // Actualizar
      // const $p = ev.target.parentElement.previousElementSibling;
      // if ($p.style.textDecoration == "line-through") {
      //   $p.style.textDecoration='';
      // } else {
      //   $p.style = "text-decoration:line-through";
      //   tareas[id].estado = !tareas[id].estado;
      //   renderTareas(tareas);
      // }
      let tarea = tareas.find(tarea => tarea.id == id);
      // tarea.estado = false;
      $formulario.input.value = tarea.tarea;
      $submit.textContent = "Modificar";
      $submit.dataset.tareaId = id;
      $itemsTareas.removeEventListener("click", procressTarea);
      renderTareas(tareas);
    }
  }
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderTareas(tareas);
});
