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


let secuencia=parseInt(prompt("Introduce una secuencia: "))
while(isNaN(secuencia) && secuencia===""){
    secuencia=parseInt(prompt("Introduce una secuencia: "))
}
