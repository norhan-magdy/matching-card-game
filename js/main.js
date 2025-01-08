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

const bgSound = document.getElementById("background-music");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play().catch((error) => {
      console.error("Playback failed:", error);
    });
  };
  this.stop = function () {
    this.sound.pause();
  };
}

let mySound = new sound("audio/megalovania.mp3");
mySound.sound.volume = 0.5;

// Ensure user interaction is required to play the sound
document.addEventListener("click", function () {
  mySound.play();
});

document.addEventListener("keydown", function () {
  mySound.play();
});

bgSound.addEventListener("change", changeVolume);

function changeVolume() {
  mySound.sound.volume = bgSound.value / 100;
}

const save = document.getElementById("save");

save.addEventListener("click", () => {
  console.log(mySound.sound);

  // window.location.href = `${window.location.origin}/index.html`;
  console.log(mySound.sound.volume);
});
