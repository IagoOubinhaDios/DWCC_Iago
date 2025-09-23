/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de métodos del objeto Math
 *             Reforzar el uso de estructuras repetitivas
 *             Reforzar en el uso de template strings
 *             Aprender a definir arrays con el método estático Array.from
 *             Reforzar el aprendizaje en el uso de funciones flecha (arrow funcions)
 *             Aprender a emplear el método map del objeto Array para la programación funcional
 *
 *   Tarea: Solicita dos números enteros. Muestra el cuadrado de todos los números entre ellos
 *
 *   Entrada : inicio, fin
 *
 *   Salida  : inicio², (inicio+1)², ..... (fin)²
 *
 ***************************************************************************************************************/
function cuadradoNumMap1(numIni,numFin){
    const cuadrados=[]
    for(let i=numIni; i<=numFin; i++){
        cuadrados.push(Math.pow(i,2))
    }
    return cuadrados
}

function cuadradoNumMap2(numIni,numFin){
    const numeros=Array.from({length:numFin-numIni+1},(el,i)=>i+numIni)
    return numeros.map(el=>Math.pow(el,2))
}

function cuadradoMapVersatil(numIni,numFin,...datos){
    const numeros=[numIni,numFin,...datos]
    return numeros.map(el=>Math.pow(el, 2))
}

let numIni=parseInt(prompt("Introduce el número de inicio: "))
while(isNaN(numIni) || numIni===""){
    numIni=parseInt(prompt("Introduce el número de inicio: "))
}
let numFin=parseInt(prompt("Introduce el número de fin: "))
while(isNaN(numFin) || numFin==="" || numFin<numIni){
    numFin=parseInt(prompt("Introduce el número de fin: "))
}
console.log(cuadradoNumMap1(numIni,numFin))