export function getTop100Scores() {
  return fetch("/top-100")
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
