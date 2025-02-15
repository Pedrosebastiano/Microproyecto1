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

// Función para preparar el juego validando el nombre del jugador y redirigiendo a la página del juego
function prepareGame() {
  let playerName = document.getElementById("player_name").value.trim();

  if (playerName.length > 0) {
    window.location.href = "game.html";
    localStorage.setItem("playerName", playerName);
  } else {
    alert("Por favor, ingrese un nombre");
  }
}

// Función para redirigir al usuario al menú principal
function backMainMenu() {
  saveData();
  window.location.href = "index.html";
}

// Función para reiniciar los valores del juego y comenzar un nuevo juego en un nivel específico
function restartValues(num) {
  sequence = [];
  userSequence = [];
  currentStep = 0;
  score = 0;
  level = num;
  updateActualScore();
  updateLevel();
}

// Función para iniciar el juego, inicializar valores y generar una nueva secuencia
function startGame() {
  isPlaying = true;
  restartValues(1);
  newButtonSecuence();
  playSequence();
}

// Función para generar un identificador de botón aleatorio
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

// Función para iluminar un botón y reproducir su sonido correspondiente
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

// Función para manejar los clics de botones, reproducir el sonido correspondiente y verificar la secuencia del usuario
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

// Función para reproducir la secuencia de botones
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

// Función para generar un nuevo botón y agregarlo a la secuencia
function newButtonSecuence() {
  const newButton = getRandomButton();
  sequence.push(newButton);
}

// Función para manejar los clics de botones del usuario y verificar si la secuencia es correcta
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

// Función para guardar los datos del juego
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
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateTables();
});

// Función para actualizar las tablas de puntajes
function updateTables() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];

  let bestScores = getBestScores(scores);
  fillTable("best-scores", bestScores);

  let recentGames = scores.slice(-10).reverse();
  fillTable("recent-games", recentGames);
}

// Función para obtener los mejores puntajes
function getBestScores(scores) {
  let bestScoresMap = {};

  scores.forEach((entry) => {
    if (!bestScoresMap[entry.name] || entry.count > bestScoresMap[entry.name]) {
      bestScoresMap[entry.name] = entry.count;
    }
  });

  let bestScoresArray = Object.keys(bestScoresMap).map((name) => ({
    name: name,
    count: bestScoresMap[name],
  }));

  return bestScoresArray.sort((a, b) => b.count - a.count).slice(0, 10);
}

// Función para llenar una tabla con datos
function fillTable(tableId, data) {
  let tableBody = document.getElementById(tableId);
  tableBody.innerHTML = ""; 

  data.forEach((entry, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
          <td>${index + 1}</td>
          <td>${entry.name}</td>
          <td>${entry.count}</td>
      `;
    tableBody.appendChild(row);
  });
}

// Función para mostrar la pantalla de derrota del juego
function lostGame() {
  const actualScoreElement = document.getElementById("actual-score");
  actualScoreElement.textContent = `Perdiste! \n Puntaje🚩: ${level - 1}`;
}

// Función para actualizar el nivel del juego
function updateLevel() {
  const levelElement = document.getElementById("level");
  levelElement.textContent = `${level}`;
}

// Función para actualizar la puntuación actual del juego
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

// Reproducir sonidos de botones
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
