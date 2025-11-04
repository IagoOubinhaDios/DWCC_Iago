/***************************************************************************************************************
 *
 *   Objetivo: Aprender métodos del objeto array
 *
 *   Tarea: Tenemos n números enteros consecutivos (salvo uno) desordenados en un array.
 *          Buscar el número entero "perdido".
 *
 *   Entrada : ---
 *
 *   Salida  : El entero que falta en el array
 *
 ***************************************************************************************************************/

function encontrarNumerosPerdidos(numeros) {
  let numerosPerdidos = [];
  let diferencia = 1;
  numeros.sort();
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] - i != diferencia) {
      numerosPerdidos.push(i + diferencia);
      diferencia++;
    }
  }
  return numerosPerdidos;
}

const numeros = [1, 3, 5, 7, 9, 4, 6, 8];
let numerosPerdidos = encontrarNumerosPerdidos(numeros);
console.log(
  numerosPerdidos.length != 0
    ? (numerosPerdidos.length > 1
      ? `Los números perdidos son ${numerosPerdidos}`
      : `El número perdido es ${numerosPerdidos}`)
    : `No hay ningún número perdido en ${numeros}`
);
