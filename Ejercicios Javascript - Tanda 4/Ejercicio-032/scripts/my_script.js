/***************************************************************************************************************
 *
 *   Objetivo: Mejorar la lógica de programación
 *             Aprender a mejorar la forma de resolver un problema una vez ya fue resuelto
 *
 *   Tarea: Solicitar el número de segundos que estamos confinados por una pandemia
 *
 *   Entrada : número entero positivo: segundos
 *
 *   Salida  : Mensaje tal como: "Hemos estado confinados A semanas, B días, C horas, D minutos, E segundos"
 *
 ***************************************************************************************************************/
function tiempoConfinado1(segundos) {
  let resultado = `Hemos estado confinados `;
  let minutos = segundos / 60;
  segundos = parseInt(segundos % 60);
  let horas = minutos / 60;
  minutos = parseInt((minutos %= 60));
  let dias = horas / 24;
  horas = parseInt((horas %= 24));
  let semanas = parseInt(dias / 7);
  dias = parseInt(dias % 7);
  if (semanas != 0) {
    resultado += semanas == 1 ? `${semanas} semana, ` : `${semanas} semanas, `;
  }
  if (dias != 0) {
    resultado += dias == 1 ? `${dias} día, ` : `${dias} días, `;
  }
  if (horas != 0) {
    resultado += horas == 1 ? `${horas} hora, ` : `${horas} horas, `;
  }
  if (minutos != 0) {
    resultado += minutos == 1 ? `${minutos} minuto, ` : `${minutos} minutos, `;
  }
  if (segundos != 0) {
    resultado += segundos == 1 ? `${segundos} segundo` : `${segundos} segundos`;
  }

  return resultado;
}

function tiempoConfinado2(segundos) {}

let segundos = parseInt(prompt("Introduce los segundos"));
while (isNaN(segundos) || segundos === "") {
  segundos = parseInt(prompt("Introduce los segundos"));
}

console.log(tiempoConfinado1(segundos));
