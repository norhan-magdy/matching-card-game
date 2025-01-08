

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
