/***************************************************************************************************************
 *
 *   Objetivo: Mejorar en la lógica de programación
 *
 *   Tarea: Obtener la secuencia más larga de ceros indicando la posición de inicio. En caso de que existan varias,
 *          se indicará la primera.
 *
 *   Entrada : "011000010110000"
 *
 *   Salida  : Secuencia: "0000"   Posicion: 3
 *
 ***************************************************************************************************************/
function secuenciaMasLargaCeros1(secuencia) {
    let secuenciaCerosComprobar = "0";
    let secuenciaCeros = "";
    while(secuencia.includes(secuenciaCerosComprobar)){
        secuenciaCeros = secuenciaCerosComprobar;
        secuenciaCerosComprobar += "0";
    }
    return `Cadena: ${secuencia}, Secuencia: ${secuenciaCeros}, Posicion: ${secuencia.indexOf(secuenciaCeros)}`;
}

function secuenciaMasLargaCeros2(secuencia) {

}

let secuencia = prompt("Introduce una secuencia: ");
while (isNaN(secuencia) && secuencia === "") {
    secuencia = prompt("Introduce una secuencia: ");
}
console.log(`${secuenciaMasLargaCeros1(secuencia)}`);
