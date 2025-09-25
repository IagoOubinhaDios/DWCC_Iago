/***************************************************************************************************************
 *
 *   Objetivo: Reforzar el aprendizaje de lógica de programación
 *             Reforzar el uso de funciones y template strings        
 *             Reforzar el uso básica del objeto document
 *             Reforzar el aprendizaje de la definicion de arrays (adicional)
 *             Reforzar el aprendizaje de programación funcional (adicional)
 *             Mejorar en separar lógica de programación de vista (adicional)
 * 
 *   Tarea: Cardio ! 
 *          Cuando realizas ejercicio físico puedes querer estimar las pulsaciones del corazón para
 *          no "quemarte". La formula Karvonen es un método que podemos emplear para determinar la
 *          frecuencia cardíaca:
 * 
 *                      FC=(((220-edad)-DFC)*I)+DFC
 * 
 *          donde:
 *               FC : Frecuencia cardiaca
 *               DFC: Frecuencia cardíaca en descanso
 *               I  : Intensidad
 * 
 *   Entrada : edad : entero
 *             frecuencia cardíaca en descanso: entero (ej: 65 pulsaciones por minuto)
 *             
 *             edad:22  DFC: 65
 * 
 *             Intensidad     Frecuencia
 *             --------------------------
 *                 55 %          138
 *                 ...           ...
 *                 95%           191
 *
 *   Salida  : tabla html que muestre la Frecuencia cardíaca para Intensdidades del 55% al 95%
 *
 ***************************************************************************************************************/
let intensidadMin=55
let intensidadMax=95

function frecuenciaCardiaca(edad, frecuenciaDescanso, intensidad){
    return parseInt((((220-edad)-frecuenciaDescanso)*(intensidad/100))+frecuenciaDescanso)
}

function frecuenciasCardiacas(edad, frecuenciaDescanso){
    const frecuencias=Array.from({length:intensidadMax+1-intensidadMin},(el,i)=>i+intensidadMin)
    return frecuencias.filter(el=>frecuenciaCardiaca(edad, frecuenciaDescanso, el))
}

function tablaHTML(edad, frecuenciaDescanso){
    let tabla="<table><tr><td>Intensidad</td><td>Frecuencia</td></tr><tr><td>------------------------</td></tr>"
    for(let i=intensidadMin;i<=intensidadMax;i++){
        tabla+=`<tr><td>${i}%</td><td>${frecuenciaCardiaca(edad, frecuenciaDescanso, i)}</td></tr>`
    }
    tabla+="</table>"
    return tabla
}

function tablaHTMLMap(edad, frecuenciaDescanso){
    let tabla="<table>"
    const numeros=frecuenciasCardiacas(edad, frecuenciaDescanso)
    tabla+="</table>"
    return tabla
}

function tablaHTMLReduce(edad, frecuenciaDescanso){
    let tabla=""
    const numeros=frecuenciasCardiacas(edad, frecuenciaDescanso)
    return tabla
}

let edad=parseInt(prompt("Introduce tu edad"))
while(isNaN(edad) && edad==="" && edad<1 && edad>100){
    edad=parseInt(prompt("Introduce tu edad"))
}
let frecuenciaDescanso=parseInt(prompt("Introduce tu frecuencia"))
while(isNaN(frecuenciaDescanso) && frecuenciaDescanso===""){
    frecuenciaDescanso=parseInt(prompt("Introduce tu frecuencia"))
}

console.log(frecuenciasCardiacas(edad, frecuenciaDescanso))
// document.querySelector("body").innerHTML=tablaHTML(edad, frecuenciaDescanso)
