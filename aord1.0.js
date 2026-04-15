const setupScreen = document.getElementById("setup-screen");
const roundIntroScreen = document.getElementById("round-intro-screen");
const questionScreen = document.getElementById("question-screen");
const timeoutScreen = document.getElementById("timeout-screen");
const decisionScreen = document.getElementById("decision-screen");
const resultScreen = document.getElementById("result-screen");

const playerCountSelect = document.getElementById("player-count");
const playerInputsContainer = document.getElementById("player-inputs");
const difficultySelect = document.getElementById("difficulty");

const startBtn = document.getElementById("start-btn");
const showQuestionBtn = document.getElementById("show-question-btn");
const doneBtn = document.getElementById("done-btn");
const survivedBtn = document.getElementById("survived-btn");
const eliminatedBtn = document.getElementById("eliminated-btn");
const decisionSurvivedBtn = document.getElementById("decision-survived-btn");
const decisionEliminatedBtn = document.getElementById("decision-eliminated-btn");
const restartBtn = document.getElementById("restart-btn");

const introPlayerName = document.getElementById("intro-player-name");
const currentPlayerName = document.getElementById("current-player-name");
const questionText = document.getElementById("question-text");
const timerEl = document.getElementById("timer");
const timerBox = document.getElementById("timer-box");
const timeoutPlayerText = document.getElementById("timeout-player-text");
const decisionPlayerName = document.getElementById("decision-player-name");
const winnerText = document.getElementById("winner-text");
const rankingList = document.getElementById("ranking-list");

let activePlayers = [];
let currentPlayerIndex = 0;
let currentQuestion = null;
let timer = null;
let timeLeft = 20;
let gameStarted = false;
let round = 1;
let eliminatedPlayers = []; 

