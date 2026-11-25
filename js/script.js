
let tiempoTrabajo = 25;
let tiempoCorto = 5;
let tiempoLargo = 15;

let tiempoRestante = tiempoTrabajo * 60;
let sesionesCompletadas = 0;

let tipoSesion = "trabajo";
let intervalo = null;

// Elementos HTML
const tiempo = document.getElementById("tiempo");
const tipo = document.getElementById("tipoSesion");
const sesiones = document.getElementById("sesionesCompletadas");
const mensaje = document.getElementById("mensaje");

const iniciar = document.getElementById("iniciar");
const pausar = document.getElementById("pausar");
const reanudar = document.getElementById("reanudar");

// Mostrar el tiempo
function actualizarTiempo() {
    let minutos = Math.floor(tiempoRestante / 60);
    let segundos = tiempoRestante % 60;

    tiempo.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");
}

// Iniciar el temporizador
function iniciarTemporizador() {

    if (intervalo !== null) {
        return;
    }

    mensaje.textContent = "Temporizador en funcionamiento.";

    intervalo = setInterval(function () {

        tiempoRestante--;

        actualizarTiempo();

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            intervalo = null;

            reproducirSonido();
            cambiarSesion();
        }

    }, 1000);
}

// Pausar el temporizador
function pausarTemporizador() {

    clearInterval(intervalo);
    intervalo = null;

    mensaje.textContent = "Temporizador pausado.";
}

// Reanudar el temporizador
function reanudarTemporizador() {
    iniciarTemporizador();
}

// Cambiar entre trabajo y descansos
function cambiarSesion() {

    if (tipoSesion === "trabajo") {

        sesionesCompletadas++;
        sesiones.textContent = sesionesCompletadas;

        if (sesionesCompletadas % 4 === 0) {

            tipoSesion = "descansoLargo";
            tiempoRestante = tiempoLargo * 60;

            tipo.textContent = "Descanso largo";

        } else {

            tipoSesion = "descansoCorto";
            tiempoRestante = tiempoCorto * 60;

            tipo.textContent = "Descanso corto";
        }

    } else {

        tipoSesion = "trabajo";
        tiempoRestante = tiempoTrabajo * 60;

        tipo.textContent = "Tiempo de trabajo";
    }

    actualizarTiempo();

    mensaje.textContent = "Sesión finalizada. Presiona iniciar para continuar.";
}

// Reproducir sonido al finalizar
function reproducirSonido() {

    const sonido = new Audio("sonido/alarma.mp3");

    sonido.play();

}

document.getElementById("tiempoTrabajo").addEventListener("change", function () {

    if (this.value < 1) {
        this.value = 1;
    }

    tiempoTrabajo = Number(this.value);

    if (tipoSesion === "trabajo" && intervalo === null) {
        tiempoRestante = tiempoTrabajo * 60;
        actualizarTiempo();
    }
});

document.getElementById("tiempoCorto").addEventListener("change", function () {

    if (this.value < 1) {
        this.value = 1;
    }

    tiempoCorto = Number(this.value);

    if (tipoSesion === "descansoCorto" && intervalo === null) {
        tiempoRestante = tiempoCorto * 60;
        actualizarTiempo();
    }
});

document.getElementById("tiempoLargo").addEventListener("change", function () {

    if (this.value < 1) {
        this.value = 1;
    }

    tiempoLargo = Number(this.value);

    if (tipoSesion === "descansoLargo" && intervalo === null) {
        tiempoRestante = tiempoLargo * 60;
        actualizarTiempo();
    }
});

// Eventos de los botones
iniciar.addEventListener("click", iniciarTemporizador);

pausar.addEventListener("click", pausarTemporizador);

reanudar.addEventListener("click", reanudarTemporizador);

// Mostrar tiempo inicial
actualizarTiempo();
