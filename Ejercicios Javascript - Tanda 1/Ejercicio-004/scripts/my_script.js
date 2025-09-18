/***************************************************************************************************************
 *
 *   Objetivo: Aprender a validar datos de entrada 
 *             Aprender a realizar operaciones aritméticas
 *             Aprender a emplear métodos del objeto Math
 *             Reforzar el aprendizaje en el uso de template strings (adicional)
 *             Reforzar en el aprendizaje de programación y casos de tests (adicional)
 *
 *   Tarea: Solicitar al usuario que visita la página dos números enteros 
 *          Mostrar en la consola del navegador el resultado de sumarlos, restarlos, multiplicarlos y dividirlos
 *
 *   Entrada : número entero (Number): numero1
 *             número entero (Number): numero2
 *
 *   Salida  : La suma de numero1 y numero2 es: numero1+numero2
 *             La resta de numero1 y numero2 es: numero1-numero2
 *             El producto de numero1 y numero2 es: numero1*numero2
 *             La division de numero1 entre numero2 es: numero1/numero2
 *
 *   Notas   : Ten en cuenta que la división entre los números puede dar un número con muchos decimales
 *             ¿Cómo podemos limitar el número de decimales que se mostrarán?
 *             ¿Qué pasa en Javascript cuando el divisor es cero?
 *
 ***************************************************************************************************************/
let n1=parseInt(prompt("Número 1: "))
while(isNaN(n1)||n1==0){
    n1=parseInt(prompt("Vuelva a introducir el número 1: "))
}
let n2=parseInt(prompt("Número 2: "))
while(isNaN(n2)||n2==0){
    n2=parseInt(prompt("Vuelva a introducir el número 2: "))
}

/*const sumar = function(n1,n2){
    return n1+n2;
}
const sumar=(n1,n2)=>n1+n2*/

/*function resultado(n1,n2){
    return `La suma de ${n1} y ${n2} es: ` + n1+n2 + 
    `\n La resta de ${n1} y ${n2} es: ` +  n1-n2 + 
    `\n El producto de ${n1} y ${n2} es: ` + n1*n2 + 
    `\n La división de ${n1} y ${n2} es: ` + Math.floor(n1/n2)
}
console.log(resultado(n1,n2))
En vez de poner la suma y la resta, pone 'NaN'*/

console.log(`La suma de ${n1} y ${n2} es: `, n1+n2)
console.log(`La resta de ${n1} y ${n2} es: `, n1-n2)
console.log(`El producto de ${n1} y ${n2} es: `, n1*n2)
console.log(`La división de ${n1} y ${n2} es: `, Math.floor(n1/n2))
