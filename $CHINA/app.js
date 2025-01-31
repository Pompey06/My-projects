const audio = document.getElementById("background-audio");
const muteIcon = document.getElementById("mute-icon");

audio.volume = 0.05;

muteIcon.addEventListener("click", () => {
   audio.muted = !audio.muted;
});
