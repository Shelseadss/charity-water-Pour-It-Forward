/* Game Rules:

The scoring rules are:

+5 points for each newly reached pipe.
Each pipe can only award points once.
+50 points when the community fountain is reached.
The score updates immediately on the page.
Initially connected tiles do not award points before the player makes a move.


*/

const levels = [
  {
    id: 1,
    location: "Dhaka",
    description: "Build a reliable path to bring clean water to the community.",
    difficulty: "Beginner",
    timeLimit: 30,
    scoreMultiplier: 1,
    columns: 6,
    rows: 4,
    startTile: 1,
    goalTile: 24,
    tiles: [
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: true, solutionShape: "corner", solutionConnections: ["right", "bottom"] },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: true, solutionShape: "straight", solutionConnections: ["top", "bottom"] },
      { shape: "corner", rotation: 0, connections: ["left", "bottom"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["top", "bottom"] },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "top"], solution: true, solutionShape: "corner", solutionConnections: ["top", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] }
    ]
  },
  {
    id: 2,
    location: "Nairobi",
    description: "Connect the pipes to bring water to the community.",
    difficulty: "Intermediate",
    timeLimit: 35,
    scoreMultiplier: 1.2,
    columns: 6,
    rows: 4,
    startTile: 1,
    goalTile: 24,
    tiles: [
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["left", "right"] },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: true, solutionShape: "corner", solutionConnections: ["right", "bottom"] },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["top", "bottom"] },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: false },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 0, connections: ["left", "right"], solution: true, solutionShape: "straight", solutionConnections: ["top", "bottom"] },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: false },
      { shape: "corner", rotation: 0, connections: ["right", "bottom"], solution: false },
      { shape: "straight", rotation: 90, connections: ["top", "bottom"], solution: false },
      { shape: "corner", rotation: 270, connections: ["left", "top"], solution: false },
      { shape: "corner", rotation: 90, connections: ["right", "top"], solution: true, solutionShape: "corner", solutionConnections: ["left", "top"] }
    ]
  }
];

let currentLevelIndex = 0;
let currentLevel = levels[currentLevelIndex];
const highestUnlockedLevelKey = "pourItForward.highestUnlockedLevel";
const completedLevelsKey = "pourItForward.completedLevels";

const mapScreen = document.querySelector("#map-screen");
const levelMap = document.querySelector("#level-map");
const puzzleGrid = document.querySelector("#puzzle-grid");
const levelLocation = document.querySelector("#level-location");
const levelTitle = document.querySelector("#level-title");
const levelProgress = document.querySelector("#level-progress");
const gameMessage = document.querySelector("#game-message");
const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const restartButton = document.querySelector("#restart-button");
const gameplayScreen = document.querySelector("#gameplay-screen");
const startScreen = document.querySelector("#start-screen");
const startButton = document.querySelector("#start-button");
const startLocation = document.querySelector("#start-location");
const startTitle = document.querySelector("#start-title");
const startDescription = document.querySelector("#start-description");
const startDifficulty = document.querySelector("#start-difficulty");
const backToMapButton = document.querySelector("#back-to-map-button");
const startBackToMapButton = document.querySelector("#start-back-to-map-button");
const nextLevelContainer = document.querySelector("#next-level-container");
const nextLevelButton = document.querySelector("#next-level-button");
let gameWon = false;
let score = 0;
let timeLeft = currentLevel.timeLimit;
let timerId;
const scoredTiles = new Set();
let pipeTiles = [];
const startingTileState = new Map();

function getHighestUnlockedLevel() {
  const savedLevel = Number(localStorage.getItem(highestUnlockedLevelKey));
  return Number.isInteger(savedLevel) && savedLevel >= 1
    ? Math.min(savedLevel, levels.length)
    : 1;
}

function getCompletedLevels() {
  try {
    const savedLevels = JSON.parse(localStorage.getItem(completedLevelsKey) || "[]");
    return Array.isArray(savedLevels)
      ? new Set(savedLevels.filter((levelId) => Number.isInteger(levelId)))
      : new Set();
  } catch (error) {
    console.error("Unable to load completed levels.", error);
    return new Set();
  }
}

function saveLevelProgress() {
  const completedLevels = getCompletedLevels();
  completedLevels.add(currentLevel.id);
  localStorage.setItem(completedLevelsKey, JSON.stringify([...completedLevels]));

  const nextUnlockedLevel = Math.min(currentLevel.id + 1, levels.length);
  const highestUnlockedLevel = Math.max(
    getHighestUnlockedLevel(),
    nextUnlockedLevel
  );
  localStorage.setItem(highestUnlockedLevelKey, String(highestUnlockedLevel));
}

