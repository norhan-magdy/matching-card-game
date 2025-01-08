import { mySound } from "./sound.js";

document.addEventListener("DOMContentLoaded", function () {
  mySound.sound.currentTime = localStorage.getItem("currentTime");
  mySound.sound.volume = localStorage.getItem("volume");
  mySound.play();
});

document.addEventListener("mousemove", function (e) {
  if (e.target.href) {
    localStorage.setItem("currentTime", `${mySound.sound.currentTime}`);
    console.log(e.target.href);
  }
});
