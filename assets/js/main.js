let jugadaUser = ''
let cantdejuegos = 0
let juegoNumero = 0

document.addEventListener('DOMContentLoaded',(event)=> {
    document.getElementById('rock').addEventListener('click',()=> selectitem('piedra'));
    document.getElementById('paper').addEventListener('click',()=> selectitem('papel'));
    document.getElementById('scissors').addEventListener('click',()=> selectitem('tijera'));
    document.getElementById('cachipun').addEventListener('click',iniciarjuego);
    document.getElementById('uno').addEventListener('click',selectcant);
    document.getElementById('dos').addEventListener('click',selectcant);
    document.getElementById('tres').addEventListener('click',selectcant);
})
function selectcant (e){
    const selectcant = e.target.value
    juegoNumero = selectcant
    console.log(juegoNumero)
}
function selectitem(game){
    jugadaUser = game
    document.getElementById('resultado').innerHTML = `Haz elegido ${jugadaUser}`
    // jugadas consecutivas//
    if (cantdejuegos>1){
        iniciarjuego()
    }
}
//Jugada automatica con Math.random() 
function obtenerJugadaMaquina() {
    const jugadas = ['piedra', 'papel', 'tijera'];
    const indice = Math.floor(Math.random() * 3);
    return jugadas[indice];
}
// jugadas[1=piedra][2=papel][3=tijera]

   function ejecutarJuego() {
    const jugadaMaquina = obtenerJugadaMaquina();
    const ganador = determinarGanador(jugadaUser, jugadaMaquina);
    console.log(juegoNumero);
    juegoNumero = juegoNumero - cantdejuegos + 1;
    console.log(juegoNumero);

    mostrarResultado(ganador, jugadaUser, jugadaMaquina, juegoNumero);

    cantdejuegos--;

    // Seleccionar el botón por su id
    const cachipun = document.getElementById('cachipun');

    if (cantdejuegos > 1) {
        cachipun.disabled = true;
        document.getElementById('resultado').innerHTML += '<spam id="jugada">Elige tu siguiente jugada.</spam><br><br>';
    } else {
        cachipun.disabled = false;
        jugadaUser = '';
    }
}
function determinarGanador(jugadaUser, jugadaMaquina) {

    if (jugadaUser === jugadaMaquina) {
        return '¡Es un empate!';
    } else if (
        (jugadaUser === 'piedra' && jugadaMaquina === 'tijera') ||
        (jugadaUser === 'papel' && jugadaMaquina === 'piedra') ||
        (jugadaUser === 'tijera' && jugadaMaquina === 'papel')
    ) {
    
        return 'Usuario';
    } else { 
      
        return 'Máquina';
        
    }
}
//verificación jugada
function iniciarjuego() {
    if (jugadaUser==='') {
       
        document.getElementById('resultado').innerHTML = 'Para comenzar selecciona Piedra, Papel o Tijeras. <br>';
        return; // Salir de la función si no se ha seleccionado una jugada
    }
    const cantidad = juegoNumero;
    if (cantidad <= 0) {
        document.getElementById('resultado').innerHTML = 'Indica la cantidad de jugadas.<br>';
        return;
    }


    // esta parte limpia el contenido de 'resultado' para así mostrar los resultados de los nuevos juegos
    document.getElementById('resultado').innerHTML = '';

    cantdejuegos = cantidad; // Establecer la cantidad de juegos restantes
    ejecutarJuego(); // Iniciar el primer juego


    jugadaUser = '';
    
}

//mostrar resultados de la partida en el html
function mostrarResultado(ganador, jugadaUser, jugadaMaquina, juegoNumero) {
    const resultados = document.getElementById('resultado');
    let mensaje = `Juego ${juegoNumero}: <br>Tu jugada: ${jugadaUser}. <br>Jugada de la máquina: ${jugadaMaquina}. `;
console.log(ganador)
console.log(jugadaUser)
console.log(jugadaMaquina)
console.log(juegoNumero)
    if (ganador === 'Empate') {
        mensaje += '<br><span>¡Es un empate!</span>';
    } else if (ganador === 'Usuario') {
        mensaje += '<br><span>¡Felicidades, has ganado!</span>';
    } else {
        mensaje += '<br><span>¡Has perdido contra la máquina!</span>';
    }


    // Agregar el resultado de cada juego al contenido de 'resultado'
    resultados.innerHTML += mensaje+ '<br><br>';


}