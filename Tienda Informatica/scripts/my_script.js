const productos = [
  {
    id: 1,
    img: "./images/products/keyboard-1.jpg",
    nombre: "Tempest Cataclysm Combo 3 En 1 Gaming Teclado",
    precio: 20,
  },
  {
    id: 2,
    img: "./images/products/keyboard-2.jpg",
    nombre: "Newskill Suiko Ivory Teclado Mecánico Gaming Full RGB",
    precio: 35,
  },
  {
    id: 3,
    img: "./images/products/keyboard-3.jpg",
    nombre: "Aukey KM-G16 Teclado Mecánico Gaming Retroiluminado",
    precio: 15.5,
  },
  {
    id: 4,
    img: "./images/products/keyboard-4.jpg",
    nombre: "Razer Huntsman Elite Teclado Mecánico Gaming RGB",
    precio: 20.2,
  },
  {
    id: 5,
    img: "./images/products/keyboard-5.jpg",
    nombre: "Trust GXT 856 Torac Teclado Metálico Gaming RGB",
    precio: 19,
  },
  {
    id: 6,
    img: "./images/products/keyboard-1.jpg",
    nombre: "MSI Vigor GK30 Teclado Gaming RGB",
    precio: 45,
  },
  {
    id: 7,
    img: "./images/products/keyboard-2.jpg",
    nombre: "Genesis Thor 300 RGB Teclado Mecánico Gaming RGB Switch Rojo",
    precio: 23.99,
  },
  {
    id: 8,
    img: "./images/products/keyboard-3.jpg",
    nombre: "Mars Gaming MKXTKL Teclado Mecánico Gaming RGB",
    precio: 50,
  },
  {
    id: 9,
    img: "./images/products/keyboard-4.jpg",
    nombre: "Trust GXT 881 Odyss Teclado Gaming Semi-Mecánico RGB",
    precio: 16,
  },
  {
    id: 10,
    img: "./images/products/keyboard-5.jpg",
    nombre: "Krom Krusher Teclado Gaming Híbrido RGB + Ratón",
    precio: 17.5,
  },
  {
    id: 11,
    img: "./images/products/keyboard-1.jpg",
    nombre: "Corsair K55 RGB PRO XT Teclado Gaming Retroiluminado Negro",
    precio: 45,
  },
];

const carrito = [
  /*{
    productoId: "4",
    cantidad: 2,
    id: 1
  }*/
];

const $d = document,
  $productos = $d.querySelector(".productos"),
  $productoscarrito = $d.querySelector(".card-items"),
  $cantidadProductosCarrito = $d.querySelector(".count-product"),
  $totalCarrito = $d.querySelector("#productos-id>h2"),
  $borrar = $d.querySelector(".");

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
    let totalProducto = actual.cantidad*producto.precio;
    totalCarrito+=totalProducto;
    return (
      anterior +
      ` <div class="item">
      <img src="${producto.img}" alt="#" />
      <div class="item-content">
        <h5>${producto.nombre}</h5>
        <h5 class="cart-price">${totalProducto}</h5>€
        <h6>
          Cantidad: <span>${actual.cantidad}</span>
        </h6>
      </div>
      <span class="delete-product" data-id="${actual.id}">X</span>
    </div>`
    );
  }, "");

  renderTotal(totalCarrito);
}

function renderTotal(totalCarrito){
  $totalCarrito.textContent = totalCarrito;
}

$productos.addEventListener("click", (ev) => {
  let id = ev.target.dataset.id;
  if (id) {
    let producto = carrito.find((el) => el.productoId == id);
    let indice = carrito.findIndex((el) => el.productoId == id);

    if (indice == -1) {
      carrito.push({ productoId: id, cantidad: 1, id: carrito.length + 1 });
    } else {
      producto.cantidad++;
    }
  }

  renderCarrito(productos, carrito);
});

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderCarrito(productos, carrito);
  renderProductos(productos);
});
