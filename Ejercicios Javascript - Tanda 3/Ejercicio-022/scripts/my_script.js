/***************************************************************************************************************
 *
 *   Objetivo: Aprender a abordar el problema de diferentes formas determinando las ventajas/inconvenientes
 *             Mejorar en la lógica de programación
 *             
 *   Tarea: Solicitamos un número entero n positivo. 
 *          Si n es par, se divide por 2 y su n es impar se multiplica por tres y suma uno. 
 *          El proceso se repite hasta que n tenga el valor de 1.
 * 
 *             Por ejemplo, la secuencia para n=3 será:
 *
 *                  3--> 10 --> 5 --> 16 --> 8 --> 4 --> 2 --> 1
 *
 *   Entrada : numero entero n entre 1 y 100
 *
 *   Salida  : La secuencia de valores obtenida
 *
 ***************************************************************************************************************/
function secuenciaValoresIterativa1(num){
    const secuencia=[num]
    let nuevoNum=num
    while(nuevoNum!=1){
        nuevoNum%2==0 ? nuevoNum/=2 : nuevoNum=nuevoNum*3+1
        secuencia.push(nuevoNum)
    }
    return secuencia
}

function secuenciaValoresIterativa2(num){
    let secuencia=`${num}`
    let nuevoNum=num
    while(nuevoNum!=1){
        nuevoNum%2==0 ? nuevoNum/=2 : nuevoNum=nuevoNum*3+1
        secuencia+=`--> ${nuevoNum}`
    }
    return `${secuencia}`
}

function secuenciaValoresRecursiva1(num){
    if(num==1){
        return num
    }
    num%2==0 
    ? `${num}--> ${secuenciaValoresRecursiva1(num/2)}` 
    : `${num}--> ${secuenciaValoresRecursiva1(num*3+1)}`
}

function secuenciaValoresRecursiva2(secuencia){
    let num=secuencia[secuencia.length-1]
    if(num==1){
        return secuencia
    }
    num%2==0 
    ? secuencia.push(n/2)
    : secuencia.push(n*3+1)

    return secuenciaValoresRecursiva2(secuencia)
}

function secuenciaValoresRecursiva3(...secuencia){
    let num=secuencia[secuencia.length-1]
    if(num==1){
        return secuencia
    }
    num%2==0 
    ? secuencia.push(n/2)
    : secuencia.push(n*3+1)

    return secuenciaValoresRecursiva3(...secuencia)
}

let num=parseInt(prompt("Introduce un número entre 1y 100"))
while(isNaN(num) && num==="" && num<1 && num>100){
    num=parseInt(prompt("Introduce un número entre 1y 100"))
}
console.log(`${secuenciaValoresIterativa1(num)} 
          \n ${secuenciaValoresIterativa2(num)}
          \n ${secuenciaValoresRecursiva1(num)}`)
