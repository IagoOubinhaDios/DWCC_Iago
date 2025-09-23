/***************************************************************************************************************
 *
 *   Objetivo: Conocer nuevos métodos del objeto Math
 *             Aprender la diferencia entre funciones definidas y expresadas
 *             Mejorar en el uso de lógica de programación para la resolución de problemas
 *             Mejorar en la comunicación con el usuario
 *
 *   Tarea: Adivina un número. 
 *          Solicitaro números enteros entre 1 y 100 mientras el usuario no acierte un número, que se escogerá
 *          inicialmente de forma aleatoria.
 *          Al finalizar el juego se mostrará el número de intentos, pero sin tener en cuenta aquellos intentos 
 *          en los que se introduce un dato incorrecto (que no esté sea un número entero entre 1 y 100).
 *
 *   Entrada : un número entero, n (en cada intento)
 *
 *   Salida  : ! Has acertado ! Has necesitado XX intentos
 *             ! Has fallado ! El número que tienes que adivinar es (mayor|menor)
 *
 ***************************************************************************************************************/
function enteroAleatorioMinMax(min,max){
    return parseInt((Math.random()*max)+min)
}

function mayorMenorNum(num, numAleatorio){
    let resultado="mayor"
    if(numAleatorio<num){
        resultado="menor"
    }
    return resultado
}

let num=0
let numAleatorio=enteroAleatorioMinMax(1,100)
let numIntentos=0
let mensaje=""
console.log(numAleatorio)
while(num!=numAleatorio){
    num=parseInt(prompt("Adivine el número del 1 al 100: "))
    numIntentos+=num==numAleatorio?0:1
    mensaje=num==numAleatorio?
    `Has acertado! Has necesitado ${numIntentos} intentos`:
    `Has fallado! El número que tienes que adivinar es ${mayorMenorNum(num,numAleatorio)}`
    console.log(mensaje)
}