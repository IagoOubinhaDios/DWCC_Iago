/***************************************************************************************************************
 *
 *   Objetivo: Aprender a usar diferentes estructuras de programación condicionales
 *             Reforzar en el uso de métodos del objeto window
 *             Mejorar en lógica de programación
 *
 *   Tarea: Solicitar al usuario que visita la página web su edad 
 *          Mostrar un mensaje en función de ella
 * 
 *          Realizar la tarea de dos formas: empleando if y empleando switch
 *
 *   Entrada : número entero (Number): edad
 *
 *   Salida  : Si la edad es menor que 30 el mensaje debe ser: ! Ponte a trabajar !
 *             Si la edad está entre 30 y 64 el mensaje debe ser: ! Que ganas tengo de jubilarme !
 *             Si la edad es superior a 65 el mensaje debe ser: ! Descansa un poco !
 *
 *   Notas   : Debemos comprobar que la edad sea un número entero mayor que 0 (indicaremos el error)
 *             La edad no puede ser superior a 120
 *
 ***************************************************************************************************************/
let edad=parseInt(prompt("Cuántos años tienes"))
while(edad<0||edad>120||edad===""||isNaN(edad)){
    edad=parseInt(prompt("Cuántos años tienes"))
}

function resultado(edad){
    let msg="Ponte a trabajar!"
    if(edad>=30&&edad<64){
        msg="Que ganas tengo de jubilarme!"
    } else if(edad>=65){
        msg="Descansa un poco!"
    }
    return msg
}

console.log(resultado(edad))