let audioFiles = [];

document.getElementById('fileInput').addEventListener('change', function (e) {
  audioFiles = Array.from(e.target.files);
});

function playRandom() {
  if (audioFiles.length === 0) return;

  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  const audio = new Audio(URL.createObjectURL(audioFiles[randomIndex]));
  audio.play();
}
