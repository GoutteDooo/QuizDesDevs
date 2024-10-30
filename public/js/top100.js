export const top100Button = document.querySelector(".top-100");
const blurBackground = document.querySelector(".blur-background");

const leaderboard = document.querySelector(".leaderboard");
let toggleLB = false;

top100Button.addEventListener("click", () => {
  toggleLB = !toggleLB;
  playLBSound();
  if (toggleLB) {
    leaderboard.style.display = "block";
  } else {
    leaderboard.style.display = "none";
  }
});

const playLBSound = () => {
  const audio_lb = new Audio("./assets/sounds/leaderboard.mp3");
  audio_lb.preload = "auto";
  if (toggleLB) {
    audio_lb.currentTime = 3.3;
    audio_lb.play();
  } else {
    audio_lb.currentTime = 9.5;
    audio_lb.play();
  }
  setTimeout(() => {
    audio_lb.pause();
    delete audio_lb.audio;
  }, 2000);
};
