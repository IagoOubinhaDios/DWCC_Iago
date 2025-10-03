/***************************************************************************************************************
 *
 *   Objetivo: Mejorar la lógica de programación
 *             Aprender a trabajar con problemas incompletos en definición
 *
 *   Tarea: Solicitar al usuario su peso (en kg) y su estatura (en metros)
 *          Calculamos el índice de masa corporal
 *          Mostrar por pantalla la frase "Tu índice de masa corporal es <imc>", donde <imc> corresponde
 *          al indice de masa corporal redondeado con dos decimales
 *          Indicar si hay riesgo de enfermedad coronaria.
 *
 *          El índice de masas corporal es el cociente entre el peso del individuo en kilos y el cuadrado de su
 *          estatura en metros.
 *
 *          El riesgo de que una persona sugra enfermedades coronarias depende de su edad y su índice de masa
 *          corporal:
 *                               Edad<45     Edad>=45
 *                   IMC<=22.0    bajo         medio
 *                   IMC>=22.0    medio        alto
 *
 *   Entrada : número flotante: peso
 *             número flotante: estatura
 *
 *   Salida  : "Tu índice de masa corporal es <imc>. Tienes un riesgo ..... de enfermedad coronaria"
 *
 ***************************************************************************************************************/
/*IMC = peso/[estatura]²*/

function riesgoEnfermedadCoronaria(imc, edad){
    let riesgo="medio"
    if(imc<=22 && edad<45){
        riesgo="bajo"
    } else if(imc>=22 && edad>=45){
        riesgo="alto"
    }
    return riesgo
}

function indiceMasaCorporal(peso, estatura, edad){
    let imc=(peso*(estatura^2)).toFixed(2)
    return `Tu índice de masa corporal es ${imc}. Tienes un riesgo ${riesgoEnfermedadCoronaria(imc, edad)} de enfermedad coronaria`
}

let peso = parseFloat(prompt("Introduce el peso:"));
while (isNaN(peso) && peso === "") {
  peso = parseInt(prompt("Introduce el peso:"));
}
let estatura = parseFloat(prompt("Introduce la estatura:"));
while (isNaN(estatura) && estatura === "") {
  estatura = parseInt(prompt("Introduce la estatura:"));
}
let edad = parseInt(prompt("Introduce la edad:"));
while (isNaN(edad) && edad === "") {
  edad = parseInt(prompt("Introduce la edad:"));
}

console.log(indiceMasaCorporal(peso,estatura,edad))
