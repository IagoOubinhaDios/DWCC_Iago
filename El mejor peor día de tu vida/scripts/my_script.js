function mejorPeorDía(valoresDias) {
  const valores = valoresDias.split(" ");
  const valoresMejorDia = valores;
  let mejorDia = 0;
  for (let i = 0; i < valores.length; i++){
    valores[i] > mejorDia ? mejorDia = valores[i] : mejorDia;
  }

  let mejorDiaPorVivir = true;
  let diaMasValor = valores.map((el, i) => {
      if (el >= mejorDia) {
        mejorDiaPorVivir = false;
      }
      mejorDiaPorVivir ? 0 : mejorDia - el;
    }).reduce((anterior, actual) => (actual > anterior ? actual : anterior), 0);
  return valores;
}

let valoresDias = prompt("Introduce valor de los días:");

console.log(mejorPeorDía(valoresDias));
