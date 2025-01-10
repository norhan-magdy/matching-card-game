import { mySound } from "./sound.js";

document.addEventListener("DOMContentLoaded", function () {
  mySound.sound.src = localStorage.getItem("soundTrack");
  mySound.sound.currentTime = localStorage.getItem("currentTime");
  mySound.sound.volume = localStorage.getItem("volume");
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
