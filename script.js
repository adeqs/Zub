const fileInput = document.getElementById("fileInput");
const audio = document.getElementById("audio");
const tooth = document.getElementById("tooth");
const trash = document.getElementById("trash");

let playlist = [];
let currentIndex = 0;
let defaultPlaying = true;

function shuffle(array) {
  let a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playNext() {
  if (playlist.length === 0) return;
  if (currentIndex >= playlist.length) {
    playlist = shuffle(playlist);
    currentIndex = 0;
  }
  audio.src = URL.createObjectURL(playlist[currentIndex]);
  currentIndex++;
  defaultPlaying = false;
  audio.play();
}

fileInput.addEventListener("change", () => {
  const files = Array.from(fileInput.files).slice(0, 12);
  if (files.length === 0) return;
  playlist = shuffle(files);
  currentIndex = 0;
  defaultPlaying = false;
  playNext();
});

tooth.addEventListener("click", () => {
  if (playlist.length > 0) {
    playNext();
  } else {
    audio.src = "default.mp3";
    audio.play();
    defaultPlaying = true;
  }
});

audio.addEventListener("ended", () => {
  if (!defaultPlaying && playlist.length > 0) {
    playNext();
  }
});

trash.addEventListener("click", () => {
  playlist = [];
  currentIndex = 0;
  fileInput.value = "";
  audio.pause();
  audio.src = "default.mp3";
  defaultPlaying = true;
});