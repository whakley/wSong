play_button = document.getElementById("play-button");
play_button.addEventListener("click", function() {
    if (play_button.classList.contains("playing")) {
        play_button.classList.remove("playing");
        play_button.innerHTML = '<img src = "assets/img/play.png">';
        // Pause the audio
        audio.pause();
    } else {
        play_button.classList.add("playing");
        play_button.innerHTML = '<img src = "assets/img/pause.png">';
        // Play the audio
        audio.play();
    }
});