const footballQuestions = [
  "Nenne 5 Spieler von Bayern München.",
  "Nenne 5 Spieler von Borussia Dortmund.",
  "Nenne 5 Spieler von Real Madrid.",
  "Nenne 5 Spieler von FC Barcelona.",
  "Nenne 5 Spieler von Manchester City.",
  "Nenne 5 Spieler von Paris Saint-Germain.",
  "Nenne 5 Spieler von Arsenal.",
  "Nenne 5 Spieler von Liverpool.",
  "Nenne 5 Spieler von Chelsea.",
  "Nenne 5 Spieler von Juventus.",
  "Nenne 5 Spieler von Inter Mailand.",
  "Nenne 5 Spieler von AC Mailand.",
  "Nenne 5 Spieler von Bayer Leverkusen.",
  "Nenne 5 Spieler von RB Leipzig.",
  "Nenne 5 Spieler von Atlético Madrid.",
  "Nenne 5 deutsche Nationalspieler.",
  "Nenne 5 französische Nationalspieler.",
  "Nenne 5 spanische Nationalspieler.",
  "Nenne 5 brasilianische Nationalspieler.",
  "Nenne 5 argentinische Nationalspieler.",
  "Nenne 5 englische Nationalspieler.",
  "Nenne 5 portugiesische Nationalspieler.",
  "Nenne 5 niederländische Nationalspieler.",
  "Nenne 5 italienische Nationalspieler.",
  "Nenne 5 belgische Nationalspieler.",
  "Nenne 5 Torhüter.",
  "Nenne 5 Verteidiger.",
  "Nenne 5 Mittelfeldspieler.",
  "Nenne 5 Stürmer.",
  "Nenne 5 Fußballtrainer.",
  "Nenne 5 deutsche Trainer.",
  "Nenne 5 ehemalige Fußballtrainer.",
  "Nenne 5 Ballon-d’Or-Gewinner.",
  "Nenne 5 ehemalige Ballon-d’Or-Gewinner.",
  "Nenne 5 Champions-League-Sieger.",
  "Nenne 5 Bundesliga-Vereine.",
  "Nenne 5 Vereine aus der Premier League.",
  "Nenne 5 Vereine aus La Liga.",
  "Nenne 5 Vereine aus der Serie A.",
  "Nenne 5 Vereine aus der Ligue 1.",
  "Nenne 5 Vereine aus der Eredivisie.",
  "Nenne 5 südamerikanische Nationalmannschaften.",
  "Nenne 5 afrikanische Nationalmannschaften.",
  "Nenne 5 europäische Nationalmannschaften.",
  "Nenne 5 Fußballstadien.",
  "Nenne 5 junge Talente im Fußball.",
  "Nenne 5 ehemalige deutsche Nationalspieler.",
  "Nenne 5 Spieler, die schon für mehrere Topclubs gespielt haben.",
  "Nenne 5 Legenden des Fußballs.",
  "Nenne 5 Vereine, die schon die Champions League gewonnen haben.",

"Nenne 5 Spieler, die bei der WM 2022 gespielt haben.",
"Nenne 5 Spieler mit über 50 Länderspielen.",
"Nenne 5 Spieler, die in der Bundesliga spielen.",
"Nenne 5 Spieler, die in der Premier League spielen.",
"Nenne 5 Spieler, die schon Champions League gewonnen haben.",
"Nenne 5 Spieler, die für mehrere Topclubs gespielt haben.",
"Nenne 5 Spieler unter 25 Jahren.",
"Nenne 5 Spieler über 30 Jahren.",
"Nenne 5 Spieler mit mindestens 10 Toren in einer Saison.",
"Nenne 5 Spieler mit mehr als 100 Karriere-Toren.",

"Nenne 5 deutsche Vereine aus der 2. Bundesliga.",
"Nenne 5 Vereine mit einem Stadion über 50.000 Plätze.",
"Nenne 5 Vereine, die schon Meister geworden sind.",
"Nenne 5 Vereine aus Südamerika.",
"Nenne 5 Vereine aus Afrika.",
"Nenne 5 Vereine aus Asien.",
"Nenne 5 Vereine mit rotem Trikot.",
"Nenne 5 Vereine mit blauem Trikot.",
"Nenne 5 Vereine, die international bekannt sind.",
"Nenne 5 Vereine mit einem Tier im Logo.",

"Nenne 5 Spieler mit einem Vornamen mit M.",
"Nenne 5 Spieler mit einem Nachnamen mit S.",
"Nenne 5 Spieler mit weniger als 10 Buchstaben im Namen.",
"Nenne 5 Spieler mit Doppelnamen.",
"Nenne 5 Spieler mit ungewöhnlichen Namen.",

"Nenne 5 Fußballregeln.",
"Nenne 5 Positionen im Fußball.",
"Nenne 5 bekannte Fußballstadien in Europa.",
"Nenne 5 Städte mit großen Fußballvereinen.",
"Nenne 5 Länder, die schon Weltmeister wurden.",

"Nenne 5 Spieler, die bei Bayern UND Dortmund gespielt haben.",
"Nenne 5 Spieler, die in Deutschland und England gespielt haben.",
"Nenne 5 Spieler, die in Spanien und Italien gespielt haben.",
"Nenne 5 Spieler, die in mindestens 3 Topligen gespielt haben.",
"Nenne 5 Spieler, die für ihre Nationalmannschaft Kapitän waren.",

"Nenne 5 Trainer, die die Champions League gewonnen haben.",
"Nenne 5 Trainer, die in der Bundesliga trainiert haben.",
"Nenne 5 Trainer aus Deutschland.",
"Nenne 5 Trainer aus Spanien.",
"Nenne 5 Trainer aus Italien.",

"Nenne 5 Spieler, die als Legenden gelten.",
"Nenne 5 Spieler, die aktuell zu den besten der Welt gehören.",
"Nenne 5 Spieler, die als Talente gelten.",
"Nenne 5 Spieler, die verletzt sind oder waren.",
"Nenne 5 Spieler, die Transfers über 50 Mio hatten.",

"Nenne 5 Spieler mit über 10 Assists in einer Saison.",
"Nenne 5 Spieler, die bei einer EM gespielt haben.",
"Nenne 5 Spieler, die für ihre Schnelligkeit bekannt sind.",
"Nenne 5 Spieler, die für ihre Technik bekannt sind.",
"Nenne 5 Spieler, die für ihre Kopfballstärke bekannt sind."

];

