const $d = document,
  $addBoton = $d.querySelector("#addCarta"),
  $delBoton = $d.querySelector("#delCarta"),
  $form = $d.querySelector("form"),
  $palo = $d.querySelector("#palo"),
  $numero = $d.querySelector("#numero"),
  $ncartas = $d.querySelector("#ncartas"),
  $btnOperar = $d.querySelector("#btnOperar"),
  [insertar, sustituir] = $d.getElementsByName("operacion"),
  $figuras = $d.querySelector("#figuras");

const cartas = [];

function renderCartasFragmento(cartas) {
  const $fragmento = $d.createDocumentFragment();
  $figuras.innerHTML = "";
  cartas.forEach((carta) => {
    const $figure = $d.createElement("figure");
    const $img = $d.createElement("img");
    $img.src = `imagenes/${carta}.png`;
    $figure.appendChild($img);
    // $figuras.append($figure);
    $fragmento.append($figure);
  });
  $figuras.appendChild($fragmento);
}

function renderCartasTemplate(cartas) {
  const $tCartas = $d.querySelector("#template-carta").content;
  cartas.forEach((carta) => {
    const $clon = $tCartas.cloneNode(true);
    const $img = $clon.querySelector("img");
    $img.src = `imagenes/${carta}.png`;
    $figuras.append($clon);
  });
}

function renderCartas(cartas) {
  // $figuras.innerHTML = cartas
  //   .map((carta) => `<figure><img src="imagenes/${carta}.png"></figure>`)
  //   .join("");
  $figuras.innerHTML = cartas.reduce(
    (anterior, actual) =>
      anterior + `<figure><img src="imagenes/${actual}.png"></figure>`,
    ""
  );

  $ncartas.innerHTML = cartas.map(
    (carta, i) => `<option value="${i}">${i + 1}</option>`
  );
}

$addBoton.addEventListener("click", (ev) => {
  ev.preventDefault();
  let carta = `${$palo.value}${$numero.value}`;
  if (cartas.indexOf(carta) == -1) {
    cartas.push(`${$palo.value}${$numero.value}`);
    //   renderCartasFragmento(cartas);
    //   renderCartasTemplate(cartas);
    renderCartas(cartas);
  } else {
    alert("La carta que quieres introducir ya existe");
  }
});

$delBoton.addEventListener("click", (ev) => {
  ev.preventDefault();
  let carta = `${$palo.value}${$numero.value}`;
  if (cartas.indexOf(carta) != -1) {
    let indice = cartas.findIndex((el) => el == carta);
    cartas.splice(indice, 1);
    renderCartas(cartas);
  } else {
    alert("La carta que quieres borrar no existe");
  }
});

$btnOperar.addEventListener("click", (ev) => {
  ev.preventDefault();
  console.log(insertar);

  if (insertar.checked || sustituir.checked) {
    let indice = $ncartas.value;
    let carta = `${$palo.value}${$numero.value}`;
    if (insertar.checked) {
      cartas.splice(indice, 0, carta);
    }

    if (sustituir.checked) {
      cartas[indice] = carta;
    }
    renderCartas(cartas);
  }
});
