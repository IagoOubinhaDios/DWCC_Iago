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
