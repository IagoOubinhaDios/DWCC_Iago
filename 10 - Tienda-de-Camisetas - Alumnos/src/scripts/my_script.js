import GridCombobox from "./Combo.js";

function capitalize(cad) {
  return cad
    .toLowerCase()
    .split(" ")
    .filter((el) => el != "")
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
    .join(" ");
}

const $d = document,
  $equipos = $d.querySelector("#filtro-equipo"),
  $camisetas = $d.querySelector(".cards"),
  $formulario = $d.querySelector(".form"),
  $botones = $formulario.querySelector(".botones"),
  $tallas = $d.querySelector(".filtro__tallas"),
  $equipo = $formulario.querySelector("#equipo"),
  $dorsal = $formulario.querySelector("#eq"),
  $sexo = $formulario.querySelector("#sexo"),
  $fecha = $formulario.querySelector("#fecha"),
  $precio = $formulario.querySelector("#precio"),
  $si = $formulario.querySelector("#si"),
  $no = $formulario.querySelector("#no"),
  $unica = $formulario.querySelector("#U"),
  $s = $formulario.querySelector("#S"),
  $m = $formulario.querySelector("#M"),
  $l = $formulario.querySelector("#L"),
  $xl = $formulario.querySelector("#XL"),
  $imagen = $formulario.querySelector("#imagen");

$fecha.setAttribute("required", "");
$precio.setAttribute("required", "");

const url = "http://localhost:3000";
const camisetas = [],
  equipos = [];
let camisetasFiltradas = [];

/* Funciones de ajax */
async function ajax({ url, method, data, headers = {} }) {
  try {
    let resp = await fetch(url, {
      method: method ?? "GET",
      headers: {
        "Content-Type": "application/json, charset-utf-8",
        ...headers
      },
      body: method !== "GET" && data ? JSON.stringify(data) : null
    });

    if(!resp.ok) {
      return {
        ok: resp.ok,
        status: resp.status,
        statusText: resp.statusText || "Ocurrio un error",
        data: null
      }
    }

    let json = await resp.json();

    return {
      ok: resp.ok,
      status: resp.status,
      statusText: "OK",
      data: json
    }
     
  } catch(error) {
    return {
      ok: false,
      status: 0,
      statusText: "Ha ocurrido un error",
      data: null
    }
  }
}

