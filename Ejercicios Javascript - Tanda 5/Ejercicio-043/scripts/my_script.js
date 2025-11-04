/***************************************************************************************************************
 *
 *   Objetivo: Mejorar en el aprendizaje de arrays multidimensionales
 *             Mejorar en la programación funcional
 *
 *   Tarea: Generar una matriz con números aleatorios entre -100 y 100 (ambos incluídos)
 *          Generar la matriz traspuesta: T(i,j)=A(j,i)
 *
 *    Entrada : número entero: número de filas
 *              número entero: número de columnas
 *
 *    Salida  : La matriz generada y la traspuesta
 *
 ***************************************************************************************************************/
const animales = [
  {
    tipo: "perro",
    edad: 2,
    nombre: "Kuki",
  },
  {
    tipo: "gato",
    edad: 3,
    nombre: "Kairi",
  },
  {
    tipo: "perro",
    edad: 4,
    nombre: "Millas",
  },
  {
    tipo: "perro",
    edad: 1,
    nombre: "Vicky",
  },
  {
    tipo: "gato",
    edad: 5,
    nombre: "Sora",
  },
];

const edadMediaRaza = animales.reduce((anterior, actual) => {
    let registro = anterior.find((el) => el.tipo == actual.tipo);
    if (registro) {
      registro.edadMedia += actual.edad;
    } else {
      anterior.push({
        tipo: actual.tipo,
        numEspecies: 1,
        edadMedia: actual.edad,
      });
    }
    return [...anterior];
  }, []).map((animal) => {
    return {
      tipo: animal.tipo,
      edadMedia: animal.edadMedia / animales.filter((el) => el.tipo == animal.tipo).length,
    };
  });

const edadesTotales = [];
for (let i = 0; i < animales.length; i++) {
  let registro = edadesTotales.find((el) => el.tipo == animales[i].tipo);
  if (!registro) {
    edadesTotales.push({
      tipo: animales[i].tipo,
      edadTotal: animales[i].edad,
    });
  } else {
    registro.edadTotal += animales[i].edad;
  }
}

const edadMediaRaza2 = edadesTotales.map(animal=>{
    let totalAnimales = animales.filter(el=>el.tipo==animal.tipo).length;
    return {
        tipo: animal.tipo,
        edadMedia: animal.edadTotal/totalAnimales
    };
})

console.log(edadMediaRaza, edadMediaRaza2);
