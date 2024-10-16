let score = 0;
let currentQuestionIndex = 0;
let record = score;
let timer = 20000;
let firstClick = false; //levier permettant de démarrer le quiz
const questionTime = 20000; //temps en ms pour chaque question

const questionsListCapitales = [
  "Quelle est la capitale de la France ?",
  "Quelle est la capitale de l'Allemagne ?",
  "Quelle est la capitale de l'Italie ?",
  "Quelle est la capitale des Etats-Unis ?",
  "Quelle est la capitale de l'Angleterre ?",
];

const questionsList = [
  "En HTML, quelle est la balise utilisée pour écrire le titre principal ?",
  "En HTML, quelle est la balise utilisée pour faire une liste ? <em style='font-size : 0.7rem'>(et pour les plus pointilleux, oui il y en a plusieurs...)</em>",
  "Trouver l'intrus dans cette liste",
  "Quelle balise est utilisée pour les images ?",
  "Citez un attribut HTML lié aux images",
  "Que signifie HTML ? ",
  "Que signifie CSS  ? ",
  "En CSS, quelle propriété est utilisé pour gérer la scale d'un élément ? ",
  "Quelle propriété est utilisée pour changer la couleur de fond d'un élément ?",
  "Quelle est la fonction de la propriété z-index ?",
  "Quel est le rôle de la propriété display ?",
  "À quoi sert la propriété flex-direction dans un conteneur Flexbox ?",
  "Quelle propriété est utilisée pour changer la taille du texte ?",
  "Comment centrer un élément en Flexbox à la fois horizontalement et verticalement ?",
  "Quelle propriété est utilisée pour créer des coins arrondis ?",
  "Comment applique-t-on une ombre à un élément ?",
  "Quelle propriété contrôle la transparence d'un élément ?",
  "Quelle unité de mesure est relative à la taille de la police parente ?",
  "À quoi sert la propriété position: absolute; ?",
  "Quelle propriété CSS est utilisée pour créer des espaces à l'intérieur des bordures d'un élément ?",
];

const responsesCapitales = [
  ["Marseille", "Valenciennes", "Paris", "La Fistinière"],
  ["Munich", "Köln", "Berlin", "Le Chateau de Frankenstein"],
  ["Milan", "Rome", "Venise", "Le parc des monstres de Bomarzo"],
  ["Los Angeles", "New York", "Washington", "La Zone 51"],
  ["Londres", "Canterbury", "Manchester", "Cockermouth"],
];

