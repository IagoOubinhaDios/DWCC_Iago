const $d = document,
  $contactos = $d.querySelector(".contactos-container"),
  $form = $d.querySelector("form"),
  $enviar = $d.querySelector("#submit-btn"),
  $cancelar = $d.querySelector("#cancel-btn"),
  $vaciar = $d.querySelector("#reset-btn");

const url = "http://localhost:3000";
const contactosUrl = `${url}/contactos`;
const contactos = [];

function mostrarMensage(tipo, mensajeTxt) {
  const $mensage = $d.querySelector(".mensageAccion");
  $mensage.innerHTML = `${mensajeTxt}`;
  tipo == "error"
    ? $mensage.classList.add("error")
    : $mensage.classList.add("correcto");
  setTimeout(() => $mensage.classList.remove(tipo), 1000);
}

const fields = [
  {
    field: "nombre",
    checkFn: checkVacío,
  },
  {
    field: "direccion",
    checkFn: checkVacío,
  },
  {
    field: "telefono",
    checkFn: checkTelefono,
  },
];

function checkVacío(field) {
  let resultado = {
    field: field,
    status: true,
    statusError: "OK",
  };
  fields;

  return resultado;
}

function checkTelefono(field) {
  const exprReg = /^\d{3}-?\d{6}$/;

  let resultado = {
    field: field,
    status: true,
    statusError: "OK",
  };

  if ($form[field].value == "" || !exprReg.test($form[field].value)) {
    resultado.status = false;
    resultado.statusError = "Campo vacío o formato incorrecto";
  }

  return resultado;
}

function checkForm() {
  return fields.map((el) => el.checkFn(el.field));
}

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

function fillForm(url) {
  ajax({
    url,
    fExito: (json) => {
      fields.forEach((el) => ($form[el.field].value = json[el.field]));
      $enviar.dataset.id = json.id;
      $contactos
        .querySelectorAll("button")
        .forEach((el) => el.classList.add("off"));
      $vaciar.classList.add("off");
      $contactos.removeEventListener("click", procesarAcciones);
      $vaciar.classList.add("off");
      $vaciar.removeEventListener("click", clearAllContacts);
    },
    fError: (error) => console.log(error),
  });
}

function delContacto(id) {
  ajax({
    url: `${contactosUrl}/${id}`,
    method: "DELETE",
    fExito: (json) => {
      let indice = contactos.findIndex((contacto) => contacto.id == id);
      contactos.splice(indice, 1);
      renderContactos(contactos);
    },
    fError: (error) => console.log(error),
  });
}

function procesarAcciones(ev) {
  ev.preventDefault();
  let id = ev.target.dataset.id;
  if (id) {
    if (ev.target.classList.contains("delete-btn")) {
      delContacto(id);
    } else {
      fillForm(`${contactosUrl}/${id}`);
    }
  }
}

$contactos.addEventListener("click", procesarAcciones);

function clearAllContacts(ev) {
  ev.preventDefault;
  ajax({
    url: contactosUrl,
    fExito: (json) => {
      Promise.all(
        json.map((el) =>
          fetch(`${contactosUrl}/${el.id}`, { method: "DELETE" })
        )
      )
        .then((resps) =>
          Promise.all(
            resps.map((resp) => (resp.ok ? resp.json : Promise.reject(resp)))
          )
        )
        .then((jsons) => {
          contactos.splice(0, contactos.length);
          renderContactos(contactos);
        })
        .catch((errors) => console.log(errors));
    },
    fError: (error) => console.log(error),
  });
  Promise.all();
}

$vaciar.addEventListener("click", clearAllContacts);

function addContacto(contacto) {
  ajax({
    url: contactosUrl,
    method: "POST",
    fExito: (json) => {
      contactos.push(json);
      renderContactos(contactos);
    },
    fError: (error) => console.log(error),
    data: contacto,
  });
}

function updateContacto(id, contacto) {
  ajax({
    url: `${contactosUrl}/${id}`,
    method: "PUT",
    fExito: (json) => {
      let indice = contactos.findIndex((contacto) => contacto.id == id);
      contactos.splice(indice, 1, json);
      renderContactos(contactos);
    },
    fError: (error) => console.log(error),
    data: contacto,
  });
}

$enviar.addEventListener("click", (ev) => {
  ev.preventDefault();

  const contacto = {};
  fields.forEach((el) => (contacto[el.field] = $form[el.field].value));

  const statusErrors = checkForm();
  let error = statusErrors.find((el) => !el.status);
  if (error) {
    mostrarMensage("error", error.statusError);
  } else {
    let id = $enviar.dataset.id;
    if (id) {
      updateContacto(id, contacto);
    } else {
      addContacto(contacto);
    }
  }
});

function resetearCambios(){
  if ($enviar.dataset.id) {
    delete $enviar.dataset.id;
    $contactos
      .querySelectorAll("button")
      .forEach((el) => el.classList.remove("off"));
    $vaciar.classList.remove("off");
    $contactos.addEventListener("click", procesarAcciones);
    $vaciar.classList.remove("off");
    $vaciar.addEventListener("click", clearAllContacts);
  }
  $form.reset();
}

$cancelar.addEventListener("click", (ev) => {
  ev.preventDefault();
  resetearCambios();
});

function renderContactos(contactos) {
  sessionStorage.setItem("contactos", JSON.stringify(contactos));
  $contactos.innerHTML = contactos.reduce(
    (anterior, actual) =>
      anterior +
      `<div class="contacto-item">
      <div class="contacto-el">
        <span id="etiqueta">Nombre: </span>
        <span id="nombre-content">${actual.nombre}</span>
      </div>

      <div class="contacto-el">
        <span id="etiqueta">Direccion: </span>
        <span id="direccion-content">${actual.direccion}</span>
      </div>

      <div class="contacto-el">
        <span id="etiqueta">Teléfono: </span>
        <span id="telefono-content">${actual.telefono}</span>
      </div>

      <button type="button" class="change-btn" data-id="${actual.id}"><span><i class="fas fa-redo"></i></span> Modificar</button>
      <button type="button" class="delete-btn" data-id="${actual.id}"><span><i class="fas fa-trash"></i></span> Borrar</button>
    </div>`,
    ""
  );
  resetearCambios();
}

function getContactos(contactosUrl) {
  ajax({
    url: contactosUrl,
    method: "GET",
    fExito: (json) => {
      contactos.splice(0, contactos.length, ...json);
      sessionStorage.setItem("contactos", JSON.stringify(contactos));
      renderContactos(json);
    },
    fError: (error) => console.log(error),
  });
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  getContactos(contactosUrl);
});
