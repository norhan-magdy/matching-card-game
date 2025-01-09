const bubbleContainer = document.querySelector(".bubbles");
for (let i = 0; i < 300; i++) {
  const bubble = document.createElement("span");
  bubble.style.setProperty("--i", i % 10); // Variable for animation delay
  bubbleContainer.appendChild(bubble);
}

let deuration = 700;
let blocksContainer = document.querySelector("#gameBlocks");

// Cards data
const cardData = [
  { technology: "apple", image: "images/3137044.png", alt: "apple" },
  { technology: "moon", image: "images/moon.png", alt: "moon" },
  { technology: "girl", image: "images/girl.png", alt: "girl" },
  { technology: "leaf", image: "images/leaf.png", alt: "leaf" },
  { technology: "record", image: "images/record.png", alt: "record" },
  { technology: "boy", image: "images/boy.png", alt: "boy" },
  { technology: "star", image: "images/star.png", alt: "star" },
  { technology: "sun", image: "images/sun.png", alt: "sun" },
];

// Duplicate the cards to make pairs
const gameCards = [...cardData, ...cardData];

// Shuffle the cards
function shuffle(array) {
  let current = array.length, random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    [array[current], array[random]] = [array[random], array[current]];
  }

  return array;
}

// Shuffle the game cards
shuffle(gameCards);

// Create and append cards dynamically
gameCards.forEach(card => {
  const gameBlock = document.createElement("div");
  gameBlock.classList.add("game-block");
  gameBlock.setAttribute("data-technology", card.technology);

  const front = document.createElement("div");
  front.classList.add("face", "front");

  const back = document.createElement("div");
  back.classList.add("face", "back");
  const img = document.createElement("img");
  img.src = card.image;
  img.alt = card.alt;
  back.appendChild(img);

  gameBlock.appendChild(front);
  gameBlock.appendChild(back);

  blocksContainer.appendChild(gameBlock);

  gameBlock.addEventListener("click", function () {
    flipBlock(gameBlock);
  });
});
const flipAudio= new Audio('audio/flip.mp3')
const wrongAudio= new Audio('audio/faliure.mp3')
const successAudio= new Audio('audio/success.mp3')
// Flip block function
function flipBlock(selectedBlock) {
  flipAudio.currentTime=0;
  flipAudio.play();
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = Array.from(blocksContainer.children).filter((block) =>
    block.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopclicking();
    checkMatchingBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopclicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, deuration);
}

function checkMatchingBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    successAudio.currentTime=0
    successAudio.play();
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      wrongAudio.currentTime=0;
      wrongAudio.play();
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, deuration);
  }
}

// Timer and win logic
const timerElement = document.querySelector(".time");
let seconds = 0;
let interval;

function startGame() {
  startTimer();
}

function startTimer() {
  interval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerElement.textContent = `Game Time: ${minutes}m ${remainingSeconds}s`;
}

startGame();

// Show win popup
function showWinPopup(message) {
  const popup = document.getElementById('winPopup');
  const messageElement = document.getElementById('winMessage');

  messageElement.textContent = message;
  popup.style.visibility = 'visible';
  popup.style.opacity = '1';
}

// Play again button functionality
document.getElementById('playAgainBtn').addEventListener('click', () => {
  location.reload(); // Reload the game
});

// Check win condition
function checkWinCondition() {
  const matchedBlocks = document.querySelectorAll('.has-match');
  if (matchedBlocks.length === blocksContainer.children.length) {
    clearInterval(interval);
    const timeTaken = seconds;
    const triesElement = document.querySelector('.tries span');
    const triesCount = parseInt(triesElement.innerHTML);
    const finalScore = triesCount;
    const previousScore = localStorage.getItem('bestScore1');
    let message = `Time Taken: ${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s\nTries: ${triesCount}\nYour Score: ${finalScore}`;

    if (previousScore) {
      if (finalScore < previousScore) {
        message += `\n🎊 New High Score! Previous Best: ${previousScore}`;
        localStorage.setItem('bestScore1', finalScore);
      } else {
        message += `\nYour Best Score: ${previousScore}`;
      }
    } else {
      message += `\nThis is your first game!`;
      localStorage.setItem('bestScore1', finalScore);
    }

    showWinPopup(message);
  }
}

// Trigger checkWinCondition on each transitionend event
blocksContainer.querySelectorAll('.game-block').forEach((block) => {
  block.addEventListener('transitionend', () => {
    checkWinCondition();
  });
});
