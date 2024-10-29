import { updateLeaderboard } from "../index.js";

export function getTop100Scores() {
  return fetch("https://quiz-des-devs-back-a29dbff38d40.herokuapp.com/top-100")
    .then((res) => {
      // Si la réponse est un JSON valide, la parse
      try {
        return res.json();
      } catch (error) {
        throw new Error("La réponse n'est pas un JSON valide : " + text);
      }
    })
    .catch((err) => console.error("Erreur : ", err));
}

export function submitScore(pseudo, score) {
  return fetch(
    "https://quiz-des-devs-back-a29dbff38d40.herokuapp.com/submit-score",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pseudo, score }),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la soumission du score");
      }
      console.log("réussi !");
      return res.json();
    })
    .then((data) => {
      console.log(data.message); //Affiche le message de succès
      updateLeaderboard();
    })
    .catch((err) => console.error("Erreur :", err));
}

export function getTotalVisits() {
  return fetch(
    "https://quiz-des-devs-back-a29dbff38d40.herokuapp.com/visit-count"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération du nombre de visites.");
      }
      return res.json();
    })
    .catch((err) => {
      console.error("Erreur : ", err);
      return null;
    });
}

export function trackVisit() {
  return fetch(
    "https://quiz-des-devs-back-a29dbff38d40.herokuapp.com/track-visit"
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération de la visite track.");
      }
      return res.json();
    })
    .catch((err) => console.error("Erreur : ", err));
}
