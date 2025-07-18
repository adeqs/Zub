let audio = new Audio();
let playlist = [];
let currentTrackIndex = -1;
let hasUserUploaded = false;
let fallbackTrack = "Black Agnus.mp3";

window.onload = () => {
  const saved = sessionStorage.getItem("playlist");
  if (saved) {
    playlist = JSON.parse(saved);
    hasUserUploaded = true;
  }

  if (!hasUserUploaded) {
    audio.src = fallbackTrack;
    audio.loop = true;
    audio.play();
  }
};

document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  playlist = files.map(file => URL.createObjectURL(file));
  sessionStorage.setItem("playlist", JSON.stringify(playlist));
  hasUserUploaded = true;
  audio.pause();
  playRandom();
});

function playRandom() {
  if (playlist.length === 0) {
    if (!hasUserUploaded) {
      audio.src = fallbackTrack;
      audio.loop = true;
      audio.play();
    }
    return;
  }

  audio.loop = false;

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * playlist.length);
  } while (newIndex === currentTrackIndex && playlist.length > 1);

  currentTrackIndex = newIndex;
  audio.src = playlist[currentTrackIndex];
  audio.play();

  audio.onended = () => {
    playRandom();
  };
}

function clearPlaylist() {
  playlist = [];
  sessionStorage.removeItem("playlist");
  audio.pause();
  audio.src = "";
}