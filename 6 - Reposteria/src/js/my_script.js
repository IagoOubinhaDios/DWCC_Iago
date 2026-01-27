const url = "http://localhost:3000";
const postres = [],
  cestas = [];

const $d = document,
  $postres = $d.querySelector(".cards"),
  $cestas = $d.querySelector(".carrito"),
  $dialog = $d.querySelector(".carrito__productos");

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

async function addPostre(postre) {
  const resp = await ajax({
    url: `${url}/cestas`,
    method: "POST",
    data: {
      cantidad: 1,
      postreId: postre.id,
    },
  });
  if (resp.ok) {
    cestas.push(resp.data);
    renderPostres(postres, cestas);
    renderCesta(cestas);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function delPostre(id) {
  const resp = await ajax({
    url: `${url}/cestas/${id}`,
    method: "DELETE",
  });

  if (resp.ok) {
    let indice = cestas.findIndex((el) => el.id == id);
    cestas.splice(indice, 1);
    renderPostres(postres, cestas);
    renderCesta(cestas)
  } else {
    alert(`Error al borrar: ${resp.statusText}`);
  }
}

async function sumPostre(cesta) {
  const resp = await ajax({
    url: `${url}/cestas/${cesta.id}`,
    method: "PATCH",
    data: { cantidad: ++cesta.cantidad },
  });
  if (resp.ok) {
    let indice = cestas.findIndex((el) => el.id == cesta.id);
    cestas.splice(indice, 1, resp.data);
    renderPostres(postres, cestas);
    renderCesta(cestas);
  } else {
    alert(`Error al actualizar: ${resp.statusText}`);
  }
}

async function resPostre(cesta) {
  const resp = await ajax({
    url: `${url}/cestas/${cesta.id}`,
    method: "PATCH",
    data: { cantidad: --cesta.cantidad },
  });
  if (resp.ok) {
    if (cesta.cantidad <= 0) {
      await delPostre(cesta.id);
    } else {
      let indice = cestas.findIndex((el) => el.id == cesta.id);
      cestas.splice(indice, 1, resp.data);
      renderPostres(postres, cestas);
      renderCesta(cestas);
    }
  } else {
    alert(`Error al actualizar: ${resp.statusText}`);
  }
}

async function delCesta() {
  const resp = ajax({
    url: `${url}/cestas`,
    method: "DELETE",
  });

  if (resp.ok) {
    cestas.splice(0, cestas.length);
    renderPostres(postres, cestas);
    renderCesta(cestas);
  }
}

$postres.addEventListener("click", async (ev) => {
  let postre = postres.find((el) => el.id === ev.target.dataset.id);
  if (postre) {
    let cesta = cestas.find((el) => el.postreId === ev.target.dataset.id);
    if (ev.target.textContent == "+") {
      await sumPostre(cesta);
    } else if (ev.target.textContent == "-") {
      await resPostre(cesta);
    } else if (ev.target.classList.contains("card__add")) {
      await addPostre(postre);
    }
  }
});

async function borrarPostre(ev) {
  ev.preventDefault();

  let cesta = cestas.find((el) => (el.id = ev.target.dataset.id));
  if (cesta) {
    await delPostre(cesta.id);
  } else if (ev.target.getAttribute("src") != null) {
    await delCesta();
  }
}

$cestas.addEventListener("click", borrarPostre);
$dialog.addEventListener("click", borrarPostre);

function renderPostres(postres, cestas) {
  $postres.innerHTML = postres.reduce((anterior, actual) => {
    let postreCesta = cestas.find((pro) => pro.postreId == actual.id);
    return (
      anterior +
      `<li class="card">
      <figure class="card__img">
        <img src="${actual.image.desktop}" alt="" />
      </figure>

      ${
        postreCesta
          ? `<p class="card__add card__add--count">
        <button class="card__btn" data-id="${actual.id}">-</button>
        <span class="num">${postreCesta.cantidad}</span>
        <button class="card__btn" data-id="${actual.id}">+</button>
      </p>`
          : `<p class="card__add" data-id="${actual.id}">Añadir al carro</p>`
      }

      <section class="card__content">
        <p class="categoria">${actual.category}</p>
        <h4 class="card__titulo">${actual.name}</h4>
        <p class="precio">${actual.price}</p>
      </section>
    </li>
      `
    );
  }, "");
}

function renderCesta(cestas) {
  let totalPostres = cestas.reduce(
    (anterior, actual) => anterior + actual.cantidad,
    0
  );
  let totalPrecio = 0;
  $cestas.innerHTML = cestas.length
    ? `
        <h3>
            Su cesta
            <span class="carrito__unidades">(${totalPostres})</span>
        </h3>
        <a href="" class="carrito__delete">
            <img src="./assets/images/icon-delete-to-cart.svg" alt="" />
        </a>
        <ul class="carrito__productos">
            ${cestas.reduce((anterior, actual) => {
              let postre = postres.find((el) => el.id == actual.postreId);
              let totalPostre = actual.cantidad * postre.price;
              totalPrecio += postre.price * actual.cantidad;
              return (
                anterior +
                `
                    <li class="producto">
                        <p class="producto__nombre">
                            ${postre.name}
                            <button class="btn--delete" data-id="${actual.id}">X</button>
                        </p>
                        <p class="producto__info">
                            <span class="cantidad">${actual.cantidad}x</span>
                            <span class="precio">${postre.price}</span>
                            <span class="precio precio--total">${totalPostre}</span>
                        </p>
                    </li>`
              );
            }, "")}
        </ul>
        <p class="carrito__total">
            Compra total<span class="precio">${totalPrecio}</span>
        </p>
        <button class="btn carrito__btn" onclick="window.confirmar.showModal();">
            Confirmar compra
        </button>`
    : `<h3>Su cesta 
                <span class="carrito__total"></span>
            </h3>
            <p class="aviso">Sus articulos añadidos aparecerán aquí</p>`;

  $dialog.innerHTML =
    cestas.reduce((anterior, actual) => {
      let postre = postres.find((el) => el.id == actual.postreId);
      let totalPostre = actual.cantidad * postre.price;
      return (
        anterior +
        `<li class="producto">
        <figure>
          <img src="${postre.image.thumbnail}" alt="" />
        </figure>
        <div role="region">
          <p class="producto__nombre">
            ${postre.name}
            <button class="btn--delete" data-id="${actual.id}">X</button>
          </p>
          <p class="producto__info">
            <span class="cantidad">${actual.cantidad}x</span>
            <span class="precio">${postre.price}</span>
            <span class="precio precio--total">${totalPostre}</span>
          </p>
        </div>
      </li>`
      );
    }, "") +
    `<p class="carrito__total">
      Compra total<span class="precio">${totalPrecio}</span></p>`;
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  Promise.all([fetch(`${url}/postres`), fetch(`${url}/cestas`)])
    .then((resps) =>
      Promise.all(
        resps.map((resp) => (resp.ok ? resp.json() : Promise.reject(resp)))
      )
    )
    .then((jsons) => {
      postres.splice(0, postres.length, ...jsons[0]);
      cestas.splice(0, cestas.length, ...jsons[1]);
      renderCesta(cestas);
      renderPostres(postres, cestas);
    })
    .catch((errors) => {
      console.log(errors);
    });
});
