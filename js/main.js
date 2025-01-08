const bgSound = document.getElementById("background-music");

import { mySound } from "./sound.js";

bgSound.addEventListener("change", changeVolume);

function changeVolume() {
  mySound.sound.volume = bgSound.value / 100;
  localStorage.setItem("soundTrack", `${mySound.sound.src}`);
  localStorage.setItem("currentTime", `${mySound.sound.currentTime}`);
  localStorage.setItem("volume", mySound.sound.volume);
}

const save = document.getElementById("save");

save.addEventListener("click", () => {
  changeVolume();
  window.location.href = `${window.location.origin}/index.html`;
});
