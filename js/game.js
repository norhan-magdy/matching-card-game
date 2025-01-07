const bubbleContainer = document.querySelector(".bubbles");
for (let i = 0; i < 300; i++) {
  const bubble = document.createElement("span");
  bubble.style.setProperty("--i", i % 10); // Variable for animation delay
  bubbleContainer.appendChild(bubble);
}

let deuration = 700;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

// Shuffle function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    // Get random number
    random = Math.floor(Math.random() * current);

    // Decrease by one
    current--;

    // 1. Save current element in temp
    temp = array[current];
    // 2. Current element = new random element
    array[current] = array[random];
    // 3. Swap random element with temp
    array[random] = temp;
  }

  return array;
}

// Shuffle the orderRange before applying it
shuffle(orderRange);

// console.log("Shuffled Order:", orderRange);

// Add order CSS property to game blocks
blocks.forEach((block, index) => {
  // Apply shuffled order
  block.style.order = orderRange[index];

  // Add click event
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Flip block function
function flipBlock(selectedBlock) {
  // Add 'is-flipped' class
  selectedBlock.classList.add("is-flipped");

  // Collect all flipped blocks
  let allFlippedBlocks = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );

  // Check if two blocks are flipped
  if (allFlippedBlocks.length === 2) {
    // console.log('Two blocks flipped');

    // calling stop clicking function
    stopclicking();
    //check the flipped cards
    checkMatchingBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

//stop clicking function
function stopclicking() {
  // add class no clicking on main container
  blocksContainer.classList.add("no-clicking");

  //timer for event
  setTimeout(() => {
    //remove class no clicking after dauration
    blocksContainer.classList.remove("no-clicking");
  }, deuration);
}

//check matching blocks
// Check matching blocks
function checkMatchingBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, deuration);
  }
}

// Select the necessary DOM elements
const timerElement = document.querySelector(".time");

let seconds = 0; // Initialize the time variable
let interval; // Store the interval reference

// Start the game function
function startGame() {
  // Initialize game logic here
  //   console.log("Game started!");

  // Start the timer as soon as the game starts
  startTimer();
}

// Start counting time
function startTimer() {
  interval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000); // Update every second
}
startGame();
// Update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerElement.textContent = `Game Time: ${minutes}m ${remainingSeconds}s`;
}
