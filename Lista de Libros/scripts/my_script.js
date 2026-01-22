const $d = document,
  $libros = $d.querySelector("tbody"),
  $form = $d.querySelector("#libro-form"),
  $tlibro = $d.querySelector("#template-libro").textContent,
  $submit = $d.querySelector("input[type='submit']");
$submit.value = "Añadir";

const libros = [];
const url = "http://localhost:3000";

const fields = [
  {
    field: "titulo",
    checkFn: checkTitulo,
  },
  {
    field: "autor",
    checkFn: checkAutor,
  },
  {
    field: "isbn",
    checkFn: checkIsbn,
  },
];

function checkTitulo(field) {
  let value = $form[field].value;
  let resultado = null;
  if (value == "") {
    resultado = {
      field,
      status: false,
      statusText: "El campo está vacío",
    };
  }
  if (!resultado) {
    resultado = { field, status: true, statusText: "El campo es correcto" };
  }
  return resultado;
}

function checkAutor(field) {
  let value = $form[field].value;
  let resultado = null;
  if (value == "") {
    resultado = {
      field,
      status: false,
      statusText: "El campo está vacío",
    };
  }
  if (!resultado) {
    resultado = { field, status: true, statusText: "El campo es correcto" };
  }
  return resultado;
}

function checkIsbn(field) {
  let value = $form[field].value;
  let resultado = null;
  if (value == "") {
    resultado = {
      field,
      status: false,
      statusText: "El campo está vacío",
    };
  }
  let exprReg = /^\d{8,}$/gi;
  if (!exprReg.test(value)) {
    resultado = {
      field,
      status: false,
      statusText: "Números!",
    };
  }
  if (!resultado) {
    resultado = { field, status: true, statusText: "El campo es correcto" };
  }
  return resultado;
}

const checkForm = (libro, add = false) => {
  if (add) {
    const statusErrors = fields.map((el) => el.checkFn(el.field));
    if (statusErrors.filter((el) => !el.status).length) {
      return false;
    }
    if (libros.find((el) => el.isbn == libro.isbn)) {
      return false;
    }

    return true;
  } else {
    const statusErrors = fields.map((el) => el.checkFn(el.field));
    if (statusErrors.filter((el) => !el.status).length) {
      return false;
    }

    return true;
  }
};

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

function fillForm(id) {
  let libro = libros.find((libro) => libro.id == id);

  if (libro) {
    fields.forEach((el) => ($form[el.field].value = libro[el.field]));
    $form["isbn"].disabled = true;
    $submit.dataset.id = libro.id;
    $submit.value = "Actualizar";

    $libros.querySelectorAll("i").forEach((i) => i.classList.add("off"));

    $libros.removeEventListener("click", procesaLibro);
  }
}

function delLibro(id) {
  ajax({
    url: `${url}/libros/${id}`,
    method: "DELETE",
    fExito: (json) => {
      let indice = libros.findIndex((el) => el.id == id);
      libros.splice(indice, 1);
      renderLibros(libros);
    },
    fError: (error) => console.log(error),
  });
}

function procesaLibro(ev) {
  let id = ev.target.dataset.id;

  if (id) {
    if (ev.target.classList.contains("fa-check")) {
      fillForm(id);
    } else {
      delLibro(id);
    }
  }
}

$libros.addEventListener("click", procesaLibro);

function addLibro(data) {
  ajax({
    url: `${url}/libros`,
    method: "POST",
    fExito: (json) => {
      libros.push(json);
      $form.reset();
      renderLibros(libros);
    },
    fError: (error) => console.log(error),
    data: {
      autor: data.autor,
      titulo: data.titulo,
      isbn: data.isbn,
    },
  });
}

function modLibro(id, data) {
  ajax({
    url: `${url}/libros/${id}`,
    method: "PUT",
    fExito: (json) => {
      let indice = json.findIndex((el) => el.id == id);
      libros.splice(indice, 1, json);
      $submit.value = "Añadir";
      $form["isbn"].disabled = false;
      delete $submit.dataset.id;
      $form.reset();
      $libros.addEventListener("click", procesaLibro);
      renderLibros(libros);
    },
    fError: (error) => console.log(error),
    data: {
      autor: data.autor,
      titulo: data.titulo,
      isbn: data.isbn,
    },
  });
}

$form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let libro = fields.reduce((anterior, actual) => {
    anterior[actual.field] = $form[actual.field].value;
    return anterior;
  }, {});

  let id = $submit.dataset.id;
  if (id) {
    let libro = libros.find((libro) => libro.id == id);
    libro = { ...libroActual };
    if (checkForm(libro, false)) {
      modLibro(id, libro);
    } else {
      alert("Error");
    }
  } else {
    if (checkForm(libro)) {
      addLibro(libro);
    } else {
      alert("Error");
    }
  }
});

function renderLibros(libros) {
  sessionStorage.setItem("libros", JSON.stringify(libros));
  $libros.innerHTML = libros.reduce(
    (anterior, actual) =>
      anterior +
      `<tr>
        <td>${actual.titulo}</td>
        <td>${actual.autor}</td>
        <td>${actual.isbn}</td>
        <td>
          <i class="fa fa-check" aria-hidden="true" data-id="${actual.id}"></i>
          <i class="fa fa-trash" aria-hidden="true" data-id="${actual.id}"></i>
        </td>
      </tr>`,
    ""
  );
}

function getLibros(url) {
  ajax({
    url: `${url}/libros`,
    method: "GET",
    fExito: (json) => {
      libros.splice(0, libros.length, ...json);
      renderLibros(json);
    },
    fError: (error) => console.log(error),
  });
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  getLibros(url);
});
