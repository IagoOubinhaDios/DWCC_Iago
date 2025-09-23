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
function secuenciaValores1(num){
    const secuencia=[num]
    let nuevoNum=num
    do{
        if(nuevoNum%2==0){
            nuevoNum/=2
        }else{
            nuevoNum=nuevoNum*3+1
        }
        secuencia.push(nuevoNum)
    }while(nuevoNum!=1)
    return secuencia
}

function secuenciaValores2(num){
    // const secuencia=[num]
    
    // return secuencia
}

let num=parseInt(prompt("Introduce un número entre 1y 100"))
while(isNaN(num) && num==="" && num<1 && num>100){
    num=parseInt(prompt("Introduce un número entre 1y 100"))
}
console.log(secuenciaValores1(num))
