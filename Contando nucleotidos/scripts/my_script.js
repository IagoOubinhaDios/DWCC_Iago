
function sacarADN(texto){
    let resultado=`<<${texto}>> ->`
    const caracteres=texto.split('')
    const ADN=Array.from(new Set("GTCA".split('')))
    if (ADN.every(el=>"AGTC".includes(el))){
        const numLetras=[]
        caracteres.forEach(letra=>{
            let elemento=numLetras.find(el=>el.letra==letra)
            if(!elemento){
                numLetras.push({
                    letra:letra,
                    num:1
                })
            } else{
                elemento.num++
            }
        })
        numLetras.filter(el=>resultado+=` <<${el.letra}>> -> ${el.num}`)
    } else{
        resultado+=` error`
    }
    return resultado
}

let texto=prompt("Introduce la palabra:")
while (texto===""){
    texto=prompt("Introduce la palabra:")
}

console.log(sacarADN(texto))