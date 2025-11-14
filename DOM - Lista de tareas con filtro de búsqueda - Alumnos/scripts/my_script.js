const $d = document,
  $tarea = $d.querySelector("#crear"),
  $boton = $d.querySelector("button"),
  $form = $d.querySelector("#formSearch"),
  $lista = $d.querySelector("#lista-tareas");

$d.addEventListener("DOMContentLoaded", (ev) => {
  function renderLista(tareas) {
    $lista.innerHTML = tareas.reduce(
      (anterior, actual,i) =>
        anterior +
        `<li>
            <strong>${actual}</strong><i class="fas fa-minus-circle borrar" data-id=${i}></i>
        </li>`,
      ""
    );
  }

  $boton.addEventListener("click", (ev) => {
    ev.preventDefault();

    let tarea = $tarea.value;
    if (tarea && tareas.indexOf(tarea) == -1) {
      tareas.push(tarea);
    }
    sessionStorage.setItem("tareas", JSON.stringify(tareas));
    renderLista(tareas);
  });

  $form.addEventListener("keyup", (ev) => {
    const listaFiltrada = tareas.filter((tarea) =>
      tarea.toLowerCase().includes(ev.target.value.toLowerCase())
    );
    renderLista(listaFiltrada);
  });

  $lista.addEventListener("click", (ev) => {
    let id=ev.target.dataset.id
    if (id){
      tareas.splice(id,1)
      sessionStorage.setItem("tareas", JSON.stringify(tareas));
      renderLista(tareas);
    }
  });

  const tareas = JSON.parse(sessionStorage.getItem("tareas")) || [];
  renderLista(tareas);
});
