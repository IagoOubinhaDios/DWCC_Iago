const $d = document,
  $libros = $d.querySelector("tbody"),
  $form = $d.querySelector("#libro-form"),
  $tlibro = $d.querySelector("#template-libro").textContent,
  $submit = $d.querySelector("input[type='submit']");
$submit.value = "Añadir";

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

const libros = [
  {
    id: 1,
    titulo: "El Quijote",
    autor: "Miguel de Cervantes",
    isbn: "11111119",
  },
];

function renderLibros(libros) {
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

function renderLibros2(libros) {
  $libros.innerHTML = libros
    .map(
      (el) =>
        `<tr>
        <td>${el.titulo}</td>
        <td>${el.autor}</td>
        <td>${el.isbn}</td>
        <td>
          <i class="fa fa-check" aria-hidden="true" data-id="${el.id}"></i>
          <i class="fa fa-trash" aria-hidden="true" data-id="${el.id}"></i>
        </td>
      </tr>`
    )
    .join("");
}

function renderLibros3(libros) {
  const fragmento = $d.createDocumentFragment();

  $libros.innerHTML = "";
  libros.forEach((el) => {
    const $clon = $tlibro.cloneNode(true);
    const [$titulo, $autor, $isbn, $acciones] = $clon.querySelector("td");

    $titulo.textContent = el.titulo;
    $autor.textContent = el.autor;
    $isbn.textContent = el.isbn;

    $acciones.querySelectorAll("i").forEach((i) => (i.dataset.id = el.id));

    fragmento.appendChild($clon);
  });
  $libros.appendChild(fragmento);
}

function renderLibros4(libros) {
  const fragmento = $d.createDocumentFragment();

  libros.forEach((libro) => {
    const $tr = $d.createElement("tr");
    const $titulo = $d.createElement("td");
    const $autor = $d.createElement("td");
    const $isbn = $d.createElement("td");
    const $acciones = $d.createElement("td");

    $titulo.textContent = libro.titulo;
    $autor.textContent = libro.autor;
    $isbn.textContent = libro.isbn;

    const $i1 = $d.createElement("i");
    $i1.classList.add("fa", "fa-check");
    const $i2 = $d.createElement("i");
    $i2.classList.add("fa", "fa-trash");
    $i1.setAttribute("aria-hidden", "true");
    $i1.dataset = libro.id;
    $i2.dataset = libro.id;
    $i2.setAttribute("aria-hidden", "true");
    $acciones.append($i1, $i2);
    $tr.append($titulo, $autor, $isbn, $acciones);

    fragmento.appendChild($tr);
  });
  $libros.appendChild(fragmento);
}

function fillForm(libro) {
  fields.forEach((el) => ($form[el.field].value = libro[el.field]));
  $form["isbn"].disabled = true;
  $submit.dataset.id = libro.id;
  $submit.value = "Actualizar";

  $libros.querySelectorAll("i").forEach(i=>i.classList.add("off"));

  $libros.removeEventListener("click", procesaLibro);
}

function procesaLibro (ev) {
  let id = ev.target.dataset.id;

  if (id) {
    if (ev.target.classList.contains("fa-check")) {
      let libro = libros.find((el) => el.id == id);
      fillForm(libro);
    } else {
      let indice = libros.findIndex((el) => el.id == id);
      libros.splice(indice, 1);add
      renderLibros(libros);
    }
  }
}

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
  if (value.length < 8) {
    resultado = {
      field,
      status: false,
      statusText: "El campo debe medir más de 8 caracteres",
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
  if (value.length < 8) {
    resultado = {
      field,
      status: false,
      statusText: "El campo debe medir más de 8 caracteres",
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
  if (value != "" && value.length < 8) {
    resultado = {
      field,
      status: false,
      statusText: "El campo debe medir más de 8 caracteres",
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
    // const statusErrors = fields.reduce((anterior, actual) => {
    //   let status = actual.checkFn($form[actual.field]);
    //   let statusText = status
    //     ? "El campo es correcto"
    //     : "El campo es debe rellenarse";
    //   anterior.push({
    //     field: actual.field,
    //     status,
    //     statusText,
    //   });
    //   return anterior;
    // }, []);
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

$form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let id = $submit.dataset.id;

  if (id) {
    let libroActual = fields.reduce((anterior, actual) => {
      anterior[actual.field] = $form[actual.field].value;
      return anterior;
    }, {});
    let libro = libros.find((libro) => libro.id == id);
    libro = { id: libro, ...libroActual };
    if (checkForm(libro, false)) {
      let indice = libros.findIndex((libro) => libro.id == id);
      libros.splice(indice, 1);
      libros.push(libro);
      $submit.value = "Añadir";
      $form["isbn"].disabled = false;
      delete $submit.dataset.id; //Borrar atributo de un objeto
      renderLibros(libros);
      $form.reset();
      $libros.addEventListener("click", procesaLibro);
    } else {
      alert("Error");
    }
  } else {
    let libro = fields.reduce((anterior, actual) => {
      anterior[actual.field] = $form[actual.field].value;
      return anterior;
    }, {});
    libro.id = Math.max(...libros.map((libro) => libro.id)) + 1; //Obtener id más alto
    if (checkForm(libro)) {
      libros.push(libro);
      renderLibros(libros);
      $form.reset();
    } else {
      alert("Error");
    }
  }
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderLibros(libros);
});
