function comprobarVolumen(numProblema) {
  return numProblema < (numProblema / 100).toFixed() * 100
    ? (numProblema / 100).toFixed() - 1
    : (numProblema / 100).toFixed();
}

let numProblema = parseInt(prompt("Introduce un número entre 100 y 99999"));
while (isNaN(numProblema) || numProblema < 100 || numProblema > 99999) {
  numProblema = parseInt(prompt("Introduce un número entre 100 y 99999"));
}

console.log(
  `El problema ${numProblema} está en el volumen ${comprobarVolumen(numProblema)}`
);
