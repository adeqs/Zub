
let audio = new Audio();
let playlist = [];
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
  currentTrackIndex = -1;
});

function playRandom() {
  if (playlist.length === 0) {
    alert("Upload MP3 files first.");
    return;
  }

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * playlist.length);
  } while (newIndex === currentTrackIndex && playlist.length > 1);

  currentTrackIndex = newIndex;
  audio.src = playlist[currentTrackIndex];
  audio.play();
}

// Автоматически переходит к следующему треку
audio.addEventListener("ended", playRandom);

function clearPlaylist() {
  playlist = [];
  currentTrackIndex = -1;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  document.getElementById("fileInput").value = "";
}
