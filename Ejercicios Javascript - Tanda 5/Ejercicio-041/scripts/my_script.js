/***************************************************************************************************************
 *
 *   Objetivo:
 *
 *   Tarea: Sumar los elementos de las dos diagonales de una matriz bidimensional.
 *          Se genera una matriz de las dimensiones indicadas con números aleatorios
 *          entre -100 y 100 (ambos incluídos)
 *
 *   Entrada : La dimension de la matriz (número de filas y columnas)
 *
 *   Salida  : La matriz generadas y la suma de las dos diagonales de la misma
 *
 ***************************************************************************************************************/
const aleatorio = (min, max) =>
  Math.floor(min + (max - min + 1) * Math.random());

const matriz = Array.from({ length: 2 }, (el) =>
  Array.from({ length: 2 }, (el) => aleatorio(-100, 100))
);

let sumaDiagonalMatriz = matriz.reduce(
  (anterior, actual, i) =>
    anterior +
    actual.reduce((before, now, j) => (i == j ? before + now : before), 0),
  0
);

let sumaDiagonalMatrizReducido = matriz.reduce((anterior, actual, i) => anterior + actual[i], 0);

let sumaDiagonalInversa = matriz.reduce(
  (anterior, actual, i) =>
    anterior +
    actual.reduce((before, now, j) => (i == matriz.length - 1 -j ? before + now : before), 0),
  0
);

let sumaDiagonalInversaReducido = matriz.reduce((anterior, actual, i) => anterior + actual[actual.length-1-i], 0);

let sumaDiagonales = matriz.reduce((anterior, actual, i) => anterior + actual[i] + actual[actual.length-1-i], 0);

console.log(matriz, sumaDiagonalMatriz, sumaDiagonalMatrizReducido, sumaDiagonalInversa, sumaDiagonalInversaReducido, sumaDiagonales);

// nFilas=10;
// nCol=10;
// const matriz2 = [];
// for (let i = 0; i<nFilas; i++){
//     matriz2[i]=[];
//     for(let j = 0; j<nCol; j++){
//         matriz2[i][j]=aleatorio(-100,100);
//     }
// }
