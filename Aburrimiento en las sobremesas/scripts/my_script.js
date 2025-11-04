
function numCerillas(numLados){
    // const piramide = Array.from({length:numLados}, (el, i) => (i+1)*3);
    // let numCerillas = piramide.reduce((anterior, actual) => anterior+actual, 0)
    // return numCerillas;
    return Array.from({length:numLados}, (el, i) => (i+1)*3).reduce((anterior, actual) => anterior+actual, 0);
} 

let numPisos = parseInt(prompt("Introduce un número del 1 al 20000: "));
while (isNaN(numPisos) || numPisos < 1 || numPisos > 20000){
    numPisos = parseInt(prompt("Introduce un número del 1 al 20000: "));
};

console.log(`Se necesitarán ${numCerillas(numPisos)} para formar el triángulo`);