import {
  cAnsLinux,
  ansLinux,
  qlLinux,
  qlHTML,
  ansHTML,
  cAnsHTML,
  qlCSS,
  ansCSS,
  cAnsCSS,
  qlGit,
  ansGit,
  cAnsGit,
  qlMD,
  ansMD,
  cAnsMD,
  qlJS,
  ansJS,
  cAnsJS,
} from "./js/data.js";
import openSettings from "./js/settings.js";
import { selectedOptions } from "./js/settings.js";
import { top100Button } from "./js/top100.js";

let score = 0;
let record = score;
let timer = selectedOptions.questionTime; //Gére dynamiquement le displayed timer
let firstClick = false; //levier permettant de démarrer le quiz
let startConfetti = false;
let audioChronoPreviousState = null; //Variable pour garder l'état précédent du chrono audio
let questionTime = timer; //temps en ms pour chaque question
let numbQuestionPerTheme = selectedOptions.numbQuestionPerTheme;

class Question {
  constructor(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  shuffleAnswers() {
    console.log(this.answers);

    this.answers.sort(() => Math.random() - 0.5);
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

  //Fonction pour mixer tout les thèmes
  shuffleAllQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
    this.questions.forEach((question) => question.shuffleAnswers());
  }

  shuffleQuestionsByTheme() {
    const numberOfThemes = selectedOptions.themesSelected.length;
    const questionsPerTheme = numbQuestionPerTheme;

    for (let i = 0; i < numberOfThemes; i++) {
      // Définir les bornes de chaque plage
      const start = i * questionsPerTheme; // Index de début de la plage
      const end = start + parseInt(questionsPerTheme); // Index de fin de la plage (non inclus)

      // Extraire les questions de la plage et les mélanger
      const questionsRange = this.questions.slice(start, end);
      questionsRange.sort(() => Math.random() - 0.5);

      // Réinjecter les questions mélangées dans la position originale
      for (let j = 0; j < questionsRange.length; j++) {
        this.questions[start + j] = questionsRange[j];
        this.questions[start + j].shuffleAnswers();
      }
    }
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

  fillQuestionnaire(
    questionList,
    answersList,
    correctAnswerList,
    numberQuestions
  ) {
    // Création d'une liste d'indices allant de 0 à la taille du tableau de questions
    const indices = [...Array(questionList.length).keys()];

    // Mélange aléatoire des indices avec la méthode Fisher-Yates
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Sélection des questions aléatoires selon le nombre demandé
    for (let i = 0; i < numberQuestions; i++) {
      const randomIndex = indices[i];

      console.log(
        "Question ajoutée n°",
        this.questions.length,
        ": ",
        questionList[randomIndex]
      );

      this.addQuestion(
        new Question(
          questionList[randomIndex],
          answersList[randomIndex],
          correctAnswerList[randomIndex]
        )
      );
    }
  }
}

// Sélecteurs d'élément HTML
const card = document.querySelector(".card");
const scoreDisplay = document.querySelector(".score strong");
const recordDisplay = document.querySelector(".record");
const settingsBtn = document.querySelector(".settings-btn");
const blurBackground = document.querySelector(".blur-background");

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

  // Met à jour l'affichage du score
  scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;

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

  //launch sound
  audio_chrono.volume = 1;
  audio_chrono.play();
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

  // Passe à la question suivante
  questionnaireInfo.nextQuestion();

  // Vérifie s'il reste des questions, sinon termine le quiz
  if (
    questionnaireInfo.currentQuestionIndex < questionnaireInfo.questions.length
  ) {
    //si on arrive au thème suivant
    if (questionnaireInfo.currentQuestionIndex % numbQuestionPerTheme === 0) {
      //avant de faire changeCard, on affiche le nouveau thème
      displayChangeTheme().then(() => {
        changeCard(); // Charge la prochaine question après l'affichage du thème
      });
    } else {
      changeCard(); // Charge la prochaine question
    }
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
    appreciation = "Joli !!!";
  } else {
    appreciation = "TU ES UN DIEU DE L'INFORMATIQUE !!";
  }
  if (record < score) {
    record = score;
    recordDisplay.innerText = "Record : " + record;
  }

  //animation fin quiz
  if (ratioScore >= 1) {
    startConfetti = true;
    confettiLoop();
  }
  //Display
  scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;
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
  audio_chrono.pause();
  finishQuizSound.currentTime = 1;
  finishQuizSound(ratioScore).play();
  createButtonRetry();
};

const trophyImg = (ratioS) => {
  if (ratioS >= 1) return "first.png";
  if (ratioS >= 0.9) return "second.png";
  if (ratioS >= 0.6) return "third.png";
  return "clap.webp";
};

const finishQuizSound = (ratioS) => {
  if (ratioS >= 1) return audio_applause_first;
  if (ratioS >= 0.9) return audio_applause_second;
  if (ratioS >= 0.6) return audio_applause_third;
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
    startConfetti = false;
    score = 0;
    questionnaireInfo.currentQuestionIndex = 0;
    timer = questionTime;

    card.removeChild(retryButton);
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
        handleChronoSound(); //gère le son du chronomètre
      } else {
        console.log("fin quiz");
      }
    }
    // console.log("timer : ", timer);
  }, 40);
};

