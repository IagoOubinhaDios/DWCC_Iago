/***************************************************************************************************************
 *
 *   Objetivo: Reformar en lógica de programación
 *             Aprender nuevos métodos de String/Array
 *             Aprender a programar pensando en datos de entrada
 *             Reforzar en la programación funcional
 *             Reforzar en el uso de métodos de array
 *
 *   Tarea: Solicita un texto y una palabra.
 *
 *   Entrada : cadena de texto: texto
 *             cadena de texto: palabra
 *
 *   Salida  : Indica todas las posiciones en las que se encuentra la palabra dentro de texto
 *
 ***************************************************************************************************************/
function posicionesPalabra1(texto, palabra) {
  const posicionesPalabra = [];
  let posicion = texto.indexOf(palabra);
  while (posicion != -1) {
    posicionesPalabra.push(posicion);
    posicion = texto.indexOf(palabra, posicion + 1);
  }
  return posicionesPalabra;
}

function posicionesPalabra2(texto, palabra) {
  return texto
    .split(" ")
    .map((el, i) => (el == palabra ? i : -1))
    .filter((el) => el != -1);
}

let texto = prompt("Introduce un texto: ");
while (texto === "") {
  texto = prompt("Introduce un texto: ");
}
let palabra = prompt("Introduce una palabra para buscar dentro del texto: ");
while (palabra === "") {
  palabra = prompt("Introduce una palabra para buscar dentro del texto: ");
}

// const posiciones = posicionesPalabra1(texto, palabra);
const posiciones = posicionesPalabra2(texto, palabra);
console.log(
  posiciones.length == 0
    ? "No se ha encontrado la palabra en el texto"
    : `La palabra ${palabra} se encuentra en las posiciones ${posiciones}`
);
