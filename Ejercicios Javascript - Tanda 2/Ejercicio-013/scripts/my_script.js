/***************************************************************************************************************
 *
 *   Objetivo: Practicar en el uso de los objetos String y Array
 *             Practicar en el uso de programación funcional
 *
 *   Tarea: Crear dos funciones. Una para validar bit de paridad par y otra para validar bit de paridad impar
 * 
 *           En caso de paridad par:
 *             Si el número de unos es impar, el último bit debe ser un 1
 *             Si el número de unos es par, el último bit debe ser un 0
 * 
 *          En caso de paridad impar:
 *             Si el número de unos es impar, el último bit debe ser un 0
 *             Si el número de unos es par, el último bit debe ser un 1
 *
 *   Entrada : 10110010   (multiplos de 8 caracteres)
 *
 *   Salida  : true (validar paridad impar) o false (validar partidad par) 
 *
 ***************************************************************************************************************/
let bit = prompt("Introduce el bit: ")
while(isNaN(bit) || bit===""){
    bit = prompt("Introduce el bit: ")
}
const bitArray=bit.split('')
if (bitArray.every(el=>el==0||el==1)){
    nUnos=bitArray.filter(el=>el==1).length
    nUnos%2==0&&bitArray[bitArray.length-1]==1
}