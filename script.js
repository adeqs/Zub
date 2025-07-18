
let audioFiles = [];
let currentAudio = null;

document.getElementById('fileInput').addEventListener('change', function(e) {
  const files = Array.from(e.target.files).filter(file => file.type === "audio/mpeg");
  if (files.length === 12) {
    audioFiles = files.map(file => URL.createObjectURL(file));
  } else {
    alert("Please upload exactly 12 mp3 files.");
  }
});

function playRandom() {
  if (audioFiles.length === 0) {
    alert("Upload 12 songs first.");
    return;
  }

  if (currentAudio) {
    currentAudio.pause();
  }

  const index = Math.floor(Math.random() * audioFiles.length);
  currentAudio = new Audio(audioFiles[index]);
  currentAudio.play();
}
