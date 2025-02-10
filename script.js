let isPlaying = false;
let currentButton = null;
let sequence = [];
let userSequence = [];
let currentStep = 0;
let score = 0; 

function startGame() {
    console.log('Juego iniciado');
    isPlaying = true;
    sequence = [];
    userSequence = [];
    currentStep = 0;
    score = 0; 
    updateScore();
    nuevoBotonSequencia();
    playSequence();
}

function getRandomButton() {
    const buttons = ['red_button', 'green_button', 'blue_button', 'yellow_button'];
    const randomIndex = Math.floor(Math.random() * buttons.length);
    console.log('Botón aleatorio seleccionado:', buttons[randomIndex]);
    return buttons[randomIndex];
}

function botonIluminado(buttonId) {
    const button = document.getElementById(buttonId);
    console.log('Boton iluminado:', buttonId);
    button.classList.add('active', buttonId);
    setTimeout(() => {
        button.classList.remove('active', buttonId);
    }, 1000); 
}

function botonIluminadoCLick(buttonId) {
    const button = document.getElementById(buttonId);
    console.log('Boton iluminado al hacer clic:', buttonId);
    button.classList.add('active-click', buttonId);
    setTimeout(() => {
        button.classList.remove('active-click', buttonId);
    }, 150); 
}

function playSequence() {
    let delay = 0;
    sequence.forEach((buttonId, index) => {
        setTimeout(() => {
            botonIluminado(buttonId);
        }, delay);
        delay += 1000;
        delay += 250;  
    });
}

function nuevoBotonSequencia() {
    const newButton = getRandomButton();
    sequence.push(newButton);
    console.log('Secuencia actual:', sequence);
}

function checkButton(event) {
    if (!isPlaying) return;
    const clickedButton = event.target.id;
    console.log('Botón presionado:', clickedButton);
    botonIluminadoCLick(clickedButton);
    userSequence.push(clickedButton);

    if (clickedButton !== sequence[userSequence.length - 1]) {
        console.log('Incorrecto');
        alert('Perdiste');
        isPlaying = false;
        return;
    }

    if (userSequence.length === sequence.length) {
        console.log('Correcto');
        userSequence = [];
        score++; 
        updateScore(); 
        nuevoBotonSequencia();
        setTimeout(playSequence, 1000);
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Puntos: ${score}`;
}

document.getElementById('startGameButton').onclick = startGame;

document.querySelectorAll('.color-button').forEach(button => {
    button.addEventListener('click', checkButton);
});