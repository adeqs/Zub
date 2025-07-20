let audioPlayer = document.getElementById("audioPlayer");
let playButton = document.getElementById("playButton");
let deleteButton = document.getElementById("deleteButton");
let fileInput = document.getElementById("fileInput");
let uploadLabel = document.querySelector(".upload-label");

let playlist = [];
let currentIndex = 0;

uploadLabel.onclick = () => fileInput.click();

fileInput.addEventListener("change", function () {
    if (fileInput.files.length > 0) {
        playlist = Array.from(fileInput.files);
        shufflePlaylist();
        currentIndex = 0;
        playCurrent();
    }
});

playButton.onclick = () => {
    if (playlist.length > 0) {
        playCurrent();
    } else {
        audioPlayer.src = "Black Agnus.mp3";
        audioPlayer.play();
    }
};

deleteButton.onclick = () => {
    playlist = [];
    currentIndex = 0;
    audioPlayer.pause();
    audioPlayer.src = "Black Agnus.mp3";
};

audioPlayer.addEventListener("ended", function () {
    if (playlist.length > 0) {
        currentIndex++;
        if (currentIndex >= playlist.length) {
            shufflePlaylist();
            currentIndex = 0;
        }
        playCurrent();
    }
});

function playCurrent() {
    let file = playlist[currentIndex];
    audioPlayer.src = URL.createObjectURL(file);
    audioPlayer.play();
}

function shufflePlaylist() {
    for (let i = playlist.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    }
}