/***************************************************************************************************************
 *
 *   Objetivo: Aprender a mejorar en lógica de programación
 *             Aprender a usar el objeto Date y sus métodos
 *             Perseverar en la comprobación de datos introducidos por un usuario
 *
 *   Tarea: Dado mes y año, determinar si el mes tiene un Viernes 13
 *
 *   Entrada : año  (1920) y mes (01)
 *
 *   Salida  : El mes Enero de 1920 no tiene un Viernes 13
 *
 ***************************************************************************************************************/

const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function comprobarViernes13 (anho, mes){
    let fecha = new Date(anho, mes, 13);
    return fecha.getDay(13) == 5;
}

let anho=parseInt(prompt("Introduce tu año de nacimiento: "))
while(isNaN(anho) || anho===""){
    anho=parseInt(prompt("Introduce tu año de nacimiento: "))
}

let mes=parseInt(prompt("Introduce tu mes de nacimiento: "))
while(isNaN(mes) || mes===""){
    mes=parseInt(prompt("Introduce tu mes de nacimiento: "))
}

console.log(comprobarViernes13(anho, mes-1) ? `El mes ${meses[mes-1]} de ${anho} tiene un viernes 13` : `El mes ${meses[mes-1]} de ${anho} no tiene un viernes 13`);