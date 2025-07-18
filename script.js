
let audio = new Audio();
let playlist = [];
let shuffledQueue = [];
let currentTrackIndex = -1;
let hasCustomTracks = false;
let defaultTrack = "Black Agnus.mp3";
let defaultTrackPlayed = false;

window.onload = () => {
  playlist = [];
};

document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  if (files.length < 1 || files.length > 12) {
    alert("Please upload between 1 and 12 MP3 files.");
    return;
  }

  playlist = files.map(file => URL.createObjectURL(file));
  generateShuffledQueue();
  currentTrackIndex = -1;
  hasCustomTracks = true;
  defaultTrackPlayed = true; // навсегда
});

function generateShuffledQueue() {
  shuffledQueue = [...Array(playlist.length).keys()];
  for (let i = shuffledQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
  }
}

function playNextShuffled() {
  if (hasCustomTracks) {
    if (shuffledQueue.length === 0) generateShuffledQueue();
    currentTrackIndex = shuffledQueue.shift();
    audio.src = playlist[currentTrackIndex];
    audio.play();
  } else if (!defaultTrackPlayed) {
    audio.src = defaultTrack;
    audio.play();
    defaultTrackPlayed = true; // никогда больше
  }
}

audio.addEventListener("ended", () => {
  if (hasCustomTracks) playNextShuffled();
});

function playRandom() {
  playNextShuffled();
}

function clearPlaylist() {
  playlist = [];
  shuffledQueue = [];
  currentTrackIndex = -1;
  hasCustomTracks = false; // не возвращаем default
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  document.getElementById("fileInput").value = "";
}
