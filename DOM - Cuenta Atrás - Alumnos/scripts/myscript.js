const $d = document,
  $contenedor = $d.querySelector(".contenedor"),
  $horas = $contenedor.querySelector(".horas"),
  $minutos = $contenedor.querySelector(".minutos"),
  $segundos = $contenedor.querySelector(".segundos"),
  $reset = $d.querySelector("#reset"),
  $start = $d.querySelector("#start");

let control;

let segundos = 1;
let minutos = 1;
let horas = 0;

$start.addEventListener("click", (ev) => {
  $start.textContent.toUpperCase() == "START" ||
  $start.textContent.toUpperCase() == "CONTINUE"
    ? empezar()
    : parar();
});

function empezar() {
  cambioContador(segundos, minutos, horas);
  if (!(horas <= 0 && minutos <= 0 && segundos <= 0)) {
    cronometro();
    control = setInterval(cronometro, 1000);
    $start.textContent = "STOP";
  }
}

function parar() {
  clearInterval(control);
  $start.textContent = "CONTINUE";
}

$reset.addEventListener("click", (ev) => {
  clearInterval(control);
  segundos = 0;
  minutos = 0;
  horas = 0;
  cambioContador(segundos, minutos, horas);
  $start.textContent = "START";
});

function cronometro() {
  segundos--;
  if (segundos < 10 && segundos >= 0) {
    segundos = `0${segundos}`;
  } else if (segundos < 0) {
    segundos = 59;
    minutos--;
    if (minutos < 10 && minutos >= 0) {
      minutos = `0${minutos}`;
    } else if (minutos < 0) {
      minutos = 59;
      horas--;
      if (horas < 10 && horas >= 0) {
        horas = `0${horas}`;
      }
    }
  }
  if (horas <= 0 && minutos <= 0 && segundos <= 0) {
    parar();
    $start.textContent = "START";
  }

  cambioContador(segundos, minutos, horas);
}

function cambioContador(segundos, minutos, horas) {
  $segundos.querySelectorAll("option").forEach((el) => {
    if (el.getAttribute("selected") != null && el.value != segundos) {
      el.removeAttribute("selected");
    } else if (el.getAttribute("selected") == null && el.value == segundos) {
      el.setAttribute("selected", "");
    }
  });

  $minutos.querySelectorAll("option").forEach((el) => {
    if (el.getAttribute("selected") != null && el.value != minutos) {
      el.removeAttribute("selected");
    } else if (el.getAttribute("selected") == null && el.value == minutos) {
      el.setAttribute("selected", "");
    }
  });

  $horas.querySelectorAll("option").forEach((el) => {
    if (el.getAttribute("selected") != null && el.value != horas) {
      el.removeAttribute("selected");
    } else if (el.getAttribute("selected") == null && el.value == horas) {
      el.setAttribute("selected", "");
    }
  });
}

$contenedor.addEventListener("change", (ev) => {
  if (ev.target.classList.contains("horas")) {
    $horas.querySelectorAll("option").forEach((el) => {
      if (el.getAttribute("selected") != null) {
        horas = el.value;
      }
    });
  }
  if (ev.target.classList.contains("minutos")) {
    $minutos.querySelectorAll("option").forEach((el) => {
      if (el.getAttribute("selected") != null) {
        minutos = el.value;
      }
    });
  }
  if (ev.target.classList.contains("segundos")) {
    $segundos.querySelectorAll("option").forEach((el) => {
      if (el.getAttribute("selected") != null) {
        segundos = el.value;
      }
    });
  }
  cambioContador(segundos, minutos, horas);
});

function renderTiempo() {
  for (let i = 0; i < 60; i++) {
    let num = i;
    if (i < 10) {
      num = `0${i}`;
    }
    $segundos.innerHTML += `<option value="${num}">${num}</option>`;
    $minutos.innerHTML += `<option value="${num}">${num}</option>`;
    $horas.innerHTML += `<option value="${num}">${num}</option>`;
  }
}

$d.addEventListener("DOMContentLoaded", (ev) => {
  renderTiempo();
  console.log(horas, minutos, segundos);
});