function createPlayerInputs() {
  const count = Number(playerCountSelect.value);
  playerInputsContainer.innerHTML = "";

  for (let i = 1; i <= count; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Name von Spieler ${i}`;
    input.classList.add("player-name-input");
    playerInputsContainer.appendChild(input);
  }
}

function showScreen(screen) {
  const allScreens = [
    setupScreen,
    roundIntroScreen,
    questionScreen,
    timeoutScreen,
    decisionScreen,
    resultScreen
  ];

  allScreens.forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getTimeByDifficulty() {
  const difficulty = difficultySelect.value;

  if (difficulty === "easy") return 30;
  if (difficulty === "medium") return 20;
  return Math.floor(Math.random() * 6) + 10; // 10 bis 15
}

function getRandomQuestion() {
  return footballQuestions[Math.floor(Math.random() * footballQuestions.length)];
}

function startGame() {
  const inputs = document.querySelectorAll(".player-name-input");
  const names = [];

  inputs.forEach((input, index) => {
    const value = input.value.trim();
    names.push(value || `Spieler ${index + 1}`);
  });

  activePlayers = shuffleArray(names);
  eliminatedPlayers = [];
  currentPlayerIndex = 0;
  gameStarted = true;

  showNextPlayerIntro();
}

function showNextPlayerIntro() {
  if (activePlayers.length <= 1) {
    endGame();
    return;
  }

  if (currentPlayerIndex >= activePlayers.length) {
  currentPlayerIndex = 0;
  round++; // 🔥 neue Runde
}

  const player = activePlayers[currentPlayerIndex];
  introPlayerName.textContent = player;
  showScreen(roundIntroScreen);

    document.getElementById("round-display").textContent = "Runde " + round;
}

function showQuestionForCurrentPlayer() {
  const player = activePlayers[currentPlayerIndex];
  currentQuestion = getRandomQuestion();

  currentPlayerName.textContent = player;
  questionText.textContent = currentQuestion;

  startTimer();
  showScreen(questionScreen);
}

function startTimer() {
  clearInterval(timer);
  timeLeft = getTimeByDifficulty();
  timerEl.textContent = timeLeft;
  timerBox.classList.remove("warning");

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerBox.classList.add("warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      openTimeoutScreen();
    }
  }, 1000);
}

function openTimeoutScreen() {
  const player = activePlayers[currentPlayerIndex];
  timeoutPlayerText.textContent = `${player} war an der Reihe. Was entscheidet ihr?`;
  showScreen(timeoutScreen);
}

function openDecisionScreen() {
  clearInterval(timer);
  const player = activePlayers[currentPlayerIndex];
  decisionPlayerName.textContent = player;
  showScreen(decisionScreen);
}

function markPlayerSurvived() {
  currentPlayerIndex++;
  showNextPlayerIntro();
}

function eliminateCurrentPlayer() {
  const player = activePlayers[currentPlayerIndex];

  eliminatedPlayers.push({
    name: player,
    round: round
  });

  activePlayers.splice(currentPlayerIndex, 1);

  if (activePlayers.length <= 1) {
    endGame();
    return;
  }

  if (currentPlayerIndex >= activePlayers.length) {
    currentPlayerIndex = 0;
  }

  showNextPlayerIntro();
}

function endGame() {
  clearInterval(timer);

  let finalRanking = [];

  if (activePlayers.length === 1) {
    finalRanking.push({
      name: activePlayers[0],
      round: "Gewonnen"
    });
  }

  // Reihenfolge umdrehen (letzter raus = besser)
  const reversed = [...eliminatedPlayers].reverse();

  finalRanking = finalRanking.concat(reversed);

  winnerText.textContent = `Gewinner: ${finalRanking[0].name}`;

  rankingList.innerHTML = "";

  finalRanking.forEach((player, index) => {
    const li = document.createElement("li");

    if (player.round === "Gewonnen") {
      li.textContent = `${player.name} 🏆`;
    } else {
      li.textContent = `${player.name} (Runde ${player.round})`;
    }

    rankingList.appendChild(li);
  });

  showScreen(resultScreen);
}

if (activePlayers.length === 2) {
  alert("FINALE 🔥");
}

function restartGame() {
  clearInterval(timer);
  activePlayers = [];
  eliminatedPlayers = [];
  currentPlayerIndex = 0;
  currentQuestion = null;
  gameStarted = false;
  showScreen(setupScreen);
}

const playerCountDisplay = document.getElementById("player-count-display");

playerCountSelect.addEventListener("input", () => {
  playerCountDisplay.textContent = playerCountSelect.value;
  createPlayerInputs();
});
startBtn.addEventListener("click", startGame);
showQuestionBtn.addEventListener("click", showQuestionForCurrentPlayer);
doneBtn.addEventListener("click", openDecisionScreen);

survivedBtn.addEventListener("click", markPlayerSurvived);
eliminatedBtn.addEventListener("click", eliminateCurrentPlayer);

decisionSurvivedBtn.addEventListener("click", markPlayerSurvived);
decisionEliminatedBtn.addEventListener("click", eliminateCurrentPlayer);

restartBtn.addEventListener("click", restartGame);

createPlayerInputs();

document.querySelectorAll(".screen").forEach(screen => {
  const logo = document.createElement("img");
  logo.src = "aordlogo.png";
  logo.classList.add("game-logo");

  screen.prepend(logo);
});

const overlay = document.getElementById("overlay");
const menuButtons = document.querySelectorAll(".menu-btn");
const overlayPages = document.querySelectorAll(".overlay-page");

menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const page = btn.dataset.open;

    overlay.classList.add("active");

    overlayPages.forEach(p => p.classList.remove("active"));
    document.getElementById(page).classList.add("active");
  });
});

// Klick außerhalb = schließen
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