const responses = [
  ["<title></title>", "<h1></h1>", "<p></p>", '<input type="title" />'],
  ["<list></list>", "<order></order>", "<ul></ul>", '<input type="list" />'],
  ["<ol></ol>", "<h5></h5>", "<th></th>", "<img></img>"],
  ["<picture />", "<pic />", "<img />", "<link img />"],
  ["class", "src", "href", "img"],
  [
    "Hyperlink Text Management Language",
    "HyperText Markup Language",
    "Hierarchical Tagging Markup Language",
    "How To Meet Ladies",
  ],
  [
    "Central Script System",
    "Code Structure Simplifier",
    "Cascading Style Sheets",
    "Crazy Spaghetti Syntax",
  ],
  ["modulate", "resize", "transform", "set-size"],
  ["background-color", "color", "font-color", "rainbow-painter"],
  [
    "Modifier la position des éléments sur l'axe Z (avant/arrière)",
    "Contrôler la transparence d'un élément",
    "Régler la largeur des éléments",
    "Changer l'altitude d'un élément dans le cloud",
  ],
  [
    "Ajuster l'espacement entre les éléments",
    "Définir le type d'affichage d'un élément (bloc, inline, etc.)",
    "Modifier la structure d'une balise",
    "Afficher une photo du Mont Saint-Michel",
  ],
  [
    "Définir la direction des éléments à l'intérieur du conteneur",
    "Modifier l'ordre de superposition des éléments",
    "Aligner les éléments sur un axe horizontal",
    "Permettre aux éléments de pouvoir faire le grand-écart",
  ],
  ["font-size", "text-size", "size", "make-it-bigger"],
  [
    "justify-content : center; align-items: center",
    "display: block; margin: 0 auto;",
    "text-align: center;",
    "Utiliser des prières et un peu de magie",
  ],
  ["border-style", "border-radius", "box-shadow", "arrondis-toi"],
  [
    "shadow",
    "text-shadow",
    "box-shadow",
    "dire 'ombre' et espérer que ça marche",
  ],
  ["visibility", "transparency", "opacity", "see-through-mode"],
  ["em", "px", "rem", "banana"],
  [
    "Placer l'élément par rapport à son conteneur le plus proche avec position: relative;",
    "Fixer l'élément en haut de la page",
    "Garder l'élément toujours visible en défilant",
    "Permettre à l'élément d'exister dans une autre dimension",
  ],
  ["border-spacing", "margin", "padding", "inner-bubble"],
];
const goodResponse = [
  "<h1></h1>",
  "<ul></ul>",
  "<img></img>",
  "<img />",
  "src",
  "HyperText Markup Language",
  "Cascading Style Sheets",
  "transform",
  "background-color",
  "Modifier la position des éléments sur l'axe Z (avant/arrière)",
  "Définir le type d'affichage d'un élément (bloc, inline, etc.)",
  "Définir la direction des éléments à l'intérieur du conteneur",
  "font-size",
  "justify-content : center; align-items: center",
  "border-radius",
  "box-shadow",
  "opacity",
  "rem",
  "Placer l'élément par rapport à son conteneur le plus proche avec position: relative;",
  "padding",
];

class Question {
  constructor(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }
}

class Questionnaire {
  constructor() {
    this.questions = [];
    this.currentQuestionIndex = 0; //car on aura notre currentQuestionIndex à 0 dés le début
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      return null;
    }
    return this.getCurrentQuestion();
  }

  questionsLeft() {
    return this.questions.length - this.currentQuestionIndex;
  }
}
//générer un questionnaire vide, et le remplir avant de charger la page
var questionnaireInfo = new Questionnaire();

const fillQuestionnaire = (questionList, answersList, correctAnswerList) => {
  var questionnaire = new Questionnaire();
  for (let i = 0; i < questionList.length; i++) {
    questionnaire.addQuestion(
      new Question(questionList[i], answersList[i], correctAnswerList[i])
    );
  }
  return questionnaire;
};

// Sélecteurs d'élément HTML
const card = document.querySelector(".card");
const scoreDisplay = document.querySelector(".score strong");
const recordDisplay = document.querySelector(".record");

//éléments modifiés dynamiquement à la fin du quiz
var questionsLeftContainer = document.querySelector(".questions-lefts");
var cardQuestion = document.querySelector(".card-question h3");
var responsesContainer = document.querySelector(".responses");
var hint = document.querySelector(".hint");
var timerContainer = document.querySelector(".timer");

//éléments qui seront créés plus tard
const retryButton = document.createElement("button");

//audio
var audio_error = new Audio("./assets/sounds/error.mp3");
var audio_correct = new Audio("./assets/sounds/correct.mp3");
const audio_applause_first = new Audio("./assets/sounds/applause_first.mp3");
const audio_applause_second = new Audio("./assets/sounds/applause_second.mp3");
const audio_applause_third = new Audio("./assets/sounds/applause_third.mp3");
const audio_applause = new Audio("./assets/sounds/applause.mp3");
var audio_petard = new Audio("./assets/sounds/petards.mp3");
audio_error.preload = "auto"; // Précharge le son pour réduire le délai
audio_correct.preload = "auto";

/* ----------------------------------------------------- FIN INIT ------------------------------------------------------------------*/

