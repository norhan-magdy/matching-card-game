export function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.loop = true;
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

export let mySound = new sound("../audio/puzzle-game-loop.mp3");
mySound.sound.volume = 0.2;
// Ensure user interaction is required to play the sound
document.addEventListener("DOMContentLoaded", function () {
  mySound.play();
});
document.addEventListener("click", function () {
  mySound.play();
});
document.addEventListener("keydown", function () {
  mySound.play();
});
