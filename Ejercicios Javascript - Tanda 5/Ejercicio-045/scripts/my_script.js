/***************************************************************************************************************
 *
 *   Objetivo: Aprender a definir con objetos literales
 *             Aprender a acceder a métodos del objeto
 *
 *   Tarea: Crear un objeto persona con nombre, edad y un metodo que determine si es mayor o no de edad
 *
 *   Entrada : cadena de texto: nombre
 *             número entero positivo: edad
 *
 *   Salida  : XXXXXX es|no es mayor de edad
 *
 ***************************************************************************************************************/
class Persona{
    nombre;
    edad;

    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    getNombre(){
        return nombre;
    }

    getMayorDeEdad(){
        return edad >= 18;
    }
}

let nombre = prompt("Introduce un nombre: ")
let edad = parseInt(prompt("Introduce una edad: "))

let persona = new Persona(nombre, edad);
console.log(persona.getMayorDeEdad() ? `${persona.getNombre()} es mayor de edad` : `${persona.getNombre()} no es mayor de edad`)