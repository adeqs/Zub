
let tracks = [];

document.getElementById('fileInput').addEventListener('change', function(event) {
  tracks = [];
  const files = event.target.files;
  if (files.length !== 12) {
    alert("Please upload exactly 12 mp3 files.");
    return;
  }
  for (let i = 0; i < files.length; i++) {
    const url = URL.createObjectURL(files[i]);
    tracks.push(url);
  }
});

function playRandom() {
  if (tracks.length !== 12) {
    alert("Upload 12 mp3 files first.");
    return;
  }
  const index = Math.floor(Math.random() * tracks.length);
  const audio = document.getElementById("player");
  audio.src = tracks[index];
  audio.play();
}
