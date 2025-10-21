/***************************************************************************************************************
 *
 *   Objetivo: Aprender a mejorar en lógica de programación
 *             Aprender a usar el objeto Date y sus métodos
 *             Perseverar en la comprobación de datos introducidos por un usuario
 *
 *   Tarea: Solicitar una fecha a un usuario (en formato día/mes/año)
 *          Comprobar si es correcta o existe.
 *
 *          Tener en cuenta que el año puede ser bisiesto
 *          Si es bisiesto (divisible por 4 o por 400, pero no es divisible por 100), Febrero tendrá 29 días.
 *
 *   Entrada : dia/mes/anho
 *
 *   Salida  : La fecha dia/mes/anho (es|no es) correcta
 *
 ***************************************************************************************************************/

function esFecha(fecha) {
  let boolean = false;
  const expReg = /^\d{2}-\d{2}-\d{4}$/;
  if (expReg.test(fecha)) {
    let campos = fecha.split("-");
    nuevaFecha = new Date(campos[2], campos[1]-1, campos[0]);
  }
  return boolean;
}

let fecha = prompt("Introduce una fecha (formato dd-mm-aaaa): ");

console.log(esFecha(fecha) ? `La fecha ${fecha} es correcta` : `La fecha ${fecha} no es correcta`);
