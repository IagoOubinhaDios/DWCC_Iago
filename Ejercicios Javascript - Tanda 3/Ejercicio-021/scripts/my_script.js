/***************************************************************************************************************
 *
 *   Objetivo: Practicar en el uso de los objetos String y Array
 *             Practicar en el uso de programación funcional
 *
 *   Tarea: Multas de tráfico por alcohol.
 *          Solicita el peso, genero, número de copas, la cantidad de alcohol
 *          por volumen de las bebidas consumidas y el tiempo desde la última
 *          bebida.
 *          Calcula la cantidad de alcohol en sangre empleando esta formula:
 * 
 *                 AES = (A * 5.14 / P * r) - 0.015 * T
 * 
 *          donde:
 * 
 *             A: Alcohol total consumido (en onzas)
 *             P: Peso de la persona en pounds
 *             r: Relación de distribución de alcohol
 *                   0.73 para hombres
 *                   0.66 para mujeres
 *             T: Tiempo en horas desde la última bebida
 *
 *   Salida  : Muestra un mensaje determinando si es o no legal conducir comparandolo
 *             con un nivel en sangre de alcohol de 0.08
 *
 ***************************************************************************************************************/
let nivelSangreValido=0.08

function legalONo(peso, genero, copas, tiempo){
    let numGenero=genero=='H'?0.73:0.66
    let alcoholEnSangre=(copas*5.14/peso*numGenero)-0.015*tiempo
    return alcoholEnSangre<=nivelSangreValido
}

let peso=parseInt(prompt("Introduce tu peso: "))
while(isNaN(peso) && peso===""){
    peso=parseInt(prompt("Introduce tu peso: "))
}
let genero=prompt("Introduce tu genero(H/M): ")
while(genero==="" && genero!=="H" && genero!="M"){
    genero=prompt("Introduce tu genero(H/M): ")
}
let copas=parseInt(prompt("Introduce las copas que has bebido: "))
while(isNaN(copas) && copas===""){
    copas=parseInt(prompt("Introduce las copas que has bebido: "))
}
let tiempo=parseInt(prompt("Introduce las horas desde la última copa: "))
while(isNaN(tiempo) && tiempo===""){
    tiempo=parseInt(prompt("Introduce las horas desde la última copa: "))

}

let resultado=legalONo(peso, genero, copas, tiempo)?"válido":"NO válido"
console.log(`Su nivel de sangre es ${resultado}`)