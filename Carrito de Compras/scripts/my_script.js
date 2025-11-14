const $d = document,
  $listaProductos = $d.querySelector("#lista-productos"),
  $carritoBody = $d.querySelector("#body-carrito"),
  $carritoFooter = $d.querySelector("#footer-carrito"),
  $tProducto = $d.querySelector("#template-producto").content;
  const $vaciar = $carritoFooter.querySelector("#vaciar-carrito");

const productos = [
    {
      precio: 500,
      id: 1,
      title: "Café",
      thumbnailUrl: "https://picsum.photos/id/0/600",
    },
    {
      precio: 300,
      id: 2,
      title: "Pizza",
      thumbnailUrl: "https://picsum.photos/id/10/600",
    },
    {
      precio: 100,
      id: 3,
      title: "Agua",
      thumbnailUrl: "https://picsum.photos/id/20/600",
    },
    {
      precio: 50,
      id: 4,
      title: "Sandía",
      thumbnailUrl: "https://picsum.photos/id/30/600",
    },
    {
      precio: 10,
      id: 5,
      title: "Mango",
      thumbnailUrl: "https://picsum.photos/id/40/600",
    },
    {
      precio: 150,
      id: 6,
      title: "Chela",
      thumbnailUrl: "https://picsum.photos/id/50/600",
    }];

const carrito = [
    // {
    //     id: 1,
    //     productoId: 1,
    //     cantidad: 0,
    // }
]

function renderProductos(productos) {
  productos.forEach((producto) => {
    const $clon = $tProducto.cloneNode(true);

    $clon.querySelector(".card-title").textContent = producto.title;
    $clon.querySelector("img").src = producto.thumbnailUrl;
    $clon.querySelector(".card-text").textContent = producto.precio;
    // $clon.querySelector("a").setAttribute("data-id", producto.id);
    $clon.querySelector("a").dataset.id = producto.id;
    $listaProductos.appendChild($clon);
  });
}

function renderProductosMap(productos) {
  $listaProductos.innerHTML = productos.map(
    (producto) => `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
                <div class="card">
                    <img src="${producto.thumbnailUrl}" class="card-img-top" alt="item-producto">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.precio}</p>
                        <a href="#" class="btn btn-dark" data-id="${producto.id}">Comprar</a>
                    </div>
                </div>
            </div>`
  ).join('');
}

function renderProductosReduce(productos) {
    $listaProductos.innerHTML = productos.reduce((anterior, actual) => anterior +  
        `<div class="col-12 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center">
            <div class="card">
                <img src="${actual.thumbnailUrl}" class="card-img-top" alt="item-producto">
                <div class="card-body">
                    <h5 class="card-title">${actual.title}</h5>
                    <p class="card-text">${actual.precio}</p>
                    <a href="#" class="btn btn-dark" data-id="${actual.id}">Comprar</a>
                </div>
            </div>
        </div>`, '');
}

/*function renderCarrito(productos, carrito){
    $carritoBody.innerHTML = carrito.reduce((anterior, actual, i) => {

        let producto = productos.find(el => el.id == actual.productoId);
        let totalProducto = actual.cantidad * producto.precio;

        return anterior + `<tr>
        <td>${i+1}</td>
        <td>${producto.title}</td>
        <td>${actual.cantidad}</td>
        <td>
            <button class="btn btn-info btn-sm" data-id="${producto.id}">
                +
            </button>
            <button class="btn btn-danger btn-sm" data-id="${producto.id}">
                -
            </button>
        </td>
        <td>${totalProducto}</td>
      </tr>`
    }, '');
}*/

function renderCarrito(productos, carrito){
    let totalCarrito = 0;
    let nProductos = 0;
    $carritoBody.innerHTML = carrito.reduce((anterior, actual, i) => {
      let producto = productos.find(el=>el.id==actual.productoId)
      let totalProducto=actual.cantidad*producto.precio
      totalCarrito+=totalProducto
      nProductos+=actual.cantidad
  
      return anterior+`<tr>
        <td>${i+1}</td>
        <td>${producto.title}</td>
        <td>${actual.cantidad}</td>
        <td>
            <button class="btn btn-info btn-sm" data-id="${producto.id}">
                +
            </button>
            <button class="btn btn-danger btn-sm" data-id="${producto.id}">
                -
            </button>
        </td>
        <td>${totalProducto}</td>
      </tr>`
    }, '');
  
    renderCarritoFooter(nProductos, totalCarrito);
  }
  
  $carritoFooter.addEventListener("click", ev=>{
    ev.preventDefault();
    
    const $vaciar = $carritoFooter.querySelector("#vaciar-carrito");
    if ($vaciar){
        carrito.splice(0, carrito.length);
    }
    renderCarrito(productos, carrito);}
  )
  
  function renderCarritoFooter(nProductos, total){
    $carritoFooter.innerHTML=nProductos?
    `<th scope="row" colspan="2">Total productos</th>
    <td>${nProductos}</td>
    <td>
    <button class="btn btn-danger btn-sm" id="vaciar-carrito">Vaciar carrito</button>
    </td>
    <td class="font-weight-bold"><span>${total}</span>&euro;</td>`
    :`<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`;
  }

$listaProductos.addEventListener("click", ev => {
    ev.preventDefault();

    let productoId = ev.target.dataset.id;
    if(productoId)  {
        // console.log(`Comprando producto ${productoId}`);
        let producto = carrito.find(el => el.productoId == productoId);

        if(!producto){
            carrito.push({
                productoId,
                cantidad:1
            });
        } else{
            producto.cantidad++;
        }

        renderCarrito(productos, carrito);
    }
});

$carritoBody.addEventListener("click", ev => {
    ev.preventDefault();

    let productoId = ev.target.dataset.id;
    if(productoId) {
        let producto = carrito.find(el => el.productoId == productoId);
        let indice = carrito.findIndex(el => el.productoId == productoId);
        // if (ev.target.textContent.trim() == '+'){
        //     producto.cantidad++;
        // } else if(ev.target.textContent.trim() == '-'){
        //     producto.cantidad--;
        //     if(producto.cantidad <= 0){
        //         carrito.splice(indice, 1);
        //     }
        // }

        if (ev.target.classList.contains('btn-info')){
            producto.cantidad++;
        } else if(ev.target.classList.contains('btn-danger')){
            producto.cantidad--;
            if(producto.cantidad <= 0){
              carrito.splice(indice, 1);
            }
        }

        renderCarrito(productos, carrito);
    }
});

$d.addEventListener("DOMContentLoaded", (ev) => {
    // renderProductos(productos);
    // renderProductosMap(productos);
    renderProductosReduce(productos);
});

