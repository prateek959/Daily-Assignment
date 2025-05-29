const BOARD_SIZE = 8;

const players = [
  {
    id: 1,
    name: 'Player 1',
    health: 100,
    inventory: [],
    skills: [],
    position: { x: 0, y: 0 },
    colorClass: 'player1',
  },
  {
    id: 2,
    name: 'Player 2',
    health: 100,
    inventory: [],
    skills: [],
    position: { x: BOARD_SIZE - 1, y: BOARD_SIZE - 1 },
    colorClass: 'player2',
  },
];

let currentPlayerIndex = 0;
let currentPhase = 'move'; // phases: move, attack (planned), end turn

let gameStats = {
  turnsTaken: 0,
  damageDealt: 0,
  itemsCollected: 0,
};

let gameBoard = [];

const gameBoardEl = document.getElementById('game-board');
const turnInfoEl = document.getElementById('turn-info');
const phaseInfoEl = document.getElementById('phase-info');
const turnsTakenEl = document.getElementById('turns-taken');
const damageDealtEl = document.getElementById('damage-dealt');
const itemsCollectedEl = document.getElementById('items-collected');

const moveBtn = document.getElementById('move-btn');
const endTurnBtn = document.getElementById('end-turn-btn');
const saveGameBtn = document.getElementById('save-game-btn');
const loadGameBtn = document.getElementById('load-game-btn');

let selectedTile = null;
let isMoving = false;

// Initialize board with empty tiles, obstacles and collectibles
function initBoard() {
  gameBoard = [];
  for (let y = 0; y < BOARD_SIZE; y++) {
    const row = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      row.push({
        x,
        y,
        obstacle: false,
        collectible: false,
        player: null,
      });
    }
    gameBoard.push(row);
  }

  // Add obstacles randomly (10)
  for (let i = 0; i < 10; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (
      gameBoard[y][x].obstacle ||
      players.some((p) => p.position.x === x && p.position.y === y)
    );
    gameBoard[y][x].obstacle = true;
  }

  // Add collectibles randomly (5)
  for (let i = 0; i < 5; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * BOARD_SIZE);
      y = Math.floor(Math.random() * BOARD_SIZE);
    } while (
      gameBoard[y][x].obstacle ||
      gameBoard[y][x].collectible ||
      players.some((p) => p.position.x === x && p.position.y === y)
    );
    gameBoard[y][x].collectible = true;
  }

  // Place players on board
  players.forEach((player) => {
    const { x, y } = player.position;
    gameBoard[y][x].player = player.id;
  });
}

function renderBoard() {
  gameBoardEl.innerHTML = '';
  for (let y = 0; y < BOARD_SIZE; y++) {
    for (let x = 0; x < BOARD_SIZE; x++) {
      const tile = gameBoard[y][x];
      const tileEl = document.createElement('div');
      tileEl.classList.add('tile');
      if (tile.obstacle) tileEl.classList.add('obstacle');
      if (tile.collectible) tileEl.classList.add('collectible');

      if (tile.player) {
        const player = players.find((p) => p.id === tile.player);
        const playerEl = document.createElement('div');
        playerEl.classList.add(player.colorClass);
        tileEl.appendChild(playerEl);
      }

      tileEl.dataset.x = x;
      tileEl.dataset.y = y;

      if (isMoving && currentPhase === 'move' && tile.player === null && !tile.obstacle) {
        tileEl.style.cursor = 'pointer';
      } else {
        tileEl.style.cursor = 'default';
      }

      tileEl.addEventListener('click', () => {
        if (isMoving && currentPhase === 'move') {
          handleMove(x, y);
        }
      });

      gameBoardEl.appendChild(tileEl);
    }
  }
}

function updateUI() {
  const currentPlayer = players[currentPlayerIndex];
  turnInfoEl.textContent = `Current Turn: ${currentPlayer.name}`;
  phaseInfoEl.textContent = `Phase: ${capitalize(currentPhase)}`;
  turnsTakenEl.textContent = gameStats.turnsTaken;
  damageDealtEl.textContent = gameStats.damageDealt;
  itemsCollectedEl.textContent = gameStats.itemsCollected;

  moveBtn.disabled = currentPhase !== 'move';
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function handleMove(targetX, targetY) {
  const currentPlayer = players[currentPlayerIndex];
  const { x, y } = currentPlayer.position;

  // Simple move limit: 1 tile orthogonally
  const dx = Math.abs(targetX - x);
  const dy = Math.abs(targetY - y);

  if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    if (!gameBoard[targetY][targetX].obstacle && gameBoard[targetY][targetX].player === null) {
      // Update board
      gameBoard[y][x].player = null;
      gameBoard[targetY][targetX].player = currentPlayer.id;
      currentPlayer.position = { x: targetX, y: targetY };

      // Collect collectible if present
      if (gameBoard[targetY][targetX].collectible) {
        gameBoard[targetY][targetX].collectible = false;
        currentPlayer.inventory.push('item');
        gameStats.itemsCollected++;
      }

      isMoving = false;
      currentPhase = 'end turn';
      updateUI();
      renderBoard();
    }
  } else {
    alert('You can only move 1 tile up/down/left/right');
  }
}

function endTurn() {
  if (isMoving) {
    alert('Finish your move first!');
    return;
  }

  // Advance to next player
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  currentPhase = 'move';
  gameStats.turnsTaken++;
  updateUI();
  renderBoard();
}

function saveGame() {
  const saveData = {
    players,
    currentPlayerIndex,
    currentPhase,
    gameStats,
    gameBoard,
  };
  localStorage.setItem('tbs-game-save', JSON.stringify(saveData));
  alert('Game saved!');
}

function loadGame() {
  const saveData = localStorage.getItem('tbs-game-save');
  if (!saveData) {
    alert('No saved game found.');
    return;
  }
  const data = JSON.parse(saveData);
  // Deep copy to avoid references
  for (let i = 0; i < players.length; i++) {
    players[i] = { ...data.players[i] };
  }
  currentPlayerIndex = data.currentPlayerIndex;
  currentPhase = data.currentPhase;
  gameStats = { ...data.gameStats };
  gameBoard = data.gameBoard;

  updateUI();
  renderBoard();
  alert('Game loaded!');
}

moveBtn.addEventListener('click', () => {
  if (currentPhase !== 'move') {
    alert('Not the move phase!');
    return;
  }
  isMoving = true;
});

endTurnBtn.addEventListener('click', endTurn);
saveGameBtn.addEventListener('click', saveGame);
loadGameBtn.addEventListener('click', loadGame);

// Initialize
initBoard();
updateUI();
renderBoard();
