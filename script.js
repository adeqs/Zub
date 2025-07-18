
let audio = new Audio();
let playlist = [];
let currentTrackIndex = -1;
let shuffledIndexes = [];
let isUserPlaylist = false;

// Default track
const defaultTrack = "Black Agnus.mp3";

// Load from sessionStorage
window.onload = () => {
  const saved = sessionStorage.getItem("playlist");
  const user = sessionStorage.getItem("isUserPlaylist");

  if (saved) {
    playlist = JSON.parse(saved);
    isUserPlaylist = user === "true";
    prepareShuffle();
  } else {
    audio.src = defaultTrack;
    audio.loop = true;
  }
};

document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  if (files.length < 1 || files.length > 12) {
    alert("Please upload between 1 and 12 MP3 files.");
    return;
  }

  playlist = files.map(file => URL.createObjectURL(file));
  isUserPlaylist = true;
  sessionStorage.setItem("playlist", JSON.stringify(playlist));
  sessionStorage.setItem("isUserPlaylist", "true");
  prepareShuffle();
});

function prepareShuffle() {
  shuffledIndexes = [...Array(playlist.length).keys()].sort(() => 0.5 - Math.random());
  currentTrackIndex = 0;
}

function playRandom() {
  if (playlist.length === 0 && !isUserPlaylist) {
    audio.src = defaultTrack;
    audio.loop = true;
    audio.play();
    return;
  }

  if (shuffledIndexes.length === 0) {
    prepareShuffle();
  }

  const index = shuffledIndexes[currentTrackIndex % shuffledIndexes.length];
  audio.src = playlist[index];
  audio.play();
  currentTrackIndex++;
}

function clearPlaylist() {
  sessionStorage.clear();
  playlist = [];
  shuffledIndexes = [];
  currentTrackIndex = -1;
  isUserPlaylist = false;
  audio.pause();
  audio.src = defaultTrack;
  audio.loop = true;
  audio.play();
}
