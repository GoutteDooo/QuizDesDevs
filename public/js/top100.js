export const top100Button = document.querySelector(".top-100");

const leaderboard = document.querySelector(".leaderboard");
let toggleLB = false;

top100Button.addEventListener("click", () => {
  toggleLB = !toggleLB;
  toggleLB
    ? (leaderboard.style.display = "block")
    : (leaderboard.style.display = "none");
});
