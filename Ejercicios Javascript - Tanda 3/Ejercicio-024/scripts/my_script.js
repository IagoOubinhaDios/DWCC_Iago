/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de diferentes formas de resolución de problemas y sus ventajas/desventajas
 *             Reforzar en la lógica de programación
 *             Reforzar en el aprendizaje de programación funcional y métodos del objeto Array
 *             Reforzar en el aprendizaje de métodos del objeto String
 *             Mejorar en el planteamiento sobre casos de entrada
 * 
 *   Tarea: Determinar en un texto el número de palabras, la primera palabra y la última
 *
 *   Entrada : una cadena de caracteres
 *
 *   Salida  : Se muestra la cadena de caracteres introducida por el usuario y
 * 
 *             Número de palabras: XXX
 *             Primera palabra: YYYYY
 *             Última palabra: ZZZZZ
 *             Palabras ordenadas de la a a la z: AAA BBBB CCCC DDDD
 *             Palabras ordenadas de la z a la a: ZZZ YYYY WWWW
 *
 ***************************************************************************************************************/
function salidaCaracteres(caracteres){
    const palabras=caracteres.split(" ")
    let numPalabras=palabras.length
    const palabrasOrdenadas=palabras.sort()
    let resultado=`${caracteres}\n\nNumero de palabras: ${numPalabras}
    \nPrimera palabra: ${palabras[0]}
    \nÚltima palabra: ${palabras[palabras.length-1]}
    \nPalabras ordenadas de la A a la Z: ${palabrasOrdenadas}
    \nPalabras ordenadas de la Z a la A: ${palabrasOrdenadas.reverse()}`
    return resultado
}

let caracteres=prompt("Introduce una cadena de caracteres:")
while(caracteres===""){
    caracteres=prompt("Introduce una cadena de caracteres:")
}
console.log(salidaCaracteres(caracteres))