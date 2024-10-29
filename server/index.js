const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

//Autoriser uniquement GitHub Pages
app.use(
  cors({
    origin: "https://gouttedooo.github.io/QuizDesDevs/",
  })
);

//Middleware pour parser les requêtes JSON
app.use(express.json());

// Connexion à la base de données (ou création si elle n'existe pas)
const db = new sqlite3.Database("./quiz.db", (err) => {
  if (err) {
    console.error(
      "Erreur lors de l'ouverture de la base de données.",
      err.message
    );
  } else {
    console.log("Connexion à la base de données SQLite réussie.");
  }
});

//Créer la table pour les scores
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pseudo TEXT,
    score INTEGER
    )`);

  //Créer la table pour la fréquentation
  db.run(`
      CREATE TABLE IF NOT EXISTS frequentation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date_connexion TEXT
        )`);
});

/* SCORES */
//Route pour soumettre un score
app.post("/submit-score", (req, res) => {
  const { pseudo, score } = req.body;

  // Étape 1 : Récupérer les scores existants triés par ordre décroissant (du plus élevé au plus faible)
  db.all("SELECT * FROM scores ORDER BY score DESC LIMIT 100", (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des scores" });
      return;
    }

    // Étape 2 : Vérifier si le score est assez élevé pour entrer dans le Top 100
    if (rows.length < 100 || score > rows[rows.length - 1].score) {
      // Ajouter le nouveau score
      db.run(
        `INSERT INTO scores (pseudo, score) VALUES (?, ?)`,
        [pseudo, score],
        (err) => {
          if (err) {
            res
              .status(500)
              .json({ message: "Erreur lors de l'enregistrement du score" });
            return;
          }

          // Étape 3 : Supprimer le score le plus bas si le tableau dépasse 100 entrées
          db.run(
            "DELETE FROM scores WHERE id NOT IN (SELECT id FROM scores ORDER BY score DESC LIMIT 100)",
            (err) => {
              if (err) {
                res
                  .status(500)
                  .json({ message: "Erreur lors du nettoyage des scores" });
                return;
              }

              // Réponse de succès
              res.json({
                message: "Félicitations, votre score est dans le Top 100 !",
              });
            }
          );
        }
      );
    } else {
      // Si le score n'est pas assez élevé, on renvoie un message de non-admissibilité
      res.json({
        message:
          "Désolé, votre score n'est pas suffisant pour entrer dans le Top 100",
      });
    }
  });
});

//récupére les 100 meilleurs scores
app.get("/top-100", (req, res) => {
  db.all("SELECT * FROM scores ORDER BY score DESC LIMIT 100", (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des scores" });
    } else {
      res.json(rows); //Renvoie les 100 meilleurs scores
    }
  });
});

/* FIN SCORES */

/* FREQUENTATION */
app.get("/track-visit", (req, res) => {
  const currentDate = new Date().toISOString(); // Obtenir la date actuelle sous format ISO (UTC)

  // Enregistrer la visite dans la base de données
  db.run(
    `INSERT INTO frequentation (date_connexion) VALUES (?)`,
    [currentDate],
    (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Erreur lors de l'enregistrement de la visite" });
        console.error(err);
      } else {
        res.json({ message: "Visite enregistrée", date: currentDate });
      }
    }
  );
});

app.get("/visits", (req, res) => {
  db.all(
    "SELECT * FROM frequentation ORDER BY date_connexion DESC",
    (err, rows) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Erreur lors de la récupération des visites." });
      } else {
        res.json(rows); //renvoie les visites
      }
    }
  );
});

app.get("/visit-count", (req, res) => {
  db.all("SELECT COUNT(*) AS total FROM frequentation", (err, rows) => {
    if (err) {
      res.status(500).json({
        message: "Erreur lors de la récupération du comptage des visites.",
      });
    } else {
      res.json({ total_visits: rows[0].total }); //Renvoie le nombre total de visites
    }
  });
});

//Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le quiz !");
});

//Démarre le serveur
app.listen(PORT, () => {
  console.log(`serveur lancé sur le port ${PORT}`);
});
