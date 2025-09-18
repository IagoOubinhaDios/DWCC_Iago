/***************************************************************************************************************
 *
 *   Objetivo: Reforzar lógica de programación
 *             Reforzar en el uso de métodos del obejto window y console
 *             Reforzar el aprendizaje en el uso de operaciones matemáticas
 *
 *   Tarea: Solicitar el número de caramelos y el número de niños
 *          Calcular cuantos caramelos tocan por niño y cuantos sobran
 *
 *   Entrada : número entero positivo: nCaramelos 
 *             número entero positivo: nPeques
 *
 *   Salida  : Mostrar el resultado por consola con un mensaje como
 * 
 *                   El número de caramelos por niño es: XXXX
 *                   El número de caramelos que sobran es: YYYY
 *
 ***************************************************************************************************************/
let nCaramelos=parseInt(prompt("Número de caramelos: "))
while(isNaN(nCaramelos) || nCaramelos < 0 || nCaramelos===""){
    nCaramelos=parseInt(prompt("Número de caramelos: "))
}
let nPeques=parseInt(prompt("Número de niños: "))
while (isNaN(nPeques) || nPeques <= 0 || nPeques===""){
    nPeques=parseInt(prompt("Número de niños: "))
}
let porNinho = Math.floor(nCaramelos / nPeques);
let sobrantes = nCaramelos % nPeques;
console.log(`El número de caramelos por niño es: ${porNinho}`);
console.log(`El número de caramelos que sobran es: ${sobrantes}`);

