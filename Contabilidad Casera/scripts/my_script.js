const $d = document,
  $movimientos = $d.querySelector("#expenseTable"),
  $totalMovimientos = $d.querySelector("tfoot"),
  $form = $d.querySelector("form");

const movimientos = [
  {
    tipo: "Ingreso",
    concepto: "sueldo",
    cantidad: 200,
    estado: true,
  },
  {
    tipo: "Egreso",
    concepto: "luz",
    cantidad: 20,
    estado: false,
  },
];

function renderFooter(movimientos) {
  if (movimientos.length) {
    let saldo = movimientos.reduce((anterior, actual) => {
      let suma = actual.estado ? parseFloat(actual.cantidad).toFixed(2) : 0;
      return actual.tipo == "Ingreso" ? anterior + suma : anterior - suma;
    }, 0);

    $totalMovimientos.innerHTML = `<th colspan="4">Saldo Total: <span id="saldoTotal" class="saldoTotal">${saldo}</span></th>`;
    $totalMovimientos.querySelector("span").style.backgroundColor =
      saldo >= 0 ? "aquamarine" : "#ffcccc";
  } else {
    $totalMovimientos.innerHTML = `<td colspan="4">Aún no hay ingresos ni gastos!</td>`;
  }
}

function renderMovimientos1(movimientos) {
  const $fila = $d.querySelector("#template-fila").content,
    $fragmento = $d.createDocumentFragment();

  movimientos.forEach((movimiento) => {
    const $clon = $fila.cloneNode(true);

    const $tr = $clon.querySelector("tr");
    // movimiento.tipo=="Ingreso" ? $tr.classList.add("Ingreso") : $tr.classList.add("Egreso")
    estado
      ? $tr.classList.add(movimiento.tipo.toLowerCase())
      : $tr.classList.add("revertir");

    const $tds = $clon.querySelectorAll("td");
    $tds[0].textContent = movimiento.tipo;
    $tds[1].textContent = movimiento.concepto;
    $tds[2].textContent = movimiento.cantidad;

    $tds[3]
      .querySelectorAll("i")
      .forEach((etiquetaI) => (etiquetaI.dataset.id = i));

    $fragmento.appendChild($clon);
  });

  $movimientos.appendChild($fragmento);
  renderFooter(movimientos);
}

function renderMovimientos2(movimientos) {
  $movimientos.innetHTML = movimientos
    .map(
      (movimiento) =>
        `<tr class='${movimiento.estado ? movimiento.tipo : "revertir"}'>
            <td>${movimiento.tipo}</td>
            <td>${movimiento.concepto}</td>
            <td>${movimiento.cantidad}</td>
            <td>
                <i class="fas fa-undo-alt"></i>
                <i class="fa fa-trash" aria-hidden="true"></i>
            </td>
        </tr>`
    )
    .join("");
  renderFooter(movimientos);
}

function renderMovimientos3(movimientos) {
  $movimientos.innetHTML = movimientos.reduce(
    (anterior, actual, i) =>
      anterior +
      `<tr class='${actual.estado ? actual.tipo : "revertir"}'>
            <td>${actual.tipo}</td>
            <td>${actual.concepto}</td>
            <td>${actual.cantidad}</td>
            <td>
                <i class="fas fa-undo-alt" data-id='${i}'></i>
                <i class="fa fa-trash" aria-hidden="true" data-id='${i}'></i>
            </td>
        </tr>`,
    ""
  );
  renderFooter(movimientos);
}

$movimientos.addEventListener("click", (ev) => {
  if (ev.target.dataset.id) {
    if (ev.target.classList.contains("fa-trash")) {
      movimientos.splice(ev.target.dataset.id, 1);
    } else {
      movimientos[ev.target.dataset.id].estado =
        !movimientos[ev.target.dataset.id].estado;
    }
    renderMovimientos3(movimientos);
  }
});

$form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const $concepto = $form["concepto"],
    $cantidad = $form["cantidad"],
    [$ingreso, $egreso] = $d.getElementsByName("operacion");

  const movimiento = {
    tipo: $ingreso.checked ? "Ingreso" : "Egreso",
    concepto: $concepto.value,
    cantidad: parseFloat($cantidad.value).toFixed(2),
    estado: true,
  };

  movimientos.push(movimiento);
  renderMovimientos3(movimientos);
});

$d.addEventListener("DOMContentLoader", (ev) => {
  renderMovimientos2(movimientos);
});
