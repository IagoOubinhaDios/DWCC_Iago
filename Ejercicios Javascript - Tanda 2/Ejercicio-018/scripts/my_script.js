/***************************************************************************************************************
 *
 *   Objetivo: Refozar el aprendizaje en definir y usar funciones declaradas y expresadas
 *             Entender la diferencia entre funciones declaradas y funciones expresadas
 *             Reforzar en el uso de arrow functions
 *             Reforzar el aprendizaje en la definicion de arrays con el método estático Array.from
 *             Aprender a emplear métodos del objeto Array para la programación funcional
 *             Mejorar la forma de programar
 *
 *   Tarea: Solicitar un número entero positivo, n
 *          Generar los primeros n números primos
 *
 *          Nota: Un número p es primo si sólo es divisible por 1 y por p
 *
 *   Entrada : numero entero: n
 *
 *   Salida  : 1, 3, 5, 7, ...
 *
 ***************************************************************************************************************/
function esPrimo1(num){
    let contador=0

    for(let i=0; i<num; i++){
        if(num%i==0){
            contador++
        }
    }

    return contador<=1
}

function esPrimo2(num){
    return Array.from({length:num-1},(el,i)=>i+1).filter(el=>num%i==0).length<=1
}

function numPrimos1(num){
    const primos=[]
    let contador=0
    for (let i=1; i<num; i++){
        for (let j=0; j<i; j++){
            if (i%j==0){
                contador++
            }
        }
        if (!contador<=1){
            primos.push(i)
        }
        contador=0
    }
    return primos
}

function numPrimos2(num){
    const numeros=Array.from({length:num},(el,i)=>i+1)
    return numeros.filter(el=>esPrimo2(el))
}

let num=parseInt(prompt("Introduce un número:"))
while(isNaN(num) || num===""){
    num=parseInt(prompt("Introduce un número:"))
}
console.log(numPrimos2(num))