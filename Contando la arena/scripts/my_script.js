function numBase1(num) {
  let numBase1 = "";
  for (let i = 0; i < num; i++) {
    numBase1 += "1";
  }
  return numBase1;
}

function numBase1Reduce(num) {
  return Array.from({ length: num-1 }, (el, i) => 1).reduce((anterior, actual) => anterior + actual,"1");
}

let num = parseInt(prompt("Numero en base 10: "));

console.log(`${numBase1(num)}, ${numBase1Reduce(num)}`);
