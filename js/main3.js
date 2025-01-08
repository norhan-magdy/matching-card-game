const bubbleContainer = document.querySelector(".background-bubbles");

function createBubble() {
  const bubble = document.createElement("span");
  const size = Math.random() * 40 + 10; // Random size between 10px and 50px
  const colorArray = [
    "#F8BBD0",
    "#B2DFDB",
    "#E1BEE7",
    "#FFD1DC",
    "#C6E2FF",
    "#FFF9C4",
  ];
  const randomColor = colorArray[Math.floor(Math.random() * colorArray.length)];

  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.backgroundColor = randomColor;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.animationDuration = `${Math.random() * 6 + 4}s`; // Random duration between 4s and 10s
  bubble.style.animationDelay = `${Math.random() * 3}s`; // Random delay up to 3s

  bubbleContainer.appendChild(bubble);

  // Remove bubble after animation ends
  bubble.addEventListener("animationend", () => {
    bubble.remove();
  });
}

setInterval(createBubble, 350); // Create a bubble every 500ms

const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
const settings = document.getElementById("settings");
const instruction = document.getElementById("instruction");

easy.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/easy.html`;
});
medium.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/intermediate.html`;
});
hard.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/hard.html`;
});
settings.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/settings.html`;
});
instruction.addEventListener("click", () => {
  window.location.href = `${window.location.origin}/instructions.html`;
});
