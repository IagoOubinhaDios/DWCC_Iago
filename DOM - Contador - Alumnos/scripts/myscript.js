const $d = document,
//   $bDecrementar = $d.querySelector("#minus"),
//   $bResetear = $d.querySelector("#reset"),
//   $bIncrementar = $d.querySelector("#plus"),
  $bContenedor = $d.querySelector(".button-contenedor"),
  $contador = $d.querySelector("#valor"),
  $colorCero = getComputedStyle($contador).color;

let num = parseInt($contador.textContent);

$bContenedor.addEventListener("click", (ev) => {
    ev.preventDefault();
    switch(ev.target.id){
        case "plus":
            num++;
            break;
        case "reset":
            num=0;
            break;
        case "minus":
            num--;
            break;        
    }
    $contador.textContent = num;
    actualizaColor($contador, num);
})

// $bDecrementar.addEventListener("click", (ev) => {
//     ev.preventDefault();
//     num--;
//     renderContador(num);
// })

// $bResetear.addEventListener("click", (ev) => {
//     ev.preventDefault();
//     num = 0;
//     renderContador(num);
// })

// $bIncrementar.addEventListener("click", (ev) => {
//     ev.preventDefault();
//     num++;
//     renderContador(num);
// })

function actualizaColor(el, valor){
    switch(true){
        case valor>0:
            el.style.color = "green";
            break;
        case valor<0:
            el.style.color = "red";
            break;
        case valor==0:
            el.style.color = $colorCero;    
            break;    
    }
}