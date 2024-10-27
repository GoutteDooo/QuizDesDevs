// Fonction pour récupérer le Top 100 depuis l'API
function getTop100Scores() {
  fetch("/top-100")
    .then((res) => res.json())
    .then((data) => {
      // Afficher les scores dans l'interface utilisateur
      const scoreList = document.getElementById("score-list");
      scoreList.innerHTML = ""; // Nettoyer la liste
      data.forEach((score, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${score.pseudo}: ${score.score}`;
        scoreList.appendChild(listItem);
      });
    })
    .catch((error) => console.error("Erreur:", error));
}

// Appeler la fonction pour afficher les scores dès que la page est chargée
document.addEventListener("DOMContentLoaded", getTop100Scores);

module.exports = { getTop100Scores };
