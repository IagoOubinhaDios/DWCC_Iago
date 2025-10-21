/***************************************************************************************************************
 * 
 *   Objetivo: Mejorar en programación modular
 *             Mejorar en lógica de programación                      
 * 
 *   Tarea: El número de Euler, e ≈ 2,71828, puede ser representado como la siguiente suma infinita:
 *
 *                     e =1/0!+1/1!+1/2!+1/3!+1/4!+…
 *
 *          n! es el factorial de un numero entero n y es el producto de 1 hasta n (0!=1)
 *
 *                           4! = 4 * 3 * 2 * 1
 *
 *          Calcular el valor aproximado de "e" hasta que la diferencia entre dos sumandos
 *          consecutivos sea menor que 0,0001
 *
 *   Entrada : ---
 *
 *   Salida  : 2,71...
 *
 ***************************************************************************************************************/
function EulerIterativo(n){
    
}

function EulerRecursivo(n){
    if(n=0){
        return 1
    }


}

function EulerconArrayReduce(n){
    const numeros=Array.from({length:n},(el,i)=>i+1)
}

let num=parseInt(prompt("Introduce el número:"))
while(isNaN(num) && num===""){
    num=parseInt(prompt("Introduce el número:"))
}