function renderLevelMap() {
  const highestUnlockedLevel = getHighestUnlockedLevel();
  const completedLevels = getCompletedLevels();
  levelMap.replaceChildren();

  levels.forEach((level) => {
    const levelButton = document.createElement("button");
    const isCompleted = completedLevels.has(level.id);
    const isUnlocked = level.id <= highestUnlockedLevel;
    const status = isCompleted ? "Completed" : isUnlocked ? "Unlocked" : "Locked";

    levelButton.type = "button";
    levelButton.className = `level-map-button ${status.toLowerCase()}`;
    levelButton.disabled = !isUnlocked;
    levelButton.innerHTML = `
      <strong>Level ${level.id}</strong>
      <span>${level.location}</span>
      <span>${level.description}</span>
      <span>${level.difficulty} · ${level.timeLimit}s</span>
      <span>${level.scoreMultiplier}× score</span>
      <span class="level-map-status">${status}</span>
    `;

    if (isUnlocked) {
      levelButton.addEventListener("click", () => {
        openLevel(level.id - 1);
      });
    }

    levelMap.appendChild(levelButton);
  });
}

const pipeSymbols = {
  "left right": "─",
  "top bottom": "│",
  "right bottom": "┌",
  "left bottom": "┐",
  "left top": "┘",
  "right top": "└"
};

function getPipeSymbol(connections) {
  return pipeSymbols[connections.join(" ")] || "?";
}

function updateLevelDetails(level) {
  const levelLabel = `Level ${level.id}`;

  levelLocation.textContent = level.location;
  levelTitle.textContent = levelLabel;
  levelProgress.textContent = `${levelLabel}/${levels.length}`;
  startLocation.textContent = level.location;
  startTitle.textContent = levelLabel;
  startDescription.textContent = level.description;
  startDifficulty.textContent =
    `${level.difficulty} · ${level.timeLimit} seconds · ` +
    `${level.scoreMultiplier}× score`;
}

function showMap() {
  stopGame();
  mapScreen.classList.remove("d-none");
  gameplayScreen.classList.add("d-none");
  startScreen.classList.add("d-none");
  renderLevelMap();
}

function openLevel(levelIndex) {
  if (levels[levelIndex].id > getHighestUnlockedLevel()) {
    return;
  }

  loadLevel(levelIndex, false);
  mapScreen.classList.add("d-none");
  gameplayScreen.classList.remove("d-none");
  startScreen.classList.remove("d-none");
  startScreen.classList.remove("start-screen-hidden");
}

function renderLevel(level) {
  puzzleGrid.replaceChildren();
  puzzleGrid.style.setProperty("--board-columns", level.columns);

  level.tiles.forEach((tileData, index) => {
    const cell = document.createElement("div");
    const tile = document.createElement("button");
    const tileNumber = index + 1;
    const connections = tileData.connections.join(" ");

    cell.className = "col";
    tile.type = "button";
    tile.className = "pipe-cell w-100";
    tile.setAttribute("aria-label", `Pipe tile ${tileNumber}`);
    tile.dataset.tile = String(tileNumber);
    tile.dataset.shape = tileData.shape;
    tile.dataset.rotation = String(tileData.rotation);
    tile.dataset.connections = connections;
    tile.dataset.solution = String(tileData.solution);
    tile.textContent = getPipeSymbol(tileData.connections);

    if (tileData.solutionShape) {
      tile.dataset.solutionShape = tileData.solutionShape;
    }
    if (tileData.solutionConnections) {
      tile.dataset.solutionConnections = tileData.solutionConnections.join(" ");
    }

    cell.appendChild(tile);
    puzzleGrid.appendChild(cell);
  });
}

function setupBoard(level) {
  renderLevel(level);
  pipeTiles = [...puzzleGrid.querySelectorAll(".pipe-cell")];
  startingTileState.clear();

  pipeTiles.forEach((tile) => {
    tile.disabled = true;
    startingTileState.set(tile, {
      rotation: tile.dataset.rotation,
      connections: tile.dataset.connections
    });
    tile.addEventListener("click", () => {
      rotatePipe(tile);
    });
  });
}

function launchConfetti() {
  // Create a temporary container so the confetti can appear above the game
  // without changing the board layout or blocking clicks.
  const confettiContainer = document.createElement("div");
  confettiContainer.className = "confetti-container";
  confettiContainer.setAttribute("aria-hidden", "true");
  document.body.appendChild(confettiContainer);

  const confettiColors = ["#FFC907", "#003366", "#77A8BB", "#BF6C46"];

  // Each piece receives a random horizontal position, color, and delay.
  for (let pieceNumber = 0; pieceNumber < 60; pieceNumber += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.animationDuration = `${2.5 + Math.random() * 1.5}s`;
    confettiContainer.appendChild(piece);
  }

  // Remove the temporary elements after their animation has finished.
  window.setTimeout(() => {
    confettiContainer.remove();
  }, 4500);
}

