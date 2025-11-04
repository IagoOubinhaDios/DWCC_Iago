const minutosCocer = 10;

function numMinutos(numHuevos, capacidadOlla) {
  if (numHuevos > capacidadOlla) {
    minutos =
      numHuevos % capacidadOlla == 0
        ? minutosCocer * parseInt(numHuevos / capacidadOlla)
        : minutosCocer * parseInt(numHuevos / capacidadOlla + 1);
  } else {
    minutos = minutosCocer;
  }
  return minutos;
}

function numMinutosReduce(numHuevos, capacidadOlla){
    
}

let numHuevos = parseInt(prompt("Numero de huevos: "));
let capacidadOlla = parseInt(prompt("Capacidad olla: "));

console.log(
  `Se necesitarán ${numMinutos(numHuevos, capacidadOlla)} minutos de cocción.`
);
