console.log("Welcome to Tic Tac Toe");

let music = new Audio("Audio/congratulations-you-won.mp3");
let audioturn = new Audio("Audio/you-lost-again-and-again.mp3");
let gameOver = new Audio("Audio/Its a Draw Stand Down Sound Effect (Call of Duty Black Ops) [TubeRipper.com].m4a");
let turn = "X";
let isgameover = false;

// Function to change turn
const changeTurn = () => {
  return turn === "X" ? "O" : "X";
};

// Function to check for a win
const checkWin = () => {
  let boxtext = document.getElementsByClassName('boxtext');
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];

  let gameover = false;

  // Hide all images initially
  document.querySelector('.you-win').style.width = "0px";
  document.querySelector('.you-lose').style.width = "0px";
  document.querySelector('.game-over').style.width = "0px";
  document.querySelector('.overlay').style.display = "none";

  wins.forEach(e => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[1]].innerText === boxtext[e[2]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      isgameover = true;
      gameover = true;

      if (boxtext[e[0]].innerText === "X") {
        document.querySelector('.info').innerText = "X Wins!";
        document.querySelector('.you-win').style.width = "200px";
        music.play(); // Winning sound
        updateScore("X"); // Update score for X
      } else {
        document.querySelector('.info').innerText = "O Wins!";
        document.querySelector('.you-lose').style.width = "200px";
        audioturn.play(); // Losing sound
        updateScore("O"); // Update score for O
      }

      // Draw winning line
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";

      document.querySelector('.overlay').style.display = "flex";
    }
  });

  if (!gameover) {
    let allFilled = true;
    Array.from(boxtext).forEach(element => {
      if (element.innerText === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      isgameover = true;
      document.querySelector('.info').innerText = "It's a Draw!";
      document.querySelector('.game-over').style.width = "200px"; // Show 'Game Over' image
      document.querySelector('.overlay').style.display = "flex";
      gameOver.play(); // Draw sound
      updateScore("Draw"); // Update score for Draw
    }
  }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  let boxtext = element.querySelector('.boxtext');
  element.addEventListener('click', () => {
    if (boxtext.innerText === '' && !isgameover) {
      boxtext.innerText = turn;   // Set "X" or "O"
      turn = changeTurn();        // Call the correct function
      checkWin();                 // Check for a win
      if (!isgameover) {
        document.querySelector(".info").innerText = "Turn for " + turn;
      }
    }
  });
});

// Adding listener for reset
// Adding listener for reset
let resetButton = document.getElementById("reset"); // Make sure you have a reset button with id="reset"

resetButton.addEventListener('click', () => {
  let boxtext = document.querySelectorAll(".boxtext");
  Array.from(boxtext).forEach(element => {
    element.innerText = ""; // Clear all boxes
  });

  turn = "X"; // Reset turn
  isgameover = false; // Reset game state
  document.querySelector(".info").innerText = "Turn for " + turn;

  // Reset audio
  music.pause();
  music.currentTime = 0;
  audioturn.pause();
  audioturn.currentTime = 0;
  gameOver.pause();
  gameOver.currentTime = 0;

  // Hide all images and reset the line
  document.querySelector('.you-win').style.width = "0px";
  document.querySelector('.you-lose').style.width = "0px";
  document.querySelector('.game-over').style.width = "0px";
  document.querySelector(".line").style.width = "0";

  // Reset scores
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  document.getElementById("score-x").innerText = scoreX;
  document.getElementById("score-o").innerText = scoreO;
  document.getElementById("score-draw").innerText = scoreDraw;
});
// for table score
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
    document.getElementById("score-x").innerText = scoreX;
  } else if (winner === "O") {
    scoreO++;
    document.getElementById("score-o").innerText = scoreO;
  } else {
    scoreDraw++;
    document.getElementById("score-draw").innerText = scoreDraw;
  }
}



// for user to close the image 


function closedOverlay()
{
  document.querySelector(".overlay").style.display = "none";
}
