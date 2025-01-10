import { mySound } from "./sound.js";

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("soundTrack")) {
    mySound.sound.src = localStorage.getItem("soundTrack");
    mySound.sound.currentTime = localStorage.getItem("currentTime");
    mySound.sound.volume = localStorage.getItem("volume");
  } else {
    localStorage.setItem("soundTrack", "../audio/puzzle-game-loop.mp3");
    localStorage.setItem("currentTime", "0");
    localStorage.setItem("volume", "0.3");
  }
  mySound.play();
});

document.addEventListener("click", function (e) {
  if (e.target.href) {
    localStorage.setItem("currentTime", `${mySound.sound.currentTime}`);
  }
  if (window.location.href.includes("index") && e.target.id) {
    localStorage.setItem("currentTime", `${mySound.sound.currentTime}`);
  }
});
