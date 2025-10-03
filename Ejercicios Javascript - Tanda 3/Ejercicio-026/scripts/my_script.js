/***************************************************************************************************************
 *
 *   Objetivo: Aprender a buscar soluciones "no clásicas"
 *             Conocer métodos del objeto String
 *             Resolver problemas empleando programación funcional
 *
 *   Tarea: Mostrar un array de cadenas en forma rectangular
 *
 *   Entrada : una frase de texto
 *             P. ej.: Hola Mundo en un cuadrado
 *
 *   Salida  : la frase en un cuadrado
 * 
 *              ************
 *              * Hola     *
 *              * Mundo    *
 *              * en       *
 *              * un       *
 *              * cuadrado *
 *              ************
  *
 ***************************************************************************************************************/
function textoCuadradoMal(texto){
    let resultado="************\n"
    const palabras=texto.split(" ")
    palabras.forEach(element => {
        resultado+=`* ${element} *\n`
    });
    resultado+="************"
    return resultado
}

function textoCuadradoBien(texto){
    const sizes=texto.split(' ').map(palabra=>palabra.length)
    let maxSize=Math.max(...sizes)
    const cadenas=texto.split(' ')
                       .map(palabra=>`* ${palabra}${" ".repeat(maxSize-palabra.length)} *\n`)
                       .join('')+"*".repeat(maxSize+4)+"\n"
    return cadenas
}

let texto=prompt("Introduce un texto:")
while(texto===""){
    texto=prompt("Introduce un texto:")
}

console.log(`${textoCuadradoMal(texto)} \n ${textoCuadradoBien(texto)}`)



