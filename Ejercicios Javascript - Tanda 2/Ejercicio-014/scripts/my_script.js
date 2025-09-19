/***************************************************************************************************************
 *
 *   Objetivo: Reforzar en el uso de estructuras de control repetitivas.
 *             Reforzar en el uso de funciones definidas por el usuario.
 *             Aprender diferentes formas de crear arrays (adicional)
 *             Entender las funciones anónimas y funciones flecha o arrow functions (adicional)
 *             Aprender a emplear métodos del objeto Array para programación funcional (adicional)
 *
 *   Tarea: Solicitamos un número entero n al usuario 
 *          Mostramos en la consola los numeros pares desde 2 hasta ese numero
 * 
 *          Realizar 4 versiones: con for, while, do..while, con arrays y el método join
 *
 *   Entrada : numero entero n, n>=2
 *
 *   Salida  : 2, 4, 6, ..., n  (incluidas las coma y el espacio detras de cada número excepto el último)
 *
 ***************************************************************************************************************/
function conFor(num){
    let resultado=""
    for (let i=1;i<=num;i++){
        if (i%2==0){
            resultado+=(i!=num && i!=num-1)?`${i}, `:i
        }
    }
    return resultado
}

function conWhile(num){
    let resultado=""
    let i=1
    while(i<=num){
        if (i%2==0){
            resultado+=(i!=num&&i!=num-1)?`${i}, `:i
        }
        i++
    }
    return resultado
}

function conDoWhile(num){
    let resultado=""
    let i=1
    do {
        if (i%2==0){
            resultado+=(i!=num&&i!=num-1)?`${i}, `:i
        }
        i++
    } while(i<=num)
    return resultado
}

function conArrays(num){
    let resultado=""
    let numeros=Array.from({length:num},(el,i)=>i+1)
    resultado+=numeros.map(el=>el%2==0?el:'').join()
    return resultado
}

let num = parseInt(prompt("Introduce un número mayor o igual a 2: "))
while(isNaN(num) || num==="" || num<2){
    num = parseInt(prompt("Introduce un número mayor o igual a 2: "))
}
let resultado="Con for => "+conFor(num)
resultado+="\nCon while => "+conWhile(num)
resultado+="\nCon do while => "+conDoWhile(num)
resultado+="\nCon arrays y join => "+conArrays(num)
console.log(resultado)


