let progress = document.getElementById("progress");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

let updateTimer;

// When metadata loads (duration etc.)
song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

// Play / Pause Function
function playPause() {
    if (ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        clearInterval(updateTimer);
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");

        updateTimer = setInterval(() => {
            progress.value = song.currentTime;
        }, 300);
    }
}

// Seek by dragging slider
progress.addEventListener("input", () => {
    song.currentTime = progress.value;
});

// When dragging is done → Continue playing
progress.addEventListener("change", () => {
    song.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
});

// 🔥 Song END Event
song.addEventListener("ended", () => {
    clearInterval(updateTimer);
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
    progress.value = 0;   // Reset slider
});

// ⏪ Backward 5 seconds
function backward() {
    song.currentTime = Math.max(0, song.currentTime - 5);
    progress.value = song.currentTime;
}

// ⏩ Forward 5 seconds
function forward() {
    song.currentTime = Math.min(song.duration, song.currentTime + 5);
    progress.value = song.currentTime;
}
