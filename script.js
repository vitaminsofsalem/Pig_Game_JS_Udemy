'use strict';

// * * Constants ( Final Variables )
const MIN = 1;
const MAX = 6;
const WIN_THRESHOLD = 100;

// ---------------------------------------------------------------------------------------------------------------------
// * * Functions containing game logic

// Generate Random Number
function randNumGen(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
    Function removes player active status 
    from parameter 1 and adds it to parameter 2
    @param player1
    @param player2
    @return: none
*/
function switchActive(p1, p2) {
  p1.classList.remove('player--active');
  p2.classList.add('player--active');
}

// Player Wins Logic
function playerWins(p) {
  p.classList.add('player--winner');
  diceImg.classList.add('hidden');
  rollBtn.disabled = true;
  holdBtn.disabled = true;
}

// Roll Dice Button Logic
function switchPlayer() {
  const randNum = randNumGen(MIN, MAX);

  // dice image generation
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${randNum}.png`;

  // Switch Player Logic
  if (player1.classList.contains('player--active')) {
    if (randNum !== 1) {
      currentP1.textContent = Number(currentP1.textContent) + randNum;
    } else {
      switchActive(player1, player2);
      currentP1.textContent = 0;
    }
  } else {
    if (randNum !== 1) {
      currentP2.textContent = Number(currentP2.textContent) + randNum;
    } else {
      switchActive(player2, player1);
      currentP2.textContent = 0;
    }
  }
}

// Holding Game Logic
function holdingLogic() {
  if (player1.classList.contains('player--active')) {
    totalP1.textContent =
      Number(totalP1.textContent) + Number(currentP1.textContent);
    currentP1.textContent = 0;
    switchActive(player1, player2);
    if (Number(totalP1.textContent) >= WIN_THRESHOLD) {
      playerWins(player1);
    }
  } else {
    totalP2.textContent =
      Number(totalP2.textContent) + Number(currentP2.textContent);
    currentP2.textContent = 0;
    switchActive(player2, player1);
    if (Number(totalP2.textContent) >= WIN_THRESHOLD) {
      playerWins(player2);
    }
  }
}

// Restarts The Game
function restartGame() {
  // Remove Winner Class
  player1.classList.contains('player--winner')
    ? player1.classList.remove('player--winner')
    : player2.classList.remove('player--winner');

  // Reset Initial Values
  totalP1.textContent = 0;
  currentP1.textContent = 0;
  totalP2.textContent = 0;
  currentP2.textContent = 0;

  // Reactivate Buttons
  rollBtn.disabled = false;
  holdBtn.disabled = false;

  // Make Player 1 active
  switchActive(player2, player1);
}

// ---------------------------------------------------------------------------------------------------------------------
// * * Variables

// Dice Image Variables
const diceImg = document.querySelector('.dice');

// Game Buttons Variables
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// Player 1 variables
const player1 = document.querySelector('.player--0');
const totalP1 = document.getElementById('score--0');
const currentP1 = document.getElementById('current--0');

// Player 2 variables
const player2 = document.querySelector('.player--1');
const totalP2 = document.getElementById('score--1');
const currentP2 = document.getElementById('current--1');

// ---------------------------------------------------------------------------------------------------------------------
// * * Event Listeners

// Reset game inputs
diceImg.classList.add('hidden');
totalP1.textContent = 0;
totalP2.textContent = 0;

// Roll Dice Functionality
rollBtn.addEventListener('click', switchPlayer);

// Holding button functionality
holdBtn.addEventListener('click', holdingLogic);

// New Game button functionality
newGameBtn.addEventListener('click', restartGame);