// Fonction pour changer la carte
const changeCard = () => {
  // Affiche la question actuelle
  cardQuestion.innerHTML = questionnaireInfo.getCurrentQuestion().questionText;

  //Affiche le nombre de questions restantes
  questionsLeftContainer.innerText =
    "Il reste " + questionnaireInfo.questionsLeft() + " questions.";

  // Réinitialise le conteneur des réponses
  responsesContainer.innerHTML = "";

  // Ajoute chaque réponse sous forme de div
  questionnaireInfo.getCurrentQuestion().answers.forEach((res) => {
    const responseDiv = document.createElement("div"); // Crée un élément <div>
    responseDiv.classList.add("response"); // Ajoute une classe pour pouvoir le styliser
    responseDiv.innerText = res; // Texte de la réponse
    responseDiv.addEventListener("click", () => checkAnswer(res)); // Ajoute un event listener pour vérifier la réponse
    responsesContainer.appendChild(responseDiv); // Ajoute la réponse au conteneur
  });
  //put the time on the timer
  timer = questionTime;
};

// Fonction pour vérifier la réponse et passer à la question suivante
const checkAnswer = (selectedAnswer) => {
  if (selectedAnswer === questionnaireInfo.getCurrentQuestion().correctAnswer) {
    score++; // Augmente le score si la réponse est correcte
    audio_correct.currentTime = 0;
    audio_correct.play();
    card.classList.remove("wrong");
    card.classList.remove("correct");
    void card.offsetWidth; // Force le reflow pour s'assurer que la suppression est prise en compte
    card.classList.add("correct");
  } else {
    //jouer le son error
    audio_error.currentTime = 0.12;
    audio_error.play();
    card.classList.remove("correct");
    card.classList.remove("wrong");
    void card.offsetWidth; // Force le reflow pour s'assurer que la suppression est prise en compte
    card.classList.add("wrong");
    hint.innerText =
      "La bonne réponse était : " +
      questionnaireInfo.getCurrentQuestion().correctAnswer;
  }

  // Met à jour l'affichage du score
  scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;

  // Passe à la question suivante
  questionnaireInfo.nextQuestion();

  // Vérifie s'il reste des questions, sinon termine le quiz
  if (
    questionnaireInfo.currentQuestionIndex < questionnaireInfo.questions.length
  ) {
    changeCard(); // Charge la prochaine question
  } else {
    endQuiz(); // Termine le quiz
  }
};

// Fonction pour terminer le quiz
const endQuiz = () => {
  const ratioScore = score / questionnaireInfo.questions.length;
  let appreciation = "";
  hint.innerText = "";
  if (ratioScore <= 0.4) {
    appreciation = "Il faut plus travailler ! Keep going, mate !";
  } else if (ratioScore < 0.7) {
    appreciation = "C'est moyen ! Tu peux faire bien mieux que ça !";
  } else if (ratioScore < 1) {
    appreciation = "Oh ! GG !";
  } else {
    appreciation = "UN DIEU EST LA !!";
  }
  if (record < score) {
    record = score;
    recordDisplay.innerText = "Record : " + record;
  }

  //animation fin quiz
  if (ratioScore >= 1);

  cardQuestion.innerText = "Quiz terminé !";
  responsesContainer.innerHTML = "";
  card.innerHTML = `<img class="imgFinal" style="animation : finish ${
    ratioScore * 3
  }s" src="./assets/img/${trophyImg(ratioScore)}" />
  <div class="final">Ton score final est de ${score} / ${
    questionnaireInfo.questions.length
  }</div>
    <br />
    <div class="appreciation">${appreciation}</div>`;
  finishQuizSound.currentTime = 1;
  finishQuizSound(ratioScore).play();
  createButtonRetry();
};

const trophyImg = (ratioS) => {
  if (ratioS >= 1) return "first.png";
  if (ratioS > 0.9) return "second.png";
  if (ratioS > 0.6) return "third.png";
  return "clap.webp";
};

const finishQuizSound = (ratioS) => {
  if (ratioS >= 1) return audio_applause_first;
  if (ratioS > 0.9) return audio_applause_second;
  if (ratioS > 0.6) return audio_applause_third;
  return audio_applause;
};

