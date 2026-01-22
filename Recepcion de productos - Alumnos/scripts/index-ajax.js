const url = "http://localhost:3000";
const productos = [],
  categorias = [],
  condiciones = [];

const $d = document,
  $productos = $d.querySelector("#tableBody"),
  $categorias = $d.querySelector("#category"),
  $condiciones = $d.querySelector("#condition"),
  $nombre = $d.querySelector("#name"),
  $precio = $d.querySelector("#price"),
  $btnAdd = $d.querySelector("#btnAdd"),
  $btnLimpiar = $d.querySelector("#btnClear");

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

async function delProducto(id) {
  const resp = await ajax({
    url: `${url}/products/${id}`,
    method: "DELETE",
  });

  if (resp.ok) {
    let indice = productos.findIndex((el) => el.id == id);
    productos.splice(indice, 1);
    renderProductos(productos, categorias, condiciones);
  } else {
    alert(`Error al borrar: ${resp.statusText}`);
  }
}

function fillForm(id) {
  let producto = productos.find((el) => el.id == id);
  if (producto) {
    $nombre.value = producto.name;
    $precio.value = producto.price;
    modificarSelected($categorias, producto.categoryId);
    modificarSelected($condiciones, producto.conditionId);
    $productos.removeEventListener("click", procesarAcciones);
    $btnAdd.textContent = "Modificar Producto";
  }
}

async function procesarAcciones(ev){
  let id = ev.target.dataset.id;

  if (id){
    if(ev.target.classList.contains("fa-trash")){
      await delProducto(id);
    } else {
      fillForm(id);
    }
  }
}

$productos.addEventListener("click", procesarAcciones)

function modificarSelected($opciones, value){
  let opciones = $opciones.querySelectorAll("option");

  opciones.forEach((opt) => {
    opt.removeAttribute("selected");
  });

  opciones.forEach((opt) => {
    if(opt.value == value) {
      opt.setAttribute("selected", "");
    }
  });
}

$categorias.addEventListener("click", (ev) => {
  ev.preventDefault();

  modificarSelected($categorias, ev.target.value);
});

$condiciones.addEventListener("click", (ev) => {
  ev.preventDefault();

  modificarSelected($condiciones, ev.target.value);
});

async function addProducto(nombre, precio, idCategoria, idCondicion) {
  const resp = await ajax({
    url: `${url}/products`,
    method: "POST",
    data: {
      name: nombre,
      price: precio,
      categoryId: idCategoria,
      conditionId: idCondicion,
    },
  });

  if (resp.ok) {
    productos.push(resp.data);
    renderProductos(productos, categorias, condiciones);
    $nombre.value = "";
    $precio.value = "";
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function modProducto(nombre, precio, idCategoria, idCondicion) {
  const resp = await ajax({
    url: `${url}/products`,
    method: "PUT",
    data: {
      name: nombre,
      price: precio,
      categoryId: idCategoria,
      conditionId: idCondicion,
    },
  });

  if (resp.ok) {
    let indice = productos.findIndex((prod) => prod.id == id);
    productos.push(resp.data);
    renderProductos(productos, categorias, condiciones);
    $nombre.value = "";
    $precio.value = "";
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

$btnAdd.addEventListener("click", async (ev) => {
  let producto = productos.find((pro) => pro.name == $nombre.textContent);

  if (!producto) {
    let idCategoria = -1;
    let idCondicion = -1;
    $categorias.querySelectorAll("option").forEach((cat) => {
      if(cat.getAttribute("selected") != null){
        idCategoria = cat.value;
      }
    });
    $condiciones.querySelectorAll("option").forEach((con) => {
      if(con.getAttribute("selected") != null){
        idCondicion = con.value;
      }
    });
    if (idCategoria != -1 && idCondicion != -1){
      $btnAdd.textContent == "Añadir Producto" 
      ? await addProducto($nombre.value, $precio.value, idCategoria, idCondicion)
      : await modProducto($nombre.value, $precio.value, idCategoria, idCondicion);
    }
  }
});

$btnLimpiar.addEventListener("click", (ev) => {
  $nombre.value = "";
  $precio.value = "";
});

function renderProductos(productos, categorias, condiciones) {
  $productos.innerHTML = productos.reduce(
    (anterior, actual, i) =>
      anterior +
      `<tr>
        <td>${i + 1}</td>
        <td>${actual.name}</td>
        <td>${actual.price}</td>
        <td>${
          categorias.find((categoria) => categoria.id == actual.categoryId).name
        }</td>
        <td class="${
          condiciones.find((condicion) => condicion.id == actual.conditionId)
            .name == "Excelente"
            ? "text-white bg-success"
            : condiciones.find(
                (condicion) => condicion.id == actual.conditionId
              ).name == "Bueno"
            ? "text-white bg-warning"
            : "text-white bg-danger"
        }">${
        condiciones.find((condicion) => condicion.id == actual.conditionId).name
      }</td>
        <td>
            <i title "Actualizar" class="fa-solid me-2 text-warning fa-pen" data-id="${
              actual.id
            }"></i>
            <i title "Eliminar" class="fa-solid text-danger fa-trash" data-id="${
              actual.id
            }"></i>
        </td>
    </tr>`,
    ""
  );
}

function renderCategorias(categorias) {
  $categorias.innerHTML = categorias.reduce(
    (anterior, actual) =>
      anterior +
      `<option value="${actual.id}" ${actual.id == 1 ? `selected` : ``}>${
        actual.name
      }</option>`,
    ""
  );
}

function renderCondiciones(condiciones) {
  $condiciones.innerHTML = condiciones.reduce(
    (anterior, actual) =>
      anterior +
      `<option class=${
        actual.name == "Excelente"
          ? "bg-success text-white"
          : actual.name == "Bueno"
          ? "bg-warning text-white"
          : "bg-danger text-white"
      } value="${actual.id}" ${actual.id == 1 ? `selected` : ``}>
        ${actual.name}
    </option>`,
    ""
  );
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  Promise.all([
    fetch(`${url}/products`),
    fetch(`${url}/categories`),
    fetch(`${url}/conditions`),
  ])
    .then((resps) =>
      Promise.all(
        resps.map((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
      )
    )
    .then((jsons) => {
      productos.splice(0, productos.length, ...jsons[0]);
      categorias.splice(0, categorias.length, ...jsons[1]);
      condiciones.splice(0, condiciones.length, ...jsons[2]);
      renderCategorias(categorias);
      renderCondiciones(condiciones);
      renderProductos(productos, categorias, condiciones);
    })
    .catch((errors) => {
      console.log(errors);
    });
});
