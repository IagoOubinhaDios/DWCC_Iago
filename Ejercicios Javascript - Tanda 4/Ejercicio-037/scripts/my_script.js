/***************************************************************************************************************
 *
 *   Objetivo: Practicar en el uso del objeto Date
 *
 *   Tarea: Solicitar dos fechas en formato dd/mm/aaaa
 *          Indicar los días transcurridos entre las dos fechas
 *
 *   Entrada : 31/01/2013 02/02/2013
 *
 *   Salida  : 2 días
 *
 ***************************************************************************************************************/

function diasTranscurridos(fecha1, fecha2) {
  const expReg = /^\d{2}-\d{2}-\d{4}$/;
  if (expReg.test(fecha1) && expReg.test(fecha2)) {
    
  }
}

let fecha1 = prompt("Introduce una fecha (formato dd-mm-aaaa): ");
let fecha2 = prompt("Introduce otra fecha (formato dd-mm-aaaa): ");

diasTranscurridos(fecha1, fecha2);
