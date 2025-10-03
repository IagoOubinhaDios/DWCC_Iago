/***************************************************************************************************************
 *
 *   Objetivo: Mejorar en la lógica de programación
 *
 *   Tarea: Obtener la secuencia más larga de ceros indicando la posición de inicio. En caso de que existan varias,
 *          se indicará la primera.
 *
 *   Entrada : "011000010110000"
 *
 *   Salida  : Secuencia: "0000"   Posicion: 3
 *
 ***************************************************************************************************************/
function contar1(cadena, letra){
    let buscar=letra
    while(cadena.indexOf(buscar)!=-1){
        buscar+=letra;
    }
    return `Cadena: ${cadena}, 
    Secuencia: ${buscar.slice(0,-1)}, 
    Posicion: ${cadena.indexOf(buscar.slice(0,-1))}`;
}

function contarIguales(posicion, cadena, letra){
    let pos=posicion
    while(cadena[pos]==letra){
        pos++
    }
    return pos-posicion+1
}

function contar2(cadena, letra){
    let contador=0
    let contadorMax=0
    for(let i=0; i<cadena.length;i++){
        contador=contarIguales(i,cadena,letra);
        if(contador>contadorMax){ contadorMax=contador }
    }
    return `Cadena: ${cadena}, 
    Secuencia: ${letra.repeat(contadorMax-1)}, 
    Posicion: ${cadena.indexOf(letra.repeat(contadorMax-1))}`;
}

// function secuenciaMasLargaCeros1(secuencia) {
//     let secuenciaCerosComprobar = "0";
//     let secuenciaCeros = "";
//     while(secuencia.includes(secuenciaCerosComprobar)){
//         secuenciaCeros = secuenciaCerosComprobar;
//         secuenciaCerosComprobar += "0";
//     }
//     return `Cadena: ${secuencia}, 
//             Secuencia: ${secuenciaCeros}, 
//             Posicion: ${secuencia.indexOf(secuenciaCeros)}`;
// }

let secuencia = prompt("Introduce una secuencia: ");
while (isNaN(secuencia) && secuencia === "") {
    secuencia = prompt("Introduce una secuencia: ");
}
console.log(`${contar1(secuencia, "0")}`);
console.log(`${contar2(secuencia, "0")}`);
