export function getTop100Scores() {
  return fetch("/top-100")
    .then(async (res) => {
      const text = await res.text(); // Lis la réponse brute
      console.log("Réponse brute :", text); // Journalise la réponse

      // Si la réponse est un JSON valide, la parse
      try {
        return JSON.parse(text);
      } catch (error) {
        throw new Error("La réponse n'est pas un JSON valide : " + text);
      }
    })
    .catch((err) => console.error("Erreur : ", err));
}
