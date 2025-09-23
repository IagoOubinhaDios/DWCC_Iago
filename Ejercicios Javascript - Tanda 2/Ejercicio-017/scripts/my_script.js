/***************************************************************************************************************
 *
 *   Objetivo: Practicar en el uso de métodos de los objetos String, Array, Math, ...
 *             Reforzar el aprendizaje en la creación de funciones declaradas
 *             Reforzar el aprendizaje en la creación de funciones expresadas
 *             Reforzar el aprendizaje en la creación de arrow functions
 *             Mejorar en la forma de programar
 *
 *   Tarea: n es automorfico si su cuadrado termina en n
 *
 *   Entrada : número entero: n
 *
 *   Salida  : El número n es|no es automórfico
 *
 ***************************************************************************************************************/
function esAutomorfico(num){
    // let resultado=`${num*num}`
    // let automórfico=resultado.endsWith(`${num}`)
    // return automórfico
    return Math.pow(num, 2).toString().endsWith(num)
}

// Función para devolver un array de automórficos hasta el número devuelto
function automórficos1(num){
    const numeros=Array.from({length:num},(el,i)=>i+1)
    return numeros.filter(el=>esAutomorfico(el))
}

// Función para devolver los primeros 'num' automórficos que se encuentren
function automórficos2(num){
    const automorficos=[]
    i=1
    while(automorficos.length<num){
        if(esAutomorfico(i)){
            automorficos.push(i)
        }
        i++
    }
    return automorficos
}

let num=parseInt(prompt("Introduce un número:"))
while(isNaN(num) || num===""){
    num=parseInt(prompt("Introduce un número:"))
}
let resultado=esAutomorfico(num)?
`El número ${num} es automórfico`:`El número ${num} no es automórfico`
console.log(resultado)

console.log(automórficos1(625))
