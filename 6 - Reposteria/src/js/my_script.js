const url = "http://localhost:3000";
const postres = [],
  cestas = [];

const $d = document,
  $postres = $d.querySelector(".cards"),
  $cestas = $d.querySelector(".carrito");

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

async function sumPostre(postre) {
  const resp = await ajax({
    url: `${url}/cestas/${postre.id}`,
    method: "PATCH",
    data: { cantidad: ++postre.cantidad }
  });
  if (resp.ok) {
    cestas.push(resp.data);
    renderPostres(postres, cestas);
    renderCestas(cestas);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function resPostre(postre) {
  const resp = await ajax({
    url: `${url}/cestas/${postre.id}`,
    method: "PATCH",
    data:{ cantidad: --postre.cantidad }
  });
  if (resp.ok) {
    cestas.push(resp.data);
    renderPostres(postres, cestas);
    renderCestas(cestas);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

async function addPostre(postre) {
  const resp = await ajax({
    url: `${url}/cestas`,
    method: "POST",
    data: postre,
  });
  if (resp.ok) {
    cestas.push(resp.data);
    renderPostres(postres, cestas);
    renderCestas(cestas);
  } else {
    alert(`Error al añadir: ${resp.statusText}`);
  }
}

$postres.addEventListener("click", async (ev) => {
  ev.preventDefault();

  let postre = postres.find((pos) => pos.id == ev.target.dataset.id);
  if (postre) {
    if ((ev.target.value == "+")) {
      await sumPostre(postre);
    } else if ((ev.target.value == "-")) {
      await resPostre(postre);
    } else {
      await addPostre(postre);
    }
  }
});

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
        <button class="card__btn" data_id="${actual.id}">-</button>
        <span class="num">${postreCesta.cantidad}</span>
        <button class="card__btn" data_id="${actual.id}">+</button>
      </p>`
          : `<p class="card__add" data_id="${actual.id}">Añadir al carro</p>`
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

function renderCestas(cestas) {
  let totalPostres = cestas.reduce(
    (anterior, actual) => anterior + actual.cantidad,
    0
  );
  let totalPrecio = cestas.reduce(
    (anterior, actual) => anterior + actual.price,
    0
  );
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
              let totalPostre = parseFloat(actual.cantidad * postre.precio);
              return (
                anterior +
                `
                    <li class="producto">
                        <p class="producto__nombre">
                            ${postre.name}
                            <button class="btn--delete" data_id="${actual.id}">X</button>
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
      renderCestas(cestas);
      renderPostres(postres, cestas);
    })
    .catch((errors) => {
      console.log(errors);
    });
});