// When a tile turns clockwise, each open side moves to the next side.
// For example, "top" becomes "right" after a 90-degree rotation.
const clockwiseDirection = {
  top: "right",
  right: "bottom",
  bottom: "left",
  left: "top"
};

// These values tell the path checker where each direction leads in the board.
const directionChanges = {
  top: { row: -1, column: 0 },
  right: { row: 0, column: 1 },
  bottom: { row: 1, column: 0 },
  left: { row: 0, column: -1 }
};

// A connection is valid only when the neighboring tile opens back toward
// the tile we came from.
const oppositeDirection = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};

function rotateConnections(connectionText) {
  // data-connections is stored as text such as "right bottom".
  // Splitting it creates an array we can update one direction at a time.
  const connections = connectionText.split(" ");

  // Move every open side clockwise, then join the array back into text.
  return connections
    .map((connection) => clockwiseDirection[connection])
    .join(" ");
}

function getTileAt(row, column) {
  // Convert a row and column into the tile number used by the HTML.
  const tileNumber = row * currentLevel.columns + column + 1;

  // Return null when a direction would take us outside the board.
  if (
    row < 0 ||
    column < 0 ||
    column >= currentLevel.columns ||
    tileNumber > currentLevel.tiles.length
  ) {
    return null;
  }

  return document.querySelector(`[data-tile="${tileNumber}"]`);
}

function getConnections(tile) {
  // Convert "right bottom" into ["right", "bottom"] so we can use
  // includes() when checking a neighboring tile.
  return tile.dataset.connections.split(" ");
}

function updateScore() {
  // Keep the score on the page synchronized with the score variable.
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
  // Display the current number of seconds remaining.
  timerDisplay.textContent = `Time: ${timeLeft}`;
}

function stopGame() {
  // Clearing the interval prevents the timer from continuing after the level
  // has been won or lost.
  window.clearInterval(timerId);
}

function loseGame() {
  stopGame();
  gameMessage.textContent = "Time is up! Try again.";
  gameMessage.classList.add("lose-message");

  // Disable the board so no more moves can be made after time runs out.
  pipeTiles.forEach((tile) => {
    tile.disabled = true;
  });
}

function startTimer() {
  // setInterval runs its callback every 1,000 milliseconds.
  timerId = window.setInterval(() => {
    timeLeft -= 1;
    updateTimer();

    if (timeLeft <= 0) {
      loseGame();
    }
  }, 1000);
}

function startLevel() {
  // Remove the introduction screen and reveal the playable board.
  startScreen.classList.add("start-screen-hidden");
  gameplayScreen.classList.remove("gameplay-blurred");
  pipeTiles.forEach((tile) => {
    tile.disabled = false;
  });

  // The countdown begins only after the player chooses to start.
  startTimer();
}

function findConnectedTiles() {
  const startingTile = getTileAt(
    Math.floor((currentLevel.startTile - 1) / currentLevel.columns),
    (currentLevel.startTile - 1) % currentLevel.columns
  );
  const connectedTiles = new Set();
  const tilesToCheck = [startingTile];

  while (tilesToCheck.length > 0) {
    const currentTile = tilesToCheck.shift();

    // A Set prevents us from checking the same tile repeatedly if the pipes
    // form a loop.
    if (!currentTile || connectedTiles.has(currentTile)) {
      continue;
    }

    connectedTiles.add(currentTile);
    const currentConnections = getConnections(currentTile);
    const currentTileNumber = Number(currentTile.dataset.tile);
    const currentRow = Math.floor((currentTileNumber - 1) / currentLevel.columns);
    const currentColumn = (currentTileNumber - 1) % currentLevel.columns;

    currentConnections.forEach((direction) => {
      const change = directionChanges[direction];
      const neighbor = getTileAt(currentRow + change.row, currentColumn + change.column);

      // The neighbor must open back toward the current tile for water to flow.
      if (
        neighbor &&
        getConnections(neighbor).includes(oppositeDirection[direction])
      ) {
        tilesToCheck.push(neighbor);
      }
    });
  }

  return connectedTiles;
}

