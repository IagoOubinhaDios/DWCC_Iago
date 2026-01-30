const getDate = (date) => new Date().toISOString().split("T")[0];

const calcYears = (date1, date2 = null) => {
  let firstDate = new Date(date1);
  let d1 = firstDate.getDate();
  let m1 = firstDate.getMonth() + 1;
  let y1 = firstDate.getFullYear();

  let secondDate = date2 ? new Date(date2) : new Date();

  let d2 = secondDate.getDate();
  let m2 = secondDate.getMonth() + 1;
  let y2 = secondDate.getFullYear();

  let y3;

  y3 = y2 - y1;
  if (m2 >= m1) {
    if (d2 < d1 && m2 == m1) y3--;
  } else {
    y3--;
  }

  return y3;
};

const addYears = (years, date = null) => {
  let fecha = date ? new Date(date) : new Date();

  let newYear = fecha.getFullYear() + years;
  return `${newYear}-${(fecha.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${fecha.getDate().toString().padStart(2, "0")}`;
};

const $d = document,
  $listado = $d.querySelector(".listado"),
  $formEmpleado = $d.querySelector(".formulario"),
  $empleados = $d.querySelector("#table_empleados>tbody"),
  $puestos = $formEmpleado.querySelector("fieldset>p>select"),
  $nuevoEmpleado = $listado.querySelector(".btn-success"),
  $btnAdd = $formEmpleado.querySelector(".btn-add"),
  $btnReset = $formEmpleado.querySelector(".btn-reset"),
  $search = $listado.querySelector("#searchName");

const empleados = [], puestos = [];
const url = "http://localhost:3000";

async function ajax({ url, method, data, headers = {} }) {
  try {
    let resp = await fetch(url, {
      method: method ?? "GET",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        ...headers,
      },
      body: method !== "GET" && data ? JSON.stringify(data) : null,
    });

    if (!resp.ok) {
      return {
        ok: resp.ok,
        status: resp.status,
        statusText: resp.statusText || "Ocurrió un error",
        data: null,
      };
    }

    let json = await resp.json();

    return {
      ok: resp.ok,
      status: resp.status,
      statusText: "OK",
      data: json,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      statusText: "Fallo de red",
      data: null,
    };
  }
}

function modificarSelected($opciones, value) {
  let opciones = $opciones.querySelectorAll("option");

  opciones.forEach((opt) => {
    opt.removeAttribute("selected");
  });

  opciones.forEach((opt) => {
    if (opt.value == value) {
      opt.setAttribute("selected", "");
    }
  });
}

function fillForm(id) {
  $listado.classList.add('hidden');
  $formEmpleado.classList.remove('hidden');

  let empleado = empleados.find((el) => el.id == id);
  $btnAdd.setAttribute("data-id", empleado.id);
  $formEmpleado.querySelector("#nif").value = empleado.nif;
  $formEmpleado.querySelector("#name").value = empleado.name;
  $formEmpleado.querySelector("#bornDate").value = empleado.bornDate;
  $formEmpleado.querySelector("#avatar").value = empleado.avatar;
  $formEmpleado.querySelector("#contractDate").value = empleado.contractDate;
  modificarSelected($puestos, empleado.positionId);

  let puesto = puestos.find((el) => el.id == empleado.positionId);
  $formEmpleado.querySelector("#salary").value = puesto.salary;
}

async function delEmpleado(id) {
  const resp = await ajax({
    url: `${url}/employees/${id}`,
    method: 'DELETE'
  });

  if (resp.ok) {
    let indice = empleados.findIndex((el) => el.id == id);
    empleados.splice(indice, 1);
    renderEmpleados(empleados, puestos);
    mostrarListado();
  } else {
    alert(`Error al borrar: ${resp.statusText}`);
  }
}

$empleados.addEventListener("click", async (ev) => {
  let id = ev.target.dataset.id;

  if (id) {
    let action = ev.target.dataset.action;
    if (action == "edit") {
      fillForm(id);
    } else if (action == "delete") {
      await delEmpleado(id);
    }
  }
})

$puestos.addEventListener("click", ev => {
  ev.preventDefault();
  modificarSelected($puestos, ev.target.value);
  let puesto = puestos.find((el) => el.id == ev.target.value);
  $formEmpleado.querySelector("#salary").value = puesto.salary;
})

