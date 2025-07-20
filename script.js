
let audio = new Audio();
let playlist = [];
let playedIndexes = [];
let currentTrackIndex = -1;
let defaultTrack = "default.mp3";
let usingDefault = true;

window.onload = () => {
    const saved = sessionStorage.getItem("playlist");
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
            playlist = parsed;
            usingDefault = false;
        }
    }

    if (playlist.length === 0) {
        playlist = [defaultTrack];
        usingDefault = true;
    }

    audio.addEventListener('ended', playNextInShuffle);
};

document.getElementById("fileInput").addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0 || files.length > 12) {
        alert("Please upload from 1 to 12 MP3 files.");
        return;
    }

    playlist = files.map(file => URL.createObjectURL(file));
    sessionStorage.setItem("playlist", JSON.stringify(playlist));
    usingDefault = false;
    playedIndexes = [];
    playNextInShuffle();
});

document.getElementById("tooth").addEventListener("click", () => {
    playNextInShuffle();
});

document.getElementById("trash").addEventListener("click", () => {
    sessionStorage.removeItem("playlist");
    playlist = [defaultTrack];
    playedIndexes = [];
    currentTrackIndex = -1;
    usingDefault = true;
    audio.pause();
    audio.src = "";
});

function playNextInShuffle() {
    if (playlist.length === 0) return;

    if (playedIndexes.length === playlist.length) {
        playedIndexes = [];
    }

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * playlist.length);
    } while (playedIndexes.includes(newIndex) && playlist.length > 1);

    playedIndexes.push(newIndex);
    currentTrackIndex = newIndex;
    audio.src = playlist[newIndex];
    audio.play();
}
