const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const countdownNum = document.querySelector('#countdown');
const moleCount = document.querySelector('.mole-count');
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start-game');
const showScore = document.querySelector('.show-score');
let lastHole;
let timeUp = false;
let score = 0;
let count = 0;
let timeLeft = 15;

function randomTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
   const idx = Math.floor(Math.random() * holes.length);
   const hole = holes[idx];
   if (hole === lastHole) {
       console.log('Same hole');
       return randomHole(holes);
   }
   lastHole = hole;
   return hole;
}

function peep() {
   const time = randomTime(500, 1000);
   const hole = randomHole(holes);
   hole.classList.add('up');
   setTimeout(() => {
       hole.classList.remove('up');
       if (!timeUp) peep();
   }, time);

}


function startGame() {
   scoreBoard.textContent = 0;
   moleCount.textContent = 0;
   timeUp = false;
   score = 0;
   count = 0;
   timeLeft = 15;
   button.style.visibility = 'hidden';

   peep();
   
   setTimeout(() => {
       timeUp = true;
       button.innerHTML = '<img src="./images/play-again.png" alt="play-again" style="margin-right:70px; height: 60px; width: 100px;">'
       button.style.visibility = 'visible';
       if (score > 0) {
        showScore.classList.remove('hide');
        const message = 'Your score: ' + score + (score >= 50 ? " GREAT!" : '');
        showScore.textContent = message;
      }
   }, 15000);
   countdownTimer();
}

function countdownTimer() {
   var timer = setInterval(function () {
       timeLeft--;
       countdownNum.textContent = timeLeft;
       if (timeLeft <= 0)
           clearInterval(timer);
   }, 1000);

}



function bonk(e) {
   if (!e.isTrusted) return;
   score += 10;
   count++;
   this.parentNode.classList.remove('up');
   scoreBoard.textContent = score;
   moleCount.textContent = count;

}

moles.forEach(mole => mole.addEventListener('click', bonk));
