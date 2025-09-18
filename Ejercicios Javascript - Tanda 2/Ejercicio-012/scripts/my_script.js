/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de estructuras de programación repetitivas
 *             
 *   Tarea: Se solicita un número entero n entre 1 y 20 al usuario. 
 *          Se mostrará una pirámide de la siguiente forma:
 *
 *               1
 *               2 2
 *               3 3 3
 *               4 4 4 4
 *                 ...
 *               n n n n n n n (n veces)
 *
 *          Realizar en ejercicio con for, while, do while
 * 
 *   Entrada : numero entero: n
 *
 *   Salida  : La pirámide mostrada en la tarea del ejercicio
 *
 ***************************************************************************************************************/
let num=parseInt(prompt("Introduce un número del 1 al 20"))
while(isNaN(num) || num==="" || num<1 || num>20){
    num=parseInt(prompt("Introduce un número del 1 al 20"))
}
let piramide = ''

for(let x=1;x<=num;x++){
    for(let i=1; i<=x; i++){
        piramide+=`${x}`
    }
    piramide+='\n'
}
console.log(piramide)