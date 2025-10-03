/***************************************************************************************************************
 *
 *   Objetivo: Aprender a plantearse diferentes formas de resolver un problema
 *             Practicar la programación iterativa y recursiva
 *             Valorar diferentes métodos de resolución de problemas, sus ventajas e inconvenientes
 * 
 *   Tarea: Comprobar si la cadena introducida por el usuario es un palíndromo (se lee igual al revés).
 *          P.ej: Dabale arroz a la zorra el abad
 *
 *   Entrada : Cadena de texto
 *
 *   Salida  : La cadena .... (es|no es) un palíndromo
 *
 ***************************************************************************************************************/
function esPalindromo1(texto){
    const cadena=texto.toLowerCase().replaceAll(" ","")
    let palindromo=true
    for(let i=0;i<cadena.length;i++){
        if(cadena[i]!=cadena[cadena.length-1-i]){
            palindromo=false
        }
    }
    return palindromo
}

// function esPalindromo2(texto){
//     const cadena=texto.toLowerCase().replaceAll(" ","")
//     if(cadena.length==0||cadena.length==1){
//         return true
//     }
//     return esPalindromo2(cadena.slice(1,-1))
// }

let texto=prompt("Introduce la cadena de texto:")
while(texto===""){
    texto=prompt("Introduce la cadena de texto:")
}

console.log(esPalindromo1(texto)?`La cadena es un palíndromo`:`La cadena no es un palíndromo`);
console.log(esPalindromo2(texto)?`La cadena es un palíndromo`:`La cadena no es un palíndromo`);
