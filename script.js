
let audio = new Audio();
let playlist = [];
let currentTrackIndex = -1;

window.onload = () => {
  const saved = sessionStorage.getItem("playlist");
  if (saved) {
    playlist = JSON.parse(saved);
  }
};

document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = Array.from(event.target.files);
  if (files.length < 1 || files.length > 12) {
    alert("Please upload between 1 and 12 MP3 files.");
    return;
  }

  playlist = files.map(file => URL.createObjectURL(file));
  sessionStorage.setItem("playlist", JSON.stringify(playlist));
});

function playRandom() {
  if (playlist.length === 0) {
    alert("Upload 1 to 12 MP3 files first.");
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
