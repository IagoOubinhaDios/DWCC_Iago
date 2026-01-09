const $d = document,
  $formulario = $d.querySelector("#formulario"),
  $itemsTareas = $d.querySelector("#tareas"),
  $submit = $formulario.querySelector("button");

const url = "http://localhost:3000";
const tareas = [];

function ajax(options) {
  const { url, method, fExito, fError, data } = options;

  fetch(url, {
    method: method || "GET",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
    .then((json) => fExito(json))
    .catch((error) => {
      fError({
        status: error.status,
        statusText: error.statusText || "Ocurrió un error",
      });
    });
}

function addTarea(tareaNueva){
  ajax({
    url: `${url}/tareas`,
    method: 'POST',
    fExito: (json) => {
      tareas.push(json);
      renderTareas(tareas);
    },
    fError: (error) => console.log(error),
    data: {
      tarea: tareaNueva
    }
  });
}

function modTarea(idTarea, tareaModificada){
  ajax({
    url: `${url}/tareas/${idTarea}`,
    method: 'PATCH',
    fExito: (json) => {
      let indice = tareas.findIndex((tarea) => tarea.id == idTarea);
      tareas.splice(indice, 1, json);
      $submit.textContent = "Agregar";
      delete $submit.dataset.tareaId;
      $itemsTareas.addEventListener("click", procressTarea);
      renderTareas(tareas);
    },
    fError: (error) => console.log(error),
    data: {
      tarea: tareaModificada
    }
  });
}

function delTarea(id){
  ajax({
    url: `${url}/tareas/${id}`,
    method: 'DELETE',
    fExito: (json) => {
      let indice = tareas.findIndex((tarea) => tarea.id == id);
      tareas.splice(indice, 1);
      renderTareas(tareas);
    },
    fError: (error) => console.log(error)
  });
}

$formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let tarea = $formulario.input.value;
  if (tarea) {
    let id = $submit.dataset.tareaId;
    if (id) {
      // Modificar
      modTarea(id, tarea);
    } else {
      // Añadir
      addTarea(tarea);
    }
    $formulario.input.value = "";
  } else {
    alert("Escribe el nombre de la tarea");
  }
});

$itemsTareas.addEventListener("click", procressTarea);

function procressTarea(ev) {
  let id = ev.target.dataset.tareaId;

  if (id) {
    if (ev.target.classList.contains("text-danger")) {
      // Borrar
      delTarea(id);
    } else {
      // Actualizar
      let tarea = tareas.find((tarea) => tarea.id == id);
      $formulario.input.value = tarea.tarea;
      $submit.textContent = "Modificar";
      $submit.dataset.tareaId = id;
      $itemsTareas.removeEventListener("click", procressTarea);
    }
  }
}

function renderTareas(tareas) {
  $itemsTareas.innerHTML = tareas.length
    ? tareas.reduce(
        (anterior, actual) =>
          anterior +
          `<div class="alert alert-warning dsubmit-flex justify-content-between align-items-center">
                  <p style=${!actual.estado ? "text-decoration" : ""}>${
            actual.tarea
          }</p>
                  <h3 class="m-0">
                      <i class="fas fa-check-circle text-success" role="button" data-tarea-id="${
                        actual.id
                      }"></i>
                      <i class="fas fa-minus-circle text-danger" role="button" data-tarea-id="${
                        actual.id
                      }"></i>
                  </h3>
              </div>`,
        ``
      )
    : `<p class="alert alert-dark text-center">Sin tareas pendientes &#10084;</p>`;
}

function getTareas() {
  ajax({
    url: `${url}/tareas`,
    method: "GET",
    fExito: (json) => {
      tareas.splice(0, tareas.length, ...json);
      renderTareas(json);
    },
    fError: (error) => console.log(error),
  });
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  getTareas();
});
