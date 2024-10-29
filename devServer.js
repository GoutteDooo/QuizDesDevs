const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 5501;

// Servir les fichiers du front-end (HTML, CSS, JS) depuis le dossier public
app.use(express.static(path.join(__dirname, "/public")));

// Configurer un proxy pour rediriger les requêtes vers le back-end sur localhost:3000
app.use(
  "/top-100",
  createProxyMiddleware({
    target: "http://localhost:3000/top-100",
    changeOrigin: true,
  })
);
app.use(
  "/submit-score",
  createProxyMiddleware({
    target: "http://localhost:3000/submit-score",
    changeOrigin: true,
  })
);

app.use(
  "/visit-count",
  createProxyMiddleware({
    target: "http://localhost:3000/visit-count",
    changeOrigin: true,
  })
);

app.use(
  "/track-visit",
  createProxyMiddleware({
    target: "http://localhost:3000/track-visit",
    changeOrigin: true,
  })
);

// Lancer le serveur front-end avec le proxy
app.listen(PORT, () => {
  console.log(
    `Serveur de développement front-end lancé sur http://localhost:${PORT}`
  );
});
