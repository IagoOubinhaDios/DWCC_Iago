/***************************************************************************************************************
 *
 *   Objetivo: Aprender a plantearse diferentes formas de resolver un problema
 *             Practicar la programación iterativa y recursiva
 *             Valorar diferentes métodos de resolución de problemas, sus ventajas e inconvenientes
 *             Aprender a emplear funciones definadas por el usuario
 *
 *   Tarea: Mostrar la serie de Fibonacci hasta el número indicado por el usuario
 *          Cada elemento de la serie de Fibonacci se calcula sumando los dos anteriores.
 *          Los dos primeros elementos de la serie son 0 y 1
 *
 *          Realizar dos versiones: la versión iterativa y la recursiva
 *
 *   Entrada : n
 *
 *   Salida  : 0,1,2,3,5,8,13,....
 *
 ***************************************************************************************************************/
function iterativoFibonacci1(tamaño) {
  const cadena = [];
  for (let i = 0; i <= tamaño - 1; i++) {
    if (i <= 1) {
      cadena.push(i);
    } else {
      cadena.push(cadena[i - 2] + cadena[i - 1]);
    }
  }
  return cadena;
}

function recursivoFibonacci1(tamaño, posicion, cadena) {
  if (posicion <= 1) {
    cadena.push(posicion);
  } else {
    cadena.push(cadena[posicion - 2] + cadena[posicion - 1]);
  }
  if (posicion + 1 < tamaño) {
    recursivoFibonacci1(tamaño, posicion + 1, cadena);
  }
  return cadena;
}

function iterativoFibonacci2(tamaño) {
  const cadena = Array.from({ length: tamaño });
  cadena.map((el, i) =>
    i <= 1 ? (cadena[i] = i) : (cadena[i] = cadena[i - 2] + cadena[i - 1])
  );
  return cadena;
}

// function recursivoFibonacci2(tamaño, posicion, cadena) {
  
// }

console.log(`${iterativoFibonacci1(17)}\n`,`${recursivoFibonacci1(14, 0, [])}\n`,`${iterativoFibonacci2(15)}`);
