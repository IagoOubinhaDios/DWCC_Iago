/***************************************************************************************************************
 *
 *   Objetivo: Mejorar en lógica de programación
 *             Mejorar la eficiencia en el uso de recursos limitados
 *
 *   Tarea: Solicitamos, de forma repetida, números enteros hasta que ingresamos el número 0, 
 *          que no se tendrá en cuenta.
 *          Se mostrará cuál fue el mayor de los números enteros introducidos
 *
 *   Entrada : numero1, numero2, numero3,.....
 *
 *   Salida  : El mayor de numero1, numero2, numero3,.... es ....
 *
 ***************************************************************************************************************/
let i = 1
let num = 0
let maximo = num
let numeros = /*''*/[]

do {
    num=parseFloat(prompt(`Introduce el nùmero ${i} : `))
    if(!isNaN(num) && num!==0){
        /*numeros+=`${numeros}, `*/
        numeros.push(num)
        maximo = Math.max(num, maximo)
    }
    i++
} while (num!==0)

    // let resultado=maximo!=0?
    // `El mayor de ${numeros.slice(0, -2)} es ${maximo}`:
    // `Tienes que introducir numeros antes que el 0`
    let resultado=maximo!=0?
    `El mayor de ${numeros} es ${maximo}`:
    `Tienes que introducir numeros antes que el 0`
    console.log(resultado)