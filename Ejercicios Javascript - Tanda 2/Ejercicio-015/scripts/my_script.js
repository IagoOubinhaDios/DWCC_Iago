/***************************************************************************************************************
 *
 *   Objetivo: Aprender a modificar el documento HTML. Inicialización al DOM.
 *             Reforzar en el uso de template strings
 *             Reforzar el uso de estructuras de control repetitivas y condicionales
 *             Reforzar en la validación de datos de entrada
 *             Reforzar en la estructuración de código
 *
 *   Tarea: Solicitaremos un número entero entre 1 y 9
*           Mostrar la tabla de multiplicar de ese número
 *
 *   Entrada : numero     1 <= numero <= 9
 *
 *   Salida  : 1 x numero = n
 *             2 x numero = ....
 *             3 x numero = ....
 *                   ....
 *             9 x numero = ....
 *
 *   Nota: Formatea la salida en el documento HTML empleando una tabla con 5 columnas y nueve filas
 *
 ***************************************************************************************************************/
function tablaConsola(num){
    let tabla=""
    for (let i=1;i<=10;i++){
        tabla+=`\n${i} x ${num} = ${i*num}`
    }
    return tabla
}

function tablaHTML(num){
    let tabla="<table>"
    for (let i=1;i<=10;i++){
        tabla+=`<tr>
        <td>${i} x ${num} = ${i*num}</td>
        </tr>`
    }
    tabla+="</table>"
    return tabla

}

function tablaHTMLMap(num){
    let tabla="<table>"
    const numeros=Array.from({length:10},(el,i)=>i+1)
    tabla+=numeros.map(el=>`<tr>
        <td>${el} x ${num} = ${el*num}</td>
        </tr>`).join('')
    tabla+="</table>"
    return tabla
}

function tablaHTMLReduce(num){
    let tabla=""
    const numeros=Array.from({length:10},(el,i)=>i+1)
    tabla+=numeros.reduce((anterior,actual)=>anterior+`<tr>
        <td>${actual} x ${num} = ${actual*num}</td>
        </tr>`,'<table>')
    tabla+="</table>"
    return tabla
}

let num=parseInt(prompt("La tabla del:"))
while(isNaN(num) || num==="" || num<1 || num>9){
    num=parseInt(prompt("La tabla del:"))
}

console.log(tablaConsola(num))
document.querySelector("body").innerHTML=tablaHTML(num)
document.querySelector("body").innerHTML=tablaHTMLMap(num)
document.querySelector("body").innerHTML=tablaHTMLReduce(num)