const $d = document,
  $productos = $d.querySelector("#lista-productos");

const url = "http://localhost/3000";
const productos = [],
      carrito = [];

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
        productos=await ajax({url});
        renderProductos(productos);
    } catch(error) {
        console.log(error);
    }
    console.log(productos);
//   ajax({
//     url: url,
//     fSuccess: (json) => {
//     //   console.log(json);
//       renderProductos(json);
//     },
//     fError: (errors) => console.log(errors),
//   });
}

$d.addEventListener("DOMContentLoaded", ev => {
    getProductos(`${url}/productos`)
});
