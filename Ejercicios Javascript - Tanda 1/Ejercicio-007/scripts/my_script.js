/***************************************************************************************************************
 *
 *   Objetivo: Reforzar el aprendizaje en el uso operadores aritméticos
 *             Reforzar en el uso de métodos del objeto Math
 *             Reforzar en el uso de template strings
 *             Aprender a definir y usar arrays (adicional)
 *             Aprender a usar métodos de programación funcional (adicional)
 *             Mejorar en la realización de programas (adicional)
  * 
 *   Tarea: Viajar es un placer, pero si visitamos un pais que no pertenezca a la Union Europea
 *          tenemos que cambiar la moneda.
 * 
 *          Crea un script se encargue de realizar la conversión de euros a dolares americanos.
 *          La conversión se calcula a través del tipo de cambio, es decir, cuantos dolares representa
 *          1 euro:
 *
 *                  Cantidad de dolares = Cantidad de euros * Tipo de cambio
 *
 *   Entrada : cantidad en euros: número flotante (2 decimales)
 *             tipo de cambio: número flotante
 *
 *   Salida  : Un mensaje del tipo
 * 
 *               E euros con el tipo de cambio C son D dolares
 *
 *   Adicional: Si tenemos los tipos de cambios recogidos para varios paises en un array, mostrar
 *              los cambios a dolares para los diferentes paises
 * 
 *  https://openexchangerates.org/
 * 
 ***************************************************************************************************************/
function askForData(msg, tipo,  li, ls){
    let resultado=prompt(msg)
    while(resultado<=li || resultado>=ls || resultado===tipo){
        resultado=prompt(msg)
    }
    return resultado
}

const monedas={
    USD:1.1,
    YN:1.3
}

let E=parseFloat(prompt("Cantidad en euros:"))
while (isNaN(E) || E < 0) {
    E=parseFloat(prompt("Cantidad en euros:"))
}

/*let C=parseFloat(prompt("Tipo de cambio: "))
while ((isNaN(C) || C <= 0)){
    C=parseFloat(prompt("Tipo de cambio: "))
}
let D=Math.round(E * C * 100) / 100;*/

let C=prompt(`A que moneda quieres cambiar (${Object.keys(monedas)})`)
while(!Object.keys(monedas).includes(C.toUpperCase())){
    C=prompt(`A que moneda quieres cambiar (${Object.keys(monedas)})`)
}
let D = E*monedas[C.toUpperCase]
console.log(`${E.toFixed(2)} euros con el tipo de cambio ${C} son ${D.toFixed(2)} dólares`)

let msg=Object.keys(monedas)
    .map(el=>`${E.toFixed(2)} en ${el} es ${monedas[el]*E.toFixed(2)}`)
    .join(`\n`)
console.log(msg)