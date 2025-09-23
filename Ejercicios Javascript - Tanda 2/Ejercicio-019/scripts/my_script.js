/***************************************************************************************************************
 *
 *   Objetivo: Reforzar programación funcional
 *             Reforzar en la lógica de programación
 *             Mejorar la forma de programar
 *             Aprender a abordar el problema de diferentes formas
 *
 *   Tarea: Solicitar un número entero n
 *          Generar los números perfectos menores que n
 *
 *          Nota: Un número es perfecto cuando el número es igual a la suma de sus divisores.
 *
 *   Entrada : número entero: n
 *
 *   Salida  :
 *
 ***************************************************************************************************************/
function numPerfectosMenores1(num){
    let divisores=""
    for (let i=0; i<num; i++){
        if (num%i==0){
            divisores+=i
        }
    }
    return divisores==num
}

function numPerfectosMenores2(num){
    const divisores=[]
    for (let i=0; i<num; i++){
        if (num%i==0){
            divisores.push(i)
        }
    }
    return divisores.reduce((anterior, actual)=>anterior+actual,0)==num
}

function numPerfectosMenores3(num){
    const numeros=Array.from({length:num-1},(el,i)=>i+1)

    return numeros.filter(el=>num%el==0).reduce((anterior,actual)=>anterior+actual,0)==num
}

let num=parseInt(prompt("Introduce un número:"))
while(isNaN(num) || num===""){
    num=parseInt(prompt("Introduce un número:"))
}
console.log(numPerfectosMenores1(num)+"\n"+numPerfectosMenores2(num)+"\n"+numPerfectosMenores3(num))