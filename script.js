let isPlaying = false;
let currentButton = null;
let sequence = [];
let userSequence = [];
let currentStep = 0;
let score = 0;
let level = 0;

function startGame() {
  console.log("Juego iniciado");
  isPlaying = true;
  sequence = [];
  userSequence = [];
  currentStep = 0;
  score = 0;
  level = 1;
  updateActualScore();
  updateScore();
  nuevoBotonSequencia();
  playSequence();
}

function validatePlayerName() {
  const playerName = localStorage.getItem("playerName");

  if (!playerName || playerName.trim() === "") {
    alert("Por favor, ingresa tu nombre antes de comenzar.");
    return false;
  }
  return true;
}

function getRandomButton() {
  const buttons = [
    "red_button",
    "green_button",
    "blue_button",
    "yellow_button",
  ];
  const randomIndex = Math.floor(Math.random() * buttons.length);
  console.log("Botón aleatorio seleccionado:", buttons[randomIndex]);
  return buttons[randomIndex];
}

function botonIluminado(buttonId) {
  const button = document.getElementById(buttonId);
  console.log("Boton iluminado:", buttonId);
  button.classList.add("active", buttonId);
  setTimeout(() => {
    button.classList.remove("active", buttonId);
  }, 1000);
}

function botonIluminadoCLick(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("active-click", buttonId);
  setTimeout(() => {
    button.classList.remove("active-click", buttonId);
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
  console.log("Secuencia actual:", sequence);
}

function checkButton(event) {
  if (!isPlaying) return;
  const clickedButton = event.target.id;
  botonIluminadoCLick(clickedButton);
  userSequence.push(clickedButton);

  if (clickedButton !== sequence[userSequence.length - 1]) {
    console.log("Incorrecto");
    alert("Perdiste");
    isPlaying = false;
    return;
  }

  score++;
  updateActualScore();

  if (userSequence.length === sequence.length) {
    console.log("Correcto");
    userSequence = [];
    level++;
    updateScore();
    nuevoBotonSequencia();
    setTimeout(playSequence, 1000);
    score = 0;
    updateScore;
  }
}

function updateScore() {
  const levelElement = document.getElementById("level");
  levelElement.textContent = `${level}`;
}

function updateActualScore() {
  const actualScoreElement = document.getElementById("actual-score");
  actualScoreElement.textContent = `Puntuación actual⭐: ${score}`;
}

document.getElementById("startGameButton").onclick = startGame;

document.querySelectorAll(".color-button").forEach((button) => {
  button.addEventListener("click", checkButton);
});

document.getElementById("startGameLink").onclick = function (event) {
  const playerName = document.getElementById("player_name").value;
  localStorage.setItem("playerName", playerName);
};
