import { questionsList, responses, goodResponse } from "./data.js";
let score = 0;
let currentQuestionIndex = 0;
let record = score;
let timer = 20000;
let firstClick = false; //levier permettant de démarrer le quiz
const questionTime = 20000; //temps en ms pour chaque question

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
var audio_petard = new Audio("./assets/sounds/bang.mp3");
var audio_firecrackers = new Audio("./assets/sounds/firecrackers_third.mp3");
var audio_chrono = new Audio("./assets/sounds/chrono.mp3");
audio_chrono.preload = "auto";
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

//Gère l'affichage du timer & du son chrono
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

const handleChronoSound = () => {
  if (timer > 12000) {
    audio_chrono.play();
  } else if (timer > 5000) {
    audio_chrono.currentTime = 0;
    // audio_chrono.pitch = 1.1;
    audio_chrono.play();
  }
};

/* ------ PARTIE ANIMATION DE FIN --------- */
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

/* -------animation tests -------------- */

// Appelle la fonction pour charger le script et lancer les confettis
loadConfettiScript();

/* -------animation tests -------------- */

//CHARGEMENT DE LA PAGE
//Mettre à jour le score
//rempli le questionnaire de questions
questionnaireInfo = fillQuestionnaire(questionsList, responses, goodResponse);
questionnaireInfo.shuffleQuestions();

// Lance la première question quand la page est chargée
cardQuestion.innerHTML =
  "Démarrer le quiz <br /> <em style='font-size : 0.8rem'>Cliquez pour démarrer</em>";
document.addEventListener("click", () => {
  if (!firstClick) {
    firstClick = true;
    startQuiz();

    audio_chrono.play();
    audio_chrono.currentTime = 0;
    audio_chrono.playbackRate = 1;
  }
});
