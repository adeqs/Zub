
let audio = new Audio();
let playlist = [];
let shuffledQueue = [];
let currentTrackIndex = -1;

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
});

function generateShuffledQueue() {
  shuffledQueue = [...Array(playlist.length).keys()];
  for (let i = shuffledQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQueue[i], shuffledQueue[j]] = [shuffledQueue[j], shuffledQueue[i]];
  }
}

function playNextShuffled() {
  if (playlist.length === 0) {
    return;
  }

  if (shuffledQueue.length === 0) {
    generateShuffledQueue(); // 🔁 новая очередь, если закончилась
  }

  currentTrackIndex = shuffledQueue.shift();
  audio.src = playlist[currentTrackIndex];

  audio.play().catch(err => {
    console.error("Playback failed:", err);
  });
}

audio.addEventListener("ended", () => {
  playNextShuffled(); // 🔁 немедленно проигрывает следующий трек
});

function playRandom() {
  playNextShuffled(); // при клике на зуб
}

function clearPlaylist() {
  playlist = [];
  shuffledQueue = [];
  currentTrackIndex = -1;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  document.getElementById("fileInput").value = "";
}
