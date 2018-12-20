// /*
// GAME RULES: "The Pig Game"

// - The game has 2 players, playing in rounds
// - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
// - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
// - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
// - The first player to reach 100 points on GLOBAL score wins the game

// */
// let scores, roundScore, activePlayer, gamePlaying, warning;
// init();

// document.querySelector('.btn-roll').addEventListener('click', function() {
//   if (gamePlaying) {
//     let roll = Math.floor(Math.random() * 6) + 1;

//     const dieDOM = document.querySelector('.dice');
//     dieDOM.style.display = 'block';
//     dieDOM.src = `./dice-${roll}.png`;

    
//     if (roll === 1) {
//       nextPlayer();
//     } else if (warning && roll === 6) {
//       scores[activePlayer] = 0;
//       document.getElementById(`score-${activePlayer}`).textContent = 0;
//       nextPlayer();
//     }else {
//       removeWarning();
//       roundScore += roll;
//       document.getElementById(`current-${activePlayer}`).textContent = roundScore;
//     }

//     if (roll === 6) {
//       setWarning();
//     }
//   }
// });

// document.querySelector('.btn-hold').addEventListener('click', function() {
//   if (gamePlaying) {
//     scores[activePlayer] += roundScore;
//     document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    
//     if (scores[activePlayer] >= 100) {
//       document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!!';
//       document.querySelector('.dice').display = 'none';
//       document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
//       document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
//       gamePlaying = false;
//     } else {
//       nextPlayer();
//     }
//   }
// });

// document.querySelector('.btn-new').addEventListener('click', init);

// function init() {
//   scores = [0, 0];
//   roundScore = 0;
//   activePlayer = 0;
//   gamePlaying = true;

//   document.querySelector('.dice').style.display = 'none';

//   document.getElementById('score-0').textContent = 0;
//   document.getElementById('score-1').textContent = 0;
//   document.getElementById('current-0').textContent = 0;
//   document.getElementById('current-1').textContent = 0;

//   document.querySelector(`.player-0-panel`).classList.remove('winner');
//   document.querySelector(`.player-0-panel`).classList.remove('active');
//   document.querySelector(`.player-0-panel`).classList.add('active');
//   document.getElementById(`name-0`).textContent = 'Player 1';

//   document.querySelector(`.player-1-panel`).classList.remove('winner');
//   document.querySelector(`.player-1-panel`).classList.remove('active');
//   document.getElementById(`name-1`).textContent = 'Player 2';
// }

// function setWarning() {
//   warning = true;
//   document.getElementById(`name-${activePlayer}`).textContent = 'Warning!';
// }

// function removeWarning() {
//   warning = false;
//   document.getElementById(`name-${activePlayer}`).textContent = `Player ${activePlayer + 1}`;
// }

// function nextPlayer() {
//   removeWarning();
//   roundScore = 0;
//   document.getElementById(`current-${activePlayer}`).textContent = roundScore;

//   activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

//   document.querySelector(`.player-0-panel`).classList.toggle('active');
//   document.querySelector(`.player-1-panel`).classList.toggle('active');

//   document.querySelector('.dice').style.display = 'none';
// }

/****************************************
 * *************** His Solution *********
 ***************************************/

let scores, roundScore, activePlayer, gamePlaying, lastRoll;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    let roll = Math.floor(Math.random() * 6) + 1;
    const dieDOM1 = document.getElementById('die-1');
    dieDOM1.style.display = 'block';
    dieDOM1.src = `./dice-${roll}.png`;
    
    let roll2 = Math.floor(Math.random() * 6) + 1;
    const dieDOM2 = document.getElementById('die-2');
    dieDOM2.style.display = 'block';
    dieDOM2.src = `./dice-${roll2}.png`;

    /* if (roll === 6 && lastRoll === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`) = 0;
      nextPlayer();
    } else */ if (roll !== 1 && roll2 !== 1) {
      roundScore += roll + roll2;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      nextPlayer();
    }

    // lastRoll = roll
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    let winningScore = document.querySelector('.final-score').value || 100;

    if (scores[activePlayer] >= winningScore) {
      document.getElementById(`name-${activePlayer}`).textContent = 'WINNER!!';
      document.getElementById('die-1').display = 'none';
      document.getElementById('die-2').display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('die-1').style.display = 'none';
  document.getElementById('die-2').style.display = 'none';

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.getElementById(`name-0`).textContent = 'Player 1';

  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('active');
  document.getElementById(`name-1`).textContent = 'Player 2';
}

function nextPlayer() {
  roundScore = 0;
  document.getElementById(`current-${activePlayer}`).textContent = roundScore;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.querySelector(`.player-0-panel`).classList.toggle('active');
  document.querySelector(`.player-1-panel`).classList.toggle('active');

  document.getElementById('die-1').style.display = 'none';
  document.getElementById('die-2').style.display = 'none';
}