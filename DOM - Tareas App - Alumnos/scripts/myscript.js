//formulario=document.querySelector("#formulario")
// const $d = document,
//   $formulario = $d.getElementById("formulario"),
//   $itemsTareas = $d.querySelector("#tareas");
// tareas = {};

// $formulario.addEventListener("submit", (e) => {
//   e.preventDefault();

//   console.log(e.target);
//   tarea = {
//     id: new Date().getTime(),
//     texto: e.target.input.value,
//     estado: false,
//   };
//   tareas[tarea.id] = { ...tarea };
//   $formulario.reset();
//   e.target.input.focus();
//   renderTareas(tareas);
// });

// function renderTareas(tareas) {
//   $itemsTareas.innerHTML = "";
//   //localStorage.setItem('tareas', JSON.stringify(tareas))
//   if (Object.keys(tareas).length == 0) {
//     $itemsTareas.innerHTML =
//       "<p class='alert alert-dark text-center'>Sin tareas pendientes &#10084;</p>";
//     return;
//   } else {
//     Object.values(tareas).forEach((el) => {
//       div = document.createElement("div");
//       if (el.estado)
//         div.setAttribute(
//           "class",
//           "alert alert-info d-flex justify-content-between align-items-center"
//         );
//       else
//         div.setAttribute(
//           "class",
//           "alert alert-warning d-flex justify-content-between align-items-center"
//         );

//       p = document.createElement("p");
//       if (el.estado) {
//         p.setAttribute("class", "m-0");
//         p.style.textDecoration = "line-through";
//       } else p.setAttribute("class", "m-0");

//       p.appendChild(document.createTextNode(el.texto));

//       i1 = document.createElement("i");
//       if (el.estado)
//         i1.setAttribute("class", "fas fa-undo-alt text-success mx-1");
//       else i1.setAttribute("class", "fas fa-check-circle text-success mx-1");
//       i1.setAttribute("role", "button");
//       i1.dataset.id = el.id;

//       i2 = document.createElement("i");
//       i2.setAttribute("class", "fas fa-minus-circle text-danger");
//       i2.setAttribute("role", "button");
//       i2.dataset.id = el.id;

//       h3 = document.createElement("h3");
//       h3.setAttribute("class", "m-0");

//       h3.appendChild(i1);
//       h3.appendChild(i2);
//       div.appendChild(p);
//       div.appendChild(h3);

//       $itemsTareas.appendChild(div);
//     });
//   }
// }

// $itemsTareas.addEventListener("click", (e) => {
//   if (e.target.classList.contains("fa-minus-circle")) {
//     delete tareas[e.target.dataset.id];
//     renderTareas();
//   }

//   if (e.target.classList.contains("fa-check-circle")) {
//     const tarea = tareas[e.target.dataset.id];
//     tarea.estado = true;
//     tareas[e.target.dataset.id] = { ...tarea };
//     renderTareas();
//   }

//   if (e.target.classList.contains("fa-undo-alt")) {
//     const tarea = tareas[e.target.dataset.id];
//     tarea.estado = false;
//     tareas[e.target.dataset.id] = { ...tarea };
//     renderTareas();
//   }
//   e.stopPropagation();
// });

// document.addEventListener("DOMContentLoaded", renderTareas);

const $d = document,
  $formulario = $d.querySelector("#formulario"),
  $itemsTareas = $d.querySelector("#tareas");
const tareas = [];

function renderTareas(tareas) {
  $itemsTareas.innerHTML = tareas.length
    ? tareas.reduce(
        (anterior, actual, i) =>
          anterior +
          `<div class="alert alert-warning d-flex justify-content-between align-items-center">
                <p style=${!actual.estado?"text-decoration":""}>${actual.tarea}</p>
                <h3 class="m-0">
                    <i class="fas fa-check-circle text-success" role="button" data-tarea-id="${i}"></i>
                    <i class="fas fa-minus-circle text-danger" role="button" data-tarea-id="${i}"></i>
                </h3>
            </div>`,
        ``
      )
    : `<p class="alert alert-dark text-center">Sin tareas pendientes &#10084;</p>`;
}

$formulario.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let tarea = $formulario.input.value;
  if (tarea) {
    // if (tareas[tarea] == null) {
      tareas.push({tarea, estado:true});
      renderTareas(tareas);
    // } else {
    //   alert("La tarea ya existe.");
    // }
    $formulario.input.value = "";
  } else {
    alert("Escribe el nombre de la tarea");
  }
});

$itemsTareas.addEventListener("click", (ev) => {
  let id = ev.target.dataset.tareaId;

  if (id) {
    if (ev.target.classList.contains("text-danger")) {
      // Borrar
      tareas.splice(id, 1);
      renderTareas(tareas);
    } else {
      // Actualizar
      const $p = ev.target.parentElement.previousElementSibling;
      if ($p.style.textDecoration == "line-through") {
        $p.style.textDecoration='';
      } else {
        $p.style = "text-decoration:line-through";
        tareas[id].estado = !tareas[id].estado;
        renderTareas(tareas);
      }
    }
  }
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderTareas(tareas);
});
