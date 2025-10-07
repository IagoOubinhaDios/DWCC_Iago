const puntuacion={
    AEIOULNRST:1,
    DG:2,
    BCMP:3,
    FHVWY:4,
    JX:8,
    QZ:10
    }

function sacarPuntos(texto){
    let puntos = 0
    const caracteres = texto.split('')
    const claves = Object.keys(puntuacion)
    // caracteres.forEach(letra=>
    //     {
    //         puntos += puntuacion[claves.find(el=>el.includes(letra))]
    //     }
    // )
    // caracteres.reduce((anterior,actual)=>anterior+puntuacion[claves.find(el=>el.includes(actual))],0)

    const ptosLetra = []
    caracteres.forEach(letra=>{
        let elemento=ptosLetra.find(el=>el.letra==letra)
        if (!elemento){
            ptosLetra.push({
                letra:letra,
                puntos:puntuacion[claves.find(el=>el.includes(letra))]
            })
        } else{
            elemento.puntos+=puntuacion[claves.find(el=>el.includes(letra))]
        }
        puntos+=puntuacion[claves.find(el=>el.includes(letra))]
    })
    return {
        total:ptosLetra.reduce((anterior,actual)=>anterior+actual.puntos,0),
        ptosLetra
    }
}

let texto = prompt("Introduce la palabra:")
while (texto===""){
    texto = prompt("Introduce la palabra:")
}

console.log(`El texto ${texto} vale ${sacarPuntos(texto.toUpperCase())} puntos.`)
