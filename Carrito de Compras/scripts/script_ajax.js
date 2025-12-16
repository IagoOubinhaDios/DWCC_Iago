const $d = document,
  $productos = $d.querySelector("#lista-productos"),
  $carrito = $d.querySelector("#body-carrito"),
  $carritoFooter = $d.querySelector("#footer-carrito");

const url = "http://localhost:3000";
const productos = [], carrito = [];

async function ajax(options) {
  const { url, method, data } = options;

  let resp = await fetch(url, {
    method: method || "GET",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    // throw new Error()
    throw {
      status: resp.status,
      statusText: resp.statusText || "Ocurrió un error",
    };
  }

  let json = await resp.json();
  return json;
}

async function addProductoCarrito(id) {
  const productoCarrito = await ajax({
    url: `${url}/carritos`,
    method: "POST",
    data:{
      productoId: id,
      cantidad: 1
    }
  });

  carrito.push(productoCarrito);
  renderCarrito(productos, carrito);
}

$productos.addEventListener("click", async ev => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  if (id) {
    const productoCarrito = carrito.find(el => el.productoId == id);
    if (productoCarrito) {
      // Incrementar
      await addCantidad(productoCarrito.id);
    } else {
      // Añadir
      await addProductoCarrito(id);
    }
  }
})

async function addCantidad(id) {
  let cantidad = ++carrito.find((el) => el.id == id).cantidad;
  const productoCarrito = await ajax({
    url: `${url}/carritos/${id}`,
    method: "PATCH",
    data: { cantidad }
  });
  renderCarrito(productos, carrito);
}

async function delCantidad(id) {
  let cantidad = --carrito.find((el) => el.id == id).cantidad;
  if (cantidad == 0) {
    await ajax({
      url: `${url}/carritos/${id}`,
      method: "DELETE"
    });
    let indice = carrito.findIndex(el => el.id == id);
    carrito.splice(indice, 1);
  } else {
    await ajax({
      url: `${url}/carritos/${id}`,
      method: "PATCH",
      data: { cantidad }
    });
  }
  renderCarrito(productos, carrito);
}

$carrito.addEventListener("click", async (ev) => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  if (id) {
    if (ev.target.classList.contains("btn-info")) {
      await addCantidad(id);
    } else if (ev.target.classList.contains("btn-danger")) {
      await delCantidad(id);
    }
    renderCarrito(productos, carrito);
  }
});

function renderProductos(productos) {
  $productos.innerHTML = productos.reduce(
    (anterior, actual) =>
      anterior +
      `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
            <div class="card">
                <img src="${actual.thumbnailUrl}" class="card-img-top" alt="item-producto">
                <div class="card-body">
                    <h5 class="card-title">${actual.title}</h5>
                    <p class="card-text">${actual.precio}</p>
                    <a href="#" class="btn btn-dark" data-id="${actual.id}">Comprar</a>
                </div>
            </div>
        </div>`,
    ""
  );
}

async function getProductos(url) {
  try {
    productos = await ajax({ url });
  } catch (error) {
    console.log(error);
  }
  renderProductos(productos);
}

function renderCarrito(productos, carrito) {
  let totalCarrito = 0, nProductos = 0;
  $carrito.innerHTML = carrito.reduce((anterior, actual, i) => {
    let producto = productos.find((el) => el.id == actual.productoId);
    let totalProducto = actual.cantidad * producto.precio;
    totalCarrito += totalProducto;
    nProductos += actual.cantidad;

    return (
      anterior +
      `
            <tr>
              <td>${i+1}</td>
              <td>${producto.title}</td>
              <td>${actual.cantidad}</td>
              <td>
                <button class="btn btn-info btn-sm" data-id="${actual.id}">
                  +
                </button>
                <button class="btn btn-danger btn-sm" data-id="${actual.id}">
                  -
                </button>
              <td>${totalProducto}</td>
            </tr>`
    );
  }, "");

  renderCarritoFooter(nProductos, totalCarrito);
}

function renderCarritoFooter(nProductos, total) {
  $carritoFooter.innerHTML = nProductos
    ? `<th scope="row" colspan="2">Total productos</th>
  <td>${nProductos}</td>
  <td>
  <button class="btn btn-danger btn-sm" id="vaciar-carrito">Vaciar carrito</button>
  </td>
  <td class="font-weight-bold"><span>${total}</span>&euro;</td>`
    : `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  Promise.all([fetch(`${url}/productos`), fetch(`${url}/carritos`)])
    .then((resps) =>
      Promise.all(
        resps.map((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
      )
    )
    .then((jsons) => {
      productos.splice(0, productos.length, ...jsons[0]);
      carrito.splice(0, carrito.length, ...jsons[1]);
      renderProductos(productos);
      renderCarrito(productos, carrito);
    })
    .catch((errors) => {
      console.log(errors);
    });
  // getProductos(`${url}/productos`);
});