async function addEquipo(equipo) {
  const resp = await ajax({
    url: `${url}/teams`,
    method: "POST",
    data: {
      name: equipo,
    },
  });

  if (resp.ok) {
    equipos.push(resp.data);
    renderEquipos(equipos);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function addCamiseta(
  equipo,
  equipacion,
  sexo,
  fecha,
  precio,
  personalizable,
  U,
  S,
  M,
  L,
  XL,
  imagen
) {
  const resp = await ajax({
    url: `${url}/tshirts`,
    method: "POST",
    data: {
      teamId: equipo,
      footballKit: equipacion,
      sexGroup: sexo,
      date: fecha,
      price: precio,
      customizable: personalizable,
      sizes: {
        U: U,
        S: S,
        M: M,
        L: L,
        XL: XL,
      },
      image: imagen
    },
  });

  if (resp.ok) {
    camisetas.push(resp.data);
    unfillForm();
    renderCamisetas(camisetas, equipos);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function updateCamiseta(
  id,
  equipo,
  equipacion,
  sexo,
  fecha,
  precio,
  personalizable,
  U,
  S,
  M,
  L,
  XL,
  imagen
) {
  const resp = await ajax({
    url: `${url}/tshirts/${id}`,
    method: "PATCH",
    data: {
      teamId: equipo,
      footballKit: equipacion,
      sexGroup: sexo,
      date: fecha,
      price: precio,
      customizable: personalizable,
      sizes: {
        U: U,
        S: S,
        M: M,
        L: L,
        XL: XL,
      },
      image: imagen
    },
  });

  if (resp.ok) {
    let indice = camisetas.findIndex((cam) => cam.id == id);
    camisetas.splice(indice, 1, resp.data);
    unfillForm();
    renderCamisetas(camisetas, equipos);
  } else {
    alert(`Error al actualizar: ${resp.statusText}`);
  }
}

async function delCamiseta(id) {
  const resp = await ajax({
    url: `${url}/tshirts/${id}`,
    method: "DELETE",
  });

  if (resp.ok) {
    let indice = camisetas.findIndex((cam) => cam.id == id);
    camisetas.splice(indice, 1);
    renderCamisetas(camisetas, equipos);
  } else {
    alert(`Error al eliminar: ${resp.statusText}`);
  }
}

/* Función para modificar los select */
function modificarSelected(select, id) {
  let opciones = select.querySelectorAll("option");

  opciones.forEach((opt) => opt.removeAttribute("selected"));

  opciones.forEach((opt) => {
    if (opt.value == id) {
      opt.setAttribute("selected", "");
    }
  });
}

/* Funciones de vaciar y rellenar el formulario */
function unfillForm() {
  $camisetas.removeEventListener("click", evitarRecargarPagina);
  $camisetas.addEventListener("click", eventoCamisetas);
  $equipo.removeAttribute("disabled");
  $dorsal.removeAttribute("disabled");
  $sexo.removeAttribute("disabled");
  $equipo.value = "";
  $fecha.value = "";
  $precio.value = "";
  $no.checked = true;
  $unica.value = 0;
  $s.value = 0;
  $m.value = 0;
  $l.value = 0;
  $xl.value = 0;
  $imagen.value = "";
  $formulario.querySelector("#enviar").removeAttribute("data-id");
}

function fillForm(camiseta) {
  $camisetas.removeEventListener("click", eventoCamisetas);
  $camisetas.addEventListener("click", evitarRecargarPagina);
  let equipo = equipos.find((team) => team.id == camiseta.teamId);
  $equipo.value = equipo.name;
  $equipo.setAttribute("disabled", "");
  modificarSelected($dorsal, camiseta.footballKit);
  $dorsal.setAttribute("disabled", "");
  modificarSelected($sexo, camiseta.sexGroup);
  $sexo.setAttribute("disabled", "");
  $fecha.value = camiseta.date;
  $precio.value = camiseta.price;
  camiseta.customizable ? ($si.checked = true) : ($no.checked = true);
  $unica.value = camiseta.sizes.U;
  $s.value = camiseta.sizes.S;
  $m.value = camiseta.sizes.M;
  $l.value = camiseta.sizes.L;
  $xl.value = camiseta.sizes.XL;
  $imagen.value = camiseta.image;
  $formulario.querySelector("#enviar").setAttribute("data-id", camiseta.id);
}

/* Todos los EventListener */
function evitarRecargarPagina(ev) {
  ev.preventDefault();
}

async function eventoCamisetas(ev) {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  if (id) {
    if (ev.target.classList.contains("icon--edit")) {
      let camiseta = camisetas.find((cam) => cam.id == id);
      fillForm(camiseta);
    } else if (ev.target.classList.contains("icon--delete")) {
      await delCamiseta(id);
    }
  }
}

$camisetas.addEventListener("click", eventoCamisetas);

$equipos.addEventListener("click", (ev) => {
  if (ev.target.value != "Cualquiera") {
    camisetasFiltradas = camisetas.filter(
      (camiseta) => camiseta.teamId == ev.target.value
    );
    renderCamisetas(camisetasFiltradas, equipos);
  } else {
    renderCamisetas(camisetas, equipos);
  }
});

$tallas.addEventListener("click", (ev) => {
  if (ev.target.classList.contains("seleccionado")) {
    ev.target.classList = "";
  } else {
    ev.target.classList = "seleccionado";
  }

  // let talla = ev.target.value;

  // camisetasFiltradas.filter((cam) => {
  //   cam.talla >= 0;
  // })
  // renderCamisetas(camisetasFiltradas, equipos);
})

$botones.addEventListener("click", async (ev) => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  let indice = equipos.findIndex((team) => team.name == $equipo.value);
  if (indice == -1 && $equipo.value != "") {
    await addEquipo($equipo.value);
  }
  let equipo = equipos.find((team) => team.name == $equipo.value);

  if (equipo) {

    if ($fecha.value == "") {
      alert("Campo 'Fecha de entrada' requerido");
      return;
    }
  
    if ($precio.value == "") {
      alert("Campo 'Precio' requerido");
      return;
    }

    if (ev.target.classList == "btn") {
      if (id) {
        await updateCamiseta(
          id,
          equipo.id,
          $dorsal.querySelector("option:checked").value,
          $sexo.value,
          $fecha.value,
          $precio.value,
          $si.checked ? true : false,
          $unica.value,
          $s.value,
          $m.value,
          $l.value,
          $xl.value,
          $imagen.value
        );
      } else {
        await addCamiseta(
          equipo.id,
          $dorsal.querySelector("option:checked").value,
          $sexo.value,
          $fecha.value,
          $precio.value,
          $si.checked ? true : false,
          $unica.value,
          $s.value,
          $m.value,
          $l.value,
          $xl.value,
          $imagen.value
        );
      }
    } else if (ev.target.classList == "btn btn--delete") {
      unfillForm();
    }
  } else {
    alert("Campo 'Equipo' requerido");
    return;
  }
});

function renderCamisetas(camisetas, equipos) {
  $camisetas.innerHTML = camisetas.reduce((anterior, actual) => {
    let team = equipos.find((team) => team.id == actual.teamId);
    return (
      anterior +
      `<li class="card">
            <figure class="card__img">
                <img src="${
                  actual.image
                    ? actual.image
                    : "./assets/images/producto-sin-imagen.png"
                }" alt="" />
            </figure>
            <h4 class="card__titulo">
                <p>${actual.footballKit}ª ${team.name}</p>
            </h4>
            <p class="cart__categoria">${actual.sexGroup}</p>
            <ul class="card__tallas">
                <li ${actual.sizes["U"] <= 0 ? 'class="nostock"' : ""}>U</li>
                <li ${actual.sizes["S"] <= 0 ? 'class="nostock"' : ""}>S</li>
                <li ${actual.sizes["M"] <= 0 ? 'class="nostock"' : ""}>M</li>
                <li ${actual.sizes["L"] <= 0 ? 'class="nostock"' : ""}>L</li>
                <li ${actual.sizes["XL"] <= 0 ? 'class="nostock"' : ""}>XL</li>
                <li ${
                  actual.sizes["2XL"] <= 0 || !actual.sizes["2XL"] ? 'class="nostock"' : ""
                }>2XL</li>
            </ul>
            <p class="card__precio">${actual.price}</p>
            <p class="btns">
                <a href="" class="icon--edit" data-id="${actual.id}"></a>
                <a href="" class="icon--delete" data-id="${actual.id}"></a>
            </p>
        </li>`
    );
  }, "");
}

function renderEquipos(equipos) {
  $equipos.innerHTML = equipos.reduce(
    (anterior, actual) =>
      anterior + `<option value="${actual.id}">${actual.name}</option>`,
    "<option>Cualquiera</option>"
  );
}

$d.addEventListener("DOMContentLoaded", ev => {
  Promise.all([fetch(`${url}/tshirts`), fetch(`${url}/teams`)])
  .then((resps) => 
    Promise.all(
      resps.map((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
    )
  )
  .then((json) => {
    camisetas.splice(0, camisetas.length, ...json[0]);
    equipos.splice(0, equipos.length, ...json[1]);
    renderCamisetas(camisetas, equipos);
    renderEquipos(equipos);
  })
  .catch((errors) => {console.log(errors)});
})
