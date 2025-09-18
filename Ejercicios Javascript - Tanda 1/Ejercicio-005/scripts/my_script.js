/***************************************************************************************************************
 *
 *   Objetivo: Aprender a emplear operadores aritméticos
 *             Reforzar en el uso de métodos del objeto Math
 *             Aprender a emplear métodos adicionales del objeto Math
 *             Aprender a definir y usar funciones declaradas (adicional)
 *             Aprender a definir y usar funciones expresadas (adicional)
 *             Mejorar en el aprendizaje de programación (adicional)
 *  
 *   Tarea: Cada vez más están ofreciendo cuentas corrientes remuneradas en los bancos. 
 *          Estas cuentas se rigen por la regla de interés compuesto:
 * 
 *               T=C*(1+r/n)^(nt)
 * 
 *         donde:
 * 
 *               T: La cantidad total al final de la inversión
 *               C: El capital inicial
 *               r: es el interés anual
 *               t: número de años que se invierte la cantidad
 *               n: número de veces que se cobran los intereses en el año (normalmente 12 en las cuentas corrientes remuneradas)        
 * 
 *          Solicitar los datos para poder calcular la cantidad total de la inversión 
 *          Mostrar un mensaje con el resultado
 *
 *   Entrada : T, C, r ,t, n
 *
 *   Salida  : Un mensaje indicando cual será la cantidad total al final de la inversión
 *
 *         1500 euros invertidos al 4.3% por 6 años cobrando intereses 4 veces al año hacen 1938.84 euros           
 * 
 *   Adicional: Crear una versión que funcione a la inversa: determiunar la cantidad inicial que 
 *              deberíamos invertir para alcanzar un determinado objetivo final
 * 
 ***************************************************************************************************************/
function calcularInteresCompuesto(C, r, t, n) {
    let T = C * Math.pow(1 + r / n, n * t);
    return Math.round(T * 100) / 100;
}

const mostrarResultado = function(C, r, t, n, T) {
    const rPorcentaje = r * 100;
    console.log(`${C} euros invertidos al ${rPorcentaje}% por ${t} años cobrando intereses ${n} veces al año hacen ${T} euros.`);
};

let C = parseFloat(prompt("Introduce el capital inicial (€):"))
let r = parseFloat(prompt("Introduce el interés anual (%):")) / 100
let t = parseInt(prompt("Introduce el número de años de la inversión:"))
let n = parseInt(prompt("Introduce cuántas veces se cobran los intereses al año:"))

if (isNaN(C) || C <= 0 || isNaN(r) || r <= 0 || isNaN(t) || t <= 0 || isNaN(n) || n <= 0) {
    console.log("Entrada inválida. Asegúrate de introducir valores numéricos positivos.")
} else {
    const T = calcularInteresCompuesto(C, r, t, n)
    mostrarResultado(C, r, t, n, T)
}
