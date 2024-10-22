const express = require("express");
const app = express();
const PORT = 3000;
const sqlite3 = require("sqlite3").verbose();

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

  //Vérifier si le score est dans le top 100
  db.all("SELECT * FROM scores ORDER BY score DESC LIMIT 100", (err, rows) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Erreur lors de la récupération des scores" });
      return;
    }

    //Si le tableau des scores a moins de 100 entrées ou si le score est supérieur au dernier score
    if (rows.length < 100 || score > rows[rows.length - 1].score) {
      //add nouveau score
      db.run(
        `INSERT INTO scores (pseudo, score) VALUES (?, ?)`,
        [pseudo, score],
        (err) => {
          if (err) {
            res
              .status(500)
              .json({ message: "Erreur lors de l'enregistrement du score" });
          } else {
            res.json({ message: "Score enregistré avec succès" });
          }
        }
      );
    } else {
      res.json({ message: "Score non suffisant pour entrer dans le top 100" });
    }
  });
});

/* FIN SCORES */

/* FREQUENTATION */
app.get("/track-visit", (req, res) => {
  const currentDate = new Date().toISOString();

  //Enregistrer la visite dans la bdd
  db.run(
    `INSERT INTO frequentation (date_connexion) VALUE (?)`,
    [currentDate],
    (err) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Erreur lors de l'enregistrement de la visite" });
      } else {
        res.json({ message: "Visite enregistrée" });
      }
    }
  );
});

//Middleware pour parser les requêtes JSON
app.use(express.json());

//Route par défaut
app.get("/", (req, res) => {
  res.send("Bienvenue sur le quiz !");
});

//Démarre le serveur
app.listen(PORT, () => {
  console.log(`serveur lancé sur le port ${PORT}`);
});
