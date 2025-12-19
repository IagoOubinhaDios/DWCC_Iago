const url = "http://localhost:3000";
const productos = [],
  carrito = [];

const $d = document,
  $productos = $d.querySelector(".productos"),
  $productoscarrito = $d.querySelector(".card-items"),
  $cantidadProductosCarrito = $d.querySelector(".count-product"),
  $totalCarrito = $d.querySelector("#productos-id>h2"),
  $carrito = $d.querySelector(".cart-productos"),
  $showCarrito = $d.querySelector(".cart"),
  $cerrarCarrito = $d.querySelector(".close-btn");

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
      statatus: resp.status,
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

async function addProductoCarrito(id) {
  const resp = await ajax({
    url: `${url}/carritos`,
    method: "POST",
    data: {
      productoId: id,
      cantidad: 1,
    },
  });
  if (resp.ok) {
    carrito.push(resp.data);
    renderCarrito(productos, carrito);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function updateProductoCarrito(id, productoCarrito) {
  const resp = await ajax({
    url: `${url}/carritos/${id}`,
    method: "PATCH",
    data: { cantidad: ++productoCarrito.cantidad },
  });

  if (resp.ok) {
    let indice = carrito.findIndex((el) => el.id == id);
    carrito.splice(indice, 1, resp.data);
    renderCarrito(productos, carrito);
  } else {
    alert(`Error al actualizar: ${resp.statusText}`);
  }
}

$productos.addEventListener("click", async (ev) => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  if (id) {
    let indice = carrito.findIndex((el) => el.productoId == id);
    if (indice == -1) {
      await addProductoCarrito(id);
    } else {
      await updateProductoCarrito(carrito[indice].id, carrito[indice]);
    }
  }
});

$showCarrito.addEventListener(
  "click",
  (ev) => ($carrito.style.display = "block")
);

$cerrarCarrito.addEventListener(
  "click",
  (ev) => ($carrito.style.display = "none")
);

async function delProducto(id) {
  const resp = await ajax({
    url: `${url}/carritos/${id}`,
    method: "DELETE",
  });

  if (resp.ok) {
    let indice = carrito.findIndex((el) => el.id == id);
    carrito.splice(indice, 1);
    renderCarrito(productos, carrito);
  } else {
    alert(`Error al borrar: ${resp.statusText}`);
  }
}

$carrito.addEventListener("click", async (ev) => {
  ev.preventDefault();

  let id = ev.target.dataset.id;
  if (id) {
    await delProducto(id);
  }
});

function renderProductos(productos) {
  $productos.innerHTML = productos.reduce(
    (anterior, actual) =>
      anterior +
      ` <div class="producto">
              <div>
                <img src="${actual.img}" alt="#" />
                <p>
                  <span>${actual.precio}€</span>
                </p>
              </div>
              <p class="title">${actual.nombre}</p>
              <a href="#" class="btn-add-cart" data-id=${actual.id}> Comprar!</a>
          </div>`,
    ""
  );
}

function renderCarrito(productos, carrito) {
  $cantidadProductosCarrito.textContent = carrito.length;
  let totalCarrito = 0;
  $productoscarrito.innerHTML = carrito.reduce((anterior, actual) => {
    let producto = productos.find((el) => el.id == parseInt(actual.productoId));
    let totalProducto = actual.cantidad * producto.precio;
    totalCarrito += totalProducto;
    return (
      anterior +
      ` <div class="item">
        <img src="${producto.img}" alt="#" />
        <div class="item-content">
          <h5>${producto.nombre}</h5>
          <h5 class="cart-price">${totalProducto.toFixed(2)}€</h5>
          <h6>
            Cantidad: <span>${actual.cantidad}</span>
          </h6>
        </div>
        <span class="delete-product" data-id="${actual.id}">X</span>
      </div>`
    );
  }, "");
  $totalCarrito.textContent = "Total: " + totalCarrito.toFixed(2) + "€";
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
});
