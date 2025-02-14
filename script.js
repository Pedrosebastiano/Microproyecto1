let isPlaying = false;
let sequence = [];
let userSequence = [];
let currentStep = 0;
let score = 0;
let level = 0;
let isSequencePlaying = false;

//ver si usar
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
}

//revisado
function prepareGame() {
  let playerName = document.getElementById("player_name").value.trim();

  if (playerName.length > 0) {
    window.location.href = "game.html";
    localStorage.setItem("playerName", playerName);
  } else {
    alert("Por favor, ingrese un nombre");
  }
}

//revisado
function backMainMenu() {
  saveData();
  window.location.href = "index.html";
}

function restartValues(num) {
  sequence = [];
  userSequence = [];
  currentStep = 0;
  score = 0;
  level = num;
  updateActualScore();
  updateLevel();
}

//revisado
function startGame() {
  isPlaying = true;
  restartValues(1);
  newButtonSecuence();
  playSequence();
}

function getRandomButton() {
  const buttons = [
    "red_button",
    "green_button",
    "blue_button",
    "yellow_button",
  ];
  const randomIndex = Math.floor(Math.random() * buttons.length);
  return buttons[randomIndex];
}

function iluminatebutton(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("active", buttonId);

  switch (buttonId) {
    case "red_button":
      playRedSound();
      break;
    case "green_button":
      playGreenSound();
      break;
    case "blue_button":
      playBlueSound();
      break;
    case "yellow_button":
      playYellowSound();
      break;
  }

  setTimeout(() => {
    button.classList.remove("active", buttonId);
  }, 1000);
}

function clickIluminateButton(buttonId) {
  const button = document.getElementById(buttonId);
  button.classList.add("active-click", buttonId);

  switch (buttonId) {
    case "red_button":
      playRedSound();
      break;
    case "green_button":
      playGreenSound();
      break;
    case "blue_button":
      playBlueSound();
      break;
    case "yellow_button":
      playYellowSound();
      break;
  }

  setTimeout(() => {
    button.classList.remove("active-click", buttonId);
  }, 150);
}

function playSequence() {
  isSequencePlaying = true;
  let delay = 0;
  sequence.forEach((buttonId, index) => {
    setTimeout(() => {
      iluminatebutton(buttonId);
    }, delay);
    delay += 1000;
    delay += 250;
  });
  setTimeout(() => {
    isSequencePlaying = false;
  }, delay);
}

function newButtonSecuence() {
  const newButton = getRandomButton();
  sequence.push(newButton);
}

function checkButton(event) {
  if (!isPlaying || isSequencePlaying) return;
  const clickedButton = event.target.id;
  clickIluminateButton(clickedButton);
  userSequence.push(clickedButton);

  if (clickedButton !== sequence[userSequence.length - 1]) {
    isPlaying = false;
    saveData();
    lostGame();
    return;
  }

  score++;
  updateActualScore();

  if (userSequence.length === sequence.length) {
    console.log("Correcto");
    userSequence = [];
    level++;
    updateLevel();
    newButtonSecuence();
    setTimeout(playSequence, 1000);
    score = 0;
    updateLevel();
  }
}

function saveData() {
  if (level != 0) {
    const previusPlayers = localStorage.getItem("scores");
    let previusPlayersArray = [];

    if (previusPlayers !== null) {
      previusPlayersArray = JSON.parse(previusPlayers);
    }

    previusPlayersArray.push({
      name: localStorage.getItem("playerName"), // Recuperar nombre guardado
      count: level - 1,
    });

    localStorage.setItem("scores", JSON.stringify(previusPlayersArray));

    alert(localStorage.getItem("scores"));
  }
}

function lostGame() {
  const actualScoreElement = document.getElementById("actual-score");
  actualScoreElement.textContent = `Perdiste! \n Puntaje🚩: ${level - 1}`;
}

function updateLevel() {
  const levelElement = document.getElementById("level");
  levelElement.textContent = `${level}`;
}

function updateActualScore() {
  const actualScoreElement = document.getElementById("actual-score");
  actualScoreElement.textContent = `Puntuación actual⭐: ${score}`;
}

document.querySelectorAll(".color-button").forEach((button) => {
  button.addEventListener("click", checkButton);
});

document.addEventListener("DOMContentLoaded", function () {
  const playerName = localStorage.getItem("playerName");
  const playerNameElement = document.getElementById("playerNameDisplay");
  playerNameElement.textContent = `Jugador: ${playerName}`;
});

function playRedSound() {
  const redSound = new Audio("./Recursos/botonrojo.mp3");
  redSound.play();
}

function playGreenSound() {
  const greenSound = new Audio("./Recursos/botonverde.mp3");
  greenSound.play();
}
function playBlueSound() {
  const blueSound = new Audio("./Recursos/botonazul.mp3");
  blueSound.play();
}

function playYellowSound() {
  const yellowSound = new Audio("./Recursos/botonamarillo.mp3");
  yellowSound.play();
}