async function addEmpleado(dni, nombre, fechaNac, foto, fechaContrato, idPuesto) {
  const resp = await ajax({
    url: `${url}/employees`,
    method: "POST",
    data: {
      name: nombre,
      nif: dni,
      bornDate: fechaNac,
      avatar: foto,
      contractDate: fechaContrato,
      positionId: idPuesto,
    },
  });

  if (resp.ok) {
    empleados.push(resp.data);
    renderEmpleados(empleados, puestos);
    mostrarListado();
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function updateEmpleado(id, dni, nombre, fechaNac, foto, fechaContrato, idPuesto) {
  const resp = await ajax({
    url: `${url}/employees/${id}`,
    method: 'PUT',
    data: {
      name: nombre,
      nif: dni,
      bornDate: fechaNac,
      avatar: foto,
      contractDate: fechaContrato,
      positionId: idPuesto,
    }
  })

  if (resp.ok) {
    let indice = empleados.findIndex((el) => el.id == id);
    empleados.splice(indice, 1, resp.data);
    $btnAdd.removeAttribute("data-id");
    renderEmpleados(empleados, puestos);
    mostrarListado();
  } else {
    alert(`Error al actualizar: ${resp.statusText}`);
  }
}

$btnAdd.addEventListener("click", async (ev) => {
  let id = ev.target.dataset.id;

  if (id) {
    await updateEmpleado(
      id,
      $formEmpleado.querySelector("#nif").value,
      $formEmpleado.querySelector("#name").value,
      $formEmpleado.querySelector("#bornDate").value,
      $formEmpleado.querySelector("#avatar").value,
      $formEmpleado.querySelector("#contractDate").value,
      $puestos.querySelector("option:checked").value);
  } else {
    await addEmpleado(
      $formEmpleado.querySelector("#nif").value,
      $formEmpleado.querySelector("#name").value,
      $formEmpleado.querySelector("#bornDate").value,
      $formEmpleado.querySelector("#avatar").value,
      $formEmpleado.querySelector("#contractDate").value,
      $puestos.querySelector("option:checked").value);
  }
})

function mostrarFormulario() {
  $listado.classList.add('hidden');
  $formEmpleado.classList.remove('hidden');
}

function mostrarListado() {
  $listado.classList.remove('hidden');
  $formEmpleado.classList.add('hidden');
}

$nuevoEmpleado.addEventListener("click" ,(ev) => {
  mostrarFormulario();
})

$btnReset.addEventListener("click", (ev) => {
  mostrarListado();
})

$search.addEventListener("keyup", (ev) => {
  const empleadosFiltrados = empleados.filter((empleado) =>
    empleado.name.toLowerCase().includes(ev.target.value.toLowerCase())
  );
  renderEmpleados(empleadosFiltrados, puestos);
})

function renderEmpleados(empleados, puestos) {
  $listado.querySelector("header>h2").innerHTML = `Lista de empleados (${empleados.length})`;
  $empleados.innerHTML = empleados.reduce((anterior, actual, id) => {
    let puesto = puestos.find((el) => el.id == actual.positionId);
    return anterior +
      `<tr>
        <th scope="row">${id + 1}</th>
        <td>${actual.name}</td>
        <td>${calcYears(actual.bornDate)}</td>
        <td>${actual.nif}</td>
        <td>${puesto.name}</td>
        <td class="avatar">
          <figure>
            <img
              class="avatar-img"
              src="./assets/imgs/fotos_empleados/${actual.avatar}"
              alt=""
            />
          </figure>
        </td>
        <td>
          ${puesto.salary}
          €
        </td>
        <td class="acciones">
          <a title="Editar datos del empleado" href="#" class="btn btn-warning">
            <img src="./assets/imgs/icons/pencil.svg" alt="" data-id="${actual.id}" data-action="edit"/>
          </a>
          <a title="Eliminar datos del empleado" href="#" class="btn btn-danger">
            <img src="./assets/imgs/icons/trash-can.svg" alt="" data-id="${actual.id}" data-action="delete"/>
          </a>
        </td>
      </tr>`}, '')
}

function renderPuestos(puestos) {
  $puestos.innerHTML = puestos.reduce((anterior, actual) => anterior + 
  `<option value="${actual.id}">${actual.name}</option>`, '')
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  $listado.classList.remove('hidden');
  $formEmpleado.classList.add('hidden');
  Promise.all([fetch(`${url}/employees`), fetch(`${url}/positions`)])
    .then((resps) =>
      Promise.all(
        resps.map((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
      )
    )
    .then((jsons) => {
      empleados.splice(0, empleados.length, ...jsons[0]);
      puestos.splice(0, puestos.length, ...jsons[1]);
      renderEmpleados(empleados, puestos);
      renderPuestos(puestos);
    })
    .catch((errors) => {
      console.log(errors);
    });
});
