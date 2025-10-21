const $d = document,
  $horas = $d.querySelector("#hora"),
  $minutos = $d.querySelector("#minuto"),
  $segundos = $d.querySelector("#segundo");

$d.addEventListener("DOMContentLoaded", (ev) => {
  let fecha = new Date();
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let segundos = fecha.getSeconds();
  renderTiempo(horas, minutos, segundos);
});

function renderTiempo(horas, minutos, segundos) {
  if (segundos >= 60) {
    segundos = 0;
    minutos++;
  }
  if (minutos >= 60) {
    minutos = 0;
    horas++;
  }
  if (horas >= 24) {
    horas = 0;
  }

  $horas.textContent = horas < 10 ? "0" + horas : "" + horas;
  $minutos.textContent = minutos < 10 ? "0" + minutos : "" + minutos;
  $segundos.textContent = segundos < 10 ? "0" + segundos : "" + segundos;
}
