'use strict';

let currentScore = 0;
let finalScore0 = 0;
let finalScore1 = 0;
let activePlayer = 0;

//Selecting Elements
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const newGame = document.querySelector('.btn--new');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const diceImg = document.querySelector('.dice');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

//Entering Names
let playerName0 = prompt('Enter player 1');
let playerName1 = prompt('Enter player 2');
name0.textContent = playerName0;
name1.textContent = playerName1;

//Initial Conditions
diceImg.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0;
let playing = true;

//Updating winner UI
function winner(activePlayer) {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  diceImg.classList.add('hidden');
  playing = false;
}

//Switching Player
function switchPlayer() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
}

//Rolling dice
roll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;

    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//New Game
newGame.addEventListener('click', function () {
  playerName0 = prompt('Enter player 1');
  playerName1 = prompt('Enter player 2');
  name0.textContent = playerName0;
  name1.textContent = playerName1;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  activePlayer = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  currentScore = 0;
  finalScore0 = 0;
  finalScore1 = 0;
  diceImg.classList.add('hidden');
  playing = true;
});

//Button Hold
hold.addEventListener('click', function () {
  if (playing) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    if (activePlayer === 0) {
      finalScore0 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        finalScore0;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
    } else {
      finalScore1 += currentScore;
      document.querySelector(`#score--${activePlayer}`).textContent =
        finalScore1;
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      currentScore = 0;
    }
  }

  if (finalScore0 >= 100) {
    winner(activePlayer);
  } else if (finalScore1 >= 100) {
    winner(activePlayer);
  }

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
});
