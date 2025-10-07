/***************************************************************************************************************
 *
 *   Objetivo: Aprender a mejorar en la resolución de ejercicios de lógica de programación
 *             Aprender a plantarse diferentes formas de resolver un problema
 *
 *   Tarea: Solicitar la fecha de nacimiento de una persona (dia, mes y año)
 *          Calcular el número de la suerte
 * 
 *          El número de la suerte se calcula sumando las cifras obtenidas en la suma
 * 
 *          Por ejemplo: si la fecha de nacimiento es el 12 de Julio de 1980
 *                                  12-7-1980 = 1999
 *                                  1+9+9+9 = 28
 *                                  2+8 = 10
 *                                  1+0 = 1   <---- Número de la suerte
 *
 *   Entrada : dia, mes, anho
 *
 *   Salida  : Como has nacido el dia de mes de año, tu número de la suerte es XXX
 *
 ***************************************************************************************************************/

function numSuerte(dia, mes, anho){
    let num=dia+mes+anho
    let digitos=[]
    do {
        digitos=num.toString().split('')
        digitos.reduce((anterior,actual)=>num=parseInt(anterior)+parseInt(actual))
    } while(digitos.length>1)
    num=digitos[0]
    return num
}

let anho=parseInt(prompt("Introduce tu año de nacimiento: "))
while(isNaN(anho) || anho===""){
    anho=parseInt(prompt("Introduce tu año de nacimiento: "))
}

let mes=parseInt(prompt("Introduce tu mes de nacimiento: "))
while(isNaN(mes) || mes===""){
    mes=parseInt(prompt("Introduce tu mes de nacimiento: "))
}

let dia=parseInt(prompt("Introduce tu dia de nacimiento: "))
while(isNaN(dia) || dia===""){
    dia=parseInt(prompt("Introduce tu dia de nacimiento: "))
}

console.log(`Como has nacido el ${dia} de ${mes} de ${anho}, tu número de la suerte es ${numSuerte(dia, mes, anho)}`)