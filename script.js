const audioPlayer = document.getElementById("audioPlayer");
const uploadInput = document.getElementById("upload");
const tooth = document.getElementById("playTooth");
const deleteBtn = document.getElementById("deleteBtn");

let playlist = [];
let currentTrack = 0;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function playNext() {
  if (playlist.length === 0) {
    audioPlayer.src = "Black Agnus.mp3";
  } else {
    currentTrack = (currentTrack + 1) % playlist.length;
    audioPlayer.src = URL.createObjectURL(playlist[currentTrack]);
  }
  audioPlayer.play();
}

uploadInput.addEventListener("change", () => {
  const files = Array.from(uploadInput.files).slice(0, 12);
  playlist = shuffleArray(files);
  currentTrack = -1;
  playNext();
});

tooth.addEventListener("click", () => {
  if (playlist.length === 0) {
    audioPlayer.src = "Black Agnus.mp3";
    audioPlayer.play();
  } else {
    playNext();
  }
});

deleteBtn.addEventListener("click", () => {
  playlist = [];
  currentTrack = 0;
  audioPlayer.pause();
  audioPlayer.src = "Black Agnus.mp3";
});