const createButtonRetry = () => {
  retryButton.classList.add("retry-button");
  retryButton.innerHTML = "Réessayer";
  card.appendChild(retryButton);
  questionsLeftContainer.innerText = "Quiz terminé.";

  //Permet de relancer le quiz
  retryButton.addEventListener("click", () => {
    //réinit les variables
    score = 0;
    questionnaireInfo.currentQuestionIndex = 0;
    timer = questionTime;

    card.removeChild(retryButton);
    questionnaireInfo.shuffleQuestions();
    initializeCard();
    changeCard();
    relaunchTimer();
  });
};

const initializeCard = () => {
  // Réinitialiser le contenu de la carte
  card.innerHTML = `
  <div class="card-question">
    <h3>Question</h3>
  </div>
  <div class="card-responses-container">
    <div class="responses">
      <div class="response 1"></div>
      <div class="response 2"></div>
      <div class="response 3"></div>
      <div class="response 4"></div>
    </div>
  </div>
  <div class="timer"></div>
  <div class="hint"></div>`;
  cardQuestion = document.querySelector(".card-question h3");
  responsesContainer = document.querySelector(".responses");
  hint = document.querySelector(".hint");
  timerContainer = document.querySelector(".timer");
  cardQuestion.innerText = ""; // Efface la question affichée
  responsesContainer.innerHTML = ""; // Efface les réponses affichées
  hint.innerText = ""; // Efface les hints éventuels (si nécessaire)
};

//timer entre chaque question
const relaunchTimer = () => {
  setTimeout(() => {
    if (timer <= 0) {
      //le joueur n'a pas répondu à temps, on fait comme si il avait répondu blanc
      checkAnswer("");
      if (
        questionnaireInfo.currentQuestionIndex >=
        questionnaireInfo.questions.length
      ) {
        //fin du quizt
        console.log("fin du quiz.");
      } else {
        // on est encore dans le quiz
        //le joueur n'a pas cliqué sur une réponse, on remet le timer à rebours et on le relance pour la prochaine question
        timer = questionTime;
        relaunchTimer();
      }
    } else {
      //tant que quiz encore en cours
      if (
        questionnaireInfo.currentQuestionIndex <
        questionnaireInfo.questions.length
      ) {
        //décrémente le compteur
        timer = timer - 50;
        displayTimer();
        relaunchTimer();
      } else {
        console.log("fin quiz");
      }
    }
  }, 50);
};

//Gère l'affichage du timer
const displayTimer = () => {
  timerContainer.style.width = (timer * 100) / questionTime + "%";
  if (timer > 12000) {
    timerContainer.style.background = "rgb(77, 77, 255)";
  } else if (timer < 12000 && timer > 5000) {
    timerContainer.style.background = "orange";
  } else if (timer < 5000) {
    timerContainer.style.background = "red";
  }
};

const startQuiz = () => {
  scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;
  recordDisplay.innerText = `Record : ${record}`;
  changeCard();
  relaunchTimer();
};

//animation

function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Fonction pour lancer les confettis à la fin du quiz
function loadConfettiScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"; // URL du CDN
  script.onload = function () {
    console.log("Canvas Confetti loaded");
    launchConfetti(); // Appelle ta fonction une fois le script chargé
  };
  document.head.appendChild(script); // Ajoute le script dans le document
}

// Fonction pour lancer les confettis après le chargement du script
function launchConfetti() {
  confetti({
    particleCount: 1000,
    spread: 200,
    origin: { y: 0.5 },
  });
}

// Appelle la fonction pour charger le script et lancer les confettis
loadConfettiScript();
//CHARGEMENT DE LA PAGE
//Mettre à jour le score

//rempli le questionnaire de questions
questionnaireInfo = fillQuestionnaire(questionsList, responses, goodResponse);
questionnaireInfo.shuffleQuestions();
console.log(questionnaireInfo.shuffleQuestions());

// Lance la première question quand la page est chargée
cardQuestion.innerHTML =
  "Démarrer le quiz <br /> <em style='font-size : 0.8rem'>Cliquez pour démarrer</em>";
document.addEventListener("click", () => {
  if (!firstClick) {
    firstClick = true;
    startQuiz();
  }
});
