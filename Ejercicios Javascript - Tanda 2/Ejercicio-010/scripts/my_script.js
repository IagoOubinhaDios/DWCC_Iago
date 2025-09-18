/***************************************************************************************************************
 *
 *   Objetivo: Mejorar la lógica de programación
 *
 *   Tarea: Solicitamos tres números enteros al usuario 
 *          Mostramos cual es el mayor
  *
 *   Entrada : número entero: numero1
 *             número entero: numero2
 *             número entero: numero3
 *
 *   Salida  : El mayor de numero1, numero2 y numero3 es : XXXXX
 *
 ***************************************************************************************************************/
let n1 = parseInt(prompt("Número 1: "))
while (isNaN(n1) || n1===""){
    n1 = parseInt(prompt("Número 1: "))
}
let n2 = parseInt(prompt("Número 2: "))
while (isNaN(n2) || n2===""){
    n2 = parseInt(prompt("Número 2: "))
}
let n3 = parseInt(prompt("Número 3: "))
while (isNaN(n3) || n3===""){
    n3 = parseInt(prompt("Número 3: "))
}

function numMayor(n1,n2,n3){
    let resultado = n1
    if (n2>resultado){
        resultado=n2
    }
    if (n3>resultado){
        resultado=n3
    }
    return resultado
}

/*let numeros=[2134, 456, 21, 454]
let max=Math.max(...numeros) //Separa el array y compara*/

let resultado = numMayor(n1,n2,n3)

console.log(`El mayor de ${n1}, ${n2} y ${n3} es : ${resultado}`)