function updateConnectedStyles(shouldAwardPoints = false) {
  // Recalculate the path after every rotation, then highlight only the tiles
  // water can currently reach from tile 1.
  const connectedTiles = findConnectedTiles();

  if (shouldAwardPoints) {
    // Award points once for each newly reached pipe, not for every click.
    connectedTiles.forEach((tile) => {
      if (!scoredTiles.has(tile)) {
        scoredTiles.add(tile);
        score += Math.round(5 * currentLevel.scoreMultiplier);
      }
    });
    updateScore();
  }

  pipeTiles.forEach((tile) => {
    tile.classList.toggle("connected", connectedTiles.has(tile));
  });

  const fountainTile = getTileAt(
    Math.floor((currentLevel.goalTile - 1) / currentLevel.columns),
    (currentLevel.goalTile - 1) % currentLevel.columns
  );
  if (connectedTiles.has(fountainTile) && !gameWon) {
    gameWon = true;
    stopGame();
    score += Math.round(50 * currentLevel.scoreMultiplier);
    updateScore();
    gameMessage.textContent = "You reached the community fountain!";
    gameMessage.classList.add("win-message");
    launchConfetti();

    // Once the level is solved, prevent more rotations from changing the
    // completed path.
    pipeTiles.forEach((tile) => {
      tile.disabled = true;
    });

    if (currentLevelIndex < levels.length - 1) {
      saveLevelProgress();
      renderLevelMap();
      nextLevelContainer.classList.remove("d-none");
    } else {
      saveLevelProgress();
      renderLevelMap();
    }
  }
}

function rotatePipe(tile) {
  // Ignore clicks after the player has already won or lost.
  if (gameWon || timeLeft <= 0) {
    return;
  }

  // Read the tile's current rotation from its HTML data attribute.
  // Number() changes the attribute's text value into a number we can add to.
  const currentRotation = Number(tile.dataset.rotation);
  const nextRotation = (currentRotation + 90) % 360;

  // Save the new rotation so the next click starts from this position.
  tile.dataset.rotation = nextRotation;

  // The symbols already display their starting orientations in the HTML.
  // Track the visual turns separately so each click visibly adds 90 degrees.
  const currentVisualRotation = Number(tile.dataset.visualRotation || 0);
  const nextVisualRotation = (currentVisualRotation + 90) % 360;
  tile.dataset.visualRotation = nextVisualRotation;
  tile.style.transform = `rotate(${nextVisualRotation}deg)`;

  // Update the logical connections at the same time as the visual rotation.
  // This is what will allow the future path-checking code to know which
  // sides of this tile are currently open.
  tile.dataset.connections = rotateConnections(tile.dataset.connections);

  // Recheck the path after this tile changes.
  updateConnectedStyles(true);
}

function resetGame() {
  // Stop the previous countdown before starting a fresh level.
  stopGame();

  gameWon = false;
  score = 0;
  timeLeft = currentLevel.timeLimit;
  scoredTiles.clear();
  gameMessage.textContent = "Tap or click a pipe to rotate it and connect the water.";
  gameMessage.classList.remove("win-message", "lose-message");

  pipeTiles.forEach((tile) => {
    const startingState = startingTileState.get(tile);
    tile.disabled = false;
    tile.dataset.rotation = startingState.rotation;
    tile.dataset.connections = startingState.connections;
    tile.dataset.visualRotation = 0;
    tile.style.transform = "rotate(0deg)";
    tile.classList.remove("connected");
  });

  updateScore();
  updateTimer();
  findConnectedTiles().forEach((tile) => {
    scoredTiles.add(tile);
  });
  updateConnectedStyles();
  startTimer();
}

function loadLevel(levelIndex, startImmediately = true) {
  stopGame();
  currentLevelIndex = levelIndex;
  currentLevel = levels[currentLevelIndex];
  gameWon = false;
  score = 0;
  timeLeft = currentLevel.timeLimit;
  scoredTiles.clear();
  nextLevelContainer.classList.add("d-none");
  gameMessage.textContent = "Tap or click a pipe to rotate it and connect the water.";
  gameMessage.classList.remove("win-message", "lose-message");

  updateLevelDetails(currentLevel);
  setupBoard(currentLevel);
  updateScore();
  updateTimer();
  updateConnectedStyles();
  findConnectedTiles().forEach((tile) => {
    scoredTiles.add(tile);
  });

  if (startImmediately) {
    startLevel();
  }
}

// The existing Restart Level button starts the reset process.
restartButton.addEventListener("click", resetGame);
startButton.addEventListener("click", startLevel);
nextLevelButton.addEventListener("click", () => {
  loadLevel(currentLevelIndex + 1);
});
backToMapButton.addEventListener("click", showMap);
startBackToMapButton.addEventListener("click", showMap);

updateLevelDetails(currentLevel);
setupBoard(currentLevel);
// Show the initial connections before the player clicks anything.
updateConnectedStyles();

// Do not award points for pipes that happen to be connected before the player
// makes a move. They become eligible for points only after later progress.
findConnectedTiles().forEach((tile) => {
  scoredTiles.add(tile);
});

updateScore();
updateTimer();
showMap();