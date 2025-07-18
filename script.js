let audio = new Audio();
let playlist = [];
let currentIndex = -1;
let shuffled = [];
let hasUserUploaded = false;

window.onload = () => {
  const saved = sessionStorage.getItem("playlist");
  if (saved) {
    playlist = JSON.parse(saved);
    updateSongCount();
  } else {
    audio.src = "default.mp3";
  }
};

document.getElementById("fileInput").addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  if (files.length < 1 || files.length > 12) {
    alert("Please upload from 1 to 12 MP3 files.");
    return;
  }

  playlist = files.map(file => URL.createObjectURL(file));
  sessionStorage.setItem("playlist", JSON.stringify(playlist));
  hasUserUploaded = true;
  shufflePlaylist();
  updateSongCount();
});

document.getElementById("controls").addEventListener("click", () => {
  playlist = [];
  shuffled = [];
  currentIndex = -1;
  sessionStorage.clear();
  updateSongCount();
  if (hasUserUploaded) {
    audio.pause();
    audio.src = "";
  }
});

function playRandom() {
  if (playlist.length === 0 && !hasUserUploaded) {
    audio.play();
    return;
  }

  if (shuffled.length === 0) {
    shufflePlaylist();
  }

  currentIndex = shuffled.pop();
  audio.src = playlist[currentIndex];
  audio.play();
}

function shufflePlaylist() {
  shuffled = [...Array(playlist.length).keys()];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
}

function updateSongCount() {
  document.getElementById("song-count").innerText = playlist.length > 0 ? playlist.length + " songs" : "Upload songs";
}