//Gère l'affichage du timer & du son chrono
const displayTimer = () => {
  timerContainer.style.width = (timer * 100) / questionTime + "%";
  if (timer > 0.6 * questionTime) {
    timerContainer.style.background = "rgb(77, 77, 255)";
  } else if (timer > 0.25 * questionTime) {
    timerContainer.style.background = "yellow";
  } else {
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
  let currentState;
  if (timer > 0.6 * questionTime) {
    currentState = "normal";
    audio_chrono.playbackRate = 1;
  } else if (timer > 0.25 * questionTime) {
    currentState = "fast";
    audio_chrono.playbackRate = 2;
  } else {
    currentState = "veryfast";
    audio_chrono.playbackRate = 4;
  }

  //Check if state changed, and then, reput sound time to 0
  if (audioChronoPreviousState !== currentState) {
    audio_chrono.currentTime = 0;
  }

  //Update last state
  audioChronoPreviousState = currentState;
};

/* ------ PARTIE ANIMATION DE FIN --------- */
// Fonction pour lancer les confettis à la fin du quiz
function loadConfettiScript() {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"; // URL du CDN
  script.onload = function () {};
  document.head.appendChild(script); // Ajoute le script dans le document
}

// Fonction pour lancer les confettis après le chargement du script
function launchConfetti() {
  let rngParticleCount = Math.random() * 200 + 200; //Entre 700 et 1200 confettis
  confetti({
    particleCount: rngParticleCount,
    spread: 360,
    shapes: ["square", "circle"], // Utilisation de formes circulaires
    gravity: 0.2,
    origin: {
      x: Math.random(), // Position aléatoire sur l'axe horizontal
      y: Math.random() * 0.5 + 0.5, // Position aléatoire entre 50% et 100% de l'écran
    },
    scalar: Math.random() * 0.4 + 0.8,
    angle: Math.random() * 60 + 60,
  });
}

const confettiLoop = () => {
  if (startConfetti) {
    //tant que l'user n'a pas cliqué sur restartQuiz
    let rngTimer = Math.random() * 500 + 200; // entre 200 et 700ms
    const bang_sound = new Audio("./assets/sounds/bang.mp3");
    setTimeout(() => {
      launchConfetti();
      confettiLoop();
      bang_sound.currentTime = 0;
      bang_sound.play();
    }, rngTimer);
  }
};

//Bouton Settings
settingsBtn.addEventListener("click", () => {
  openSettings();
});

const displayChangeTheme = async () => {
  //Repérer quel est le thème suivant
  const questionIndex = questionnaireInfo.currentQuestionIndex;
  const themes = selectedOptions.themesSelected;
  const qpr = numbQuestionPerTheme;
  const indexActualTheme = Math.floor(questionIndex / qpr); //Formule permettant de trouver l'index du theme
  const actualTheme = themes[indexActualTheme];
  console.log("nouveau thème : ", actualTheme);
  timer = questionTime; //Car le joueur peut perdre un point s'il répond trop tard avant le changement de thème

  //AFFICHAGE
  blurBackground.style.display = "block";
  blurBackground.style.animation = "fadeInOut 3s forwards";
  const changingThemeCard = document.createElement("div");
  changingThemeCard.innerText = "Nouveau thème : " + actualTheme;

  // Ajouter la carte dans le DOM
  blurBackground.appendChild(changingThemeCard);
  changingThemeCard.classList.add("changing-theme-card");

  // Attendre avant de changer le texte de la carte
  await new Promise((resolve) => {
    setTimeout(() => {
      // Retirer la carte et désactiver le flou après 3 secondes
      blurBackground.style.display = "none";
      blurBackground.style.removeProperty("animation");
      changingThemeCard.remove(); // Supprime la carte après l'affichage
      resolve();
    }, 2500);
  });
};

//générer un questionnaire vide, et le remplir avant de charger la page
let questionnaireInfo = new Questionnaire();

//CHARGEMENT DE LA PAGE
// Appelle la fonction pour charger le script des confettis
loadConfettiScript();

cardQuestion.innerHTML =
  "Paramétrez le quiz ou <br><em style='font-size : 2rem'>Cliquez sur une case pour le démarrer</em>";
responsesContainer.addEventListener("click", () => {
  if (!firstClick) {
    //enlever le button settings
    settingsBtn.style.display = "none";

    /* --- remplir le quiz des settings attribuées ---*/
    questionTime = selectedOptions.questionTime;
    timer = questionTime;
    numbQuestionPerTheme = selectedOptions.numbQuestionPerTheme;

    //Remplir le quiz des themes sélectionnés
    selectedOptions.themesSelected.forEach((questionnaire) => {
      switch (questionnaire) {
        case "HTML":
          questionnaireInfo.fillQuestionnaire(
            qlHTML,
            ansHTML,
            cAnsHTML,
            numbQuestionPerTheme
          );
          break;
        case "CSS":
          questionnaireInfo.fillQuestionnaire(
            qlCSS,
            ansCSS,
            cAnsCSS,
            numbQuestionPerTheme
          );
          break;
        case "JS":
          questionnaireInfo.fillQuestionnaire(
            qlJS,
            ansJS,
            cAnsJS,
            numbQuestionPerTheme
          );
          break;
        case "MD":
          questionnaireInfo.fillQuestionnaire(
            qlMD,
            ansMD,
            cAnsMD,
            numbQuestionPerTheme
          );
          break;
        case "GIT":
          questionnaireInfo.fillQuestionnaire(
            qlGit,
            ansGit,
            cAnsGit,
            numbQuestionPerTheme
          );
          break;
        case "LINUX":
          questionnaireInfo.fillQuestionnaire(
            qlLinux,
            ansLinux,
            cAnsLinux,
            numbQuestionPerTheme
          );
          break;
        default:
          break;
      }
      console.log(
        "etape de filling : ",
        questionnaire,
        ", questionnaire actuel :",
        questionnaireInfo
      );
    });
    // console.log("quiz filled :", questionnaireInfo);
    questionnaireInfo.shuffleQuestionsByTheme();
    // console.log("shuffling par theme : ", questionnaireInfo);

    firstClick = true;
    startQuiz();
  }
});

/* FEATURE */
// index.js

// Importer la fonction getTop100Scores depuis app.js
import { getTop100Scores } from "./app.js";

// Exemple d'utilisation pour afficher les scores dans l'interface du quiz
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const topScores = await getTop100Scores();

    const scoreList = document.querySelector(".leaderboard");
    scoreList.innerHTML = ""; // Nettoyer la liste
    console.log(topScores);

    topScores.forEach((score, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${score.pseudo}: ${score.score}`;
      scoreList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage des scores", error);
  }
});
