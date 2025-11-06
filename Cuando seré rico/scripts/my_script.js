
function cuandoSereRico(dineroMaximo) {
  dineroDias = []; //Inicializamos el array donde guardaremos el dinero recibido cada día
  let dineroActual = 0; //Cantidad de dinero total que tendremos al final del día
  let continuar = true; //Boolean que nos indicará cuando debemos parar el bucle
  for (let i = 0; continuar; i++) {
    if (i <= 1) {
      dineroDias.push(1); //Si estamos en los 2 primeros días, recibimos un solo céntimo
      dineroActual += 1;
    } else {
      dineroDelDia = dineroDias[i - 2] * 2 + dineroDias[i - 1]; //De lo contrario, recibimos el doble de hace dos días + lo del día anterior
      dineroDias.push(dineroDelDia);
      dineroActual += dineroDelDia;
    }
    continuar = dineroActual >= dineroMaximo ? false : true; //Si ya tenemos el dinero que queremos o más, paramos el bucle, en caso contrario, seguimos
  }
  return dineroDias.length; //Devolvemos los días que ha tardado en obtener ese dinero en forma de la longitud del array de días
}

function cuandoSereRico2(dineroMaximo) {
  dineroDias = Array.from({length:(dineroMaximo)},(el, i) => i+1); //Inicializamos el array donde guardaremos el dinero recibido cada día
  let dineroActual = 0;
  let cantidadDias = 0;
  dineroDias.map((el, i) => {
    if (dineroActual < dineroMaximo) {
      i <= 1 ? (dineroDias[i] = i) : (dineroDias[i] = dineroDias[i - 2] * 2 + dineroDias[i - 1]);
      dineroActual += dineroDias[i];
    } else {
      console.log(dineroDias);
      cantidadDias = i;
      return cantidadDias; //Devolvemos los días que ha tardado en obtener ese dinero en forma de la longitud del array de días
    }
  });
}

let dineroTotal = parseInt(
  prompt("Introduce un número del 1 al 10000000000: ")
);

while (isNaN(dineroTotal) || dineroTotal < 1 || dineroTotal > 10000000000) {
  dineroTotal = parseInt(prompt("Introduce un número del 1 al 10000000000: "));
}

console.log(
  `Jaime ha tardado ${cuandoSereRico2(dineroTotal)} días en hacerse rico. ¡Que suerte!`
);
