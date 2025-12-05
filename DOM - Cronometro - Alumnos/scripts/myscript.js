const $d = document,
$contenedor = $d.querySelector(".contenedor"),
$horas = $contenedor.querySelector(".horas"),
$minutos = $contenedor.querySelector(".minutos"),
$segundos = $contenedor.querySelector(".segundos"),
$reset = $d.querySelector("#reset"),
$start = $d.querySelector("#start");

let control;

let segundos = 0;
let minutos = 0;
let horas = 0;

$start.addEventListener("click", ev => {
	$start.textContent.toUpperCase() == "START" || $start.textContent.toUpperCase() == "CONTINUE" ? empezar() : parar();
});

function empezar() {
    cronometro();
	control = setInterval(cronometro, 1000);
	$start.textContent = "STOP";

}

function parar() {
	clearInterval(control);
    $start.textContent = "CONTINUE";
}

$reset.addEventListener("click", ev => {
    clearInterval(control);
	segundos = 0;
	minutos = 0;
	horas = 0;
	$segundos.innerHTML = "00";
	$minutos.innerHTML = "00";
	$horas.innerHTML = "00";
    $start.textContent = "START";
})

function cronometro () {
    segundos++;
    if (segundos < 10) { segundos = `0${segundos}` }
    $segundos.innerHTML = segundos;
	if (segundos == 59) {
		segundos = -1;
	}
	if ((segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = `0${minutos}` }
		$minutos.innerHTML = minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = `0${horas}` }
		$horas.innerHTML = horas;
	}
}