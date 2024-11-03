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
  qlHTML2,
  ansHTML2,
  cAnsHTML2,
  qlCSS2,
  ansCSS2,
  cAnsCSS2,
  qlJS2,
  ansJS2,
  cAnsJS2,
  qlLinux2,
  ansLinux2,
  cAnsLinux2,
} from "./js/data.js";
import openSettings from "./js/settings.js";
import { selectedOptions } from "./js/settings.js";
import { top100Button } from "./js/top100.js"; //même si grisé, nécessaire pour pouvoir open le lb

let score = 0;
let record = score;
let timer = selectedOptions.questionTime; //Gére dynamiquement le displayed timer
let firstClick = false; //levier permettant de démarrer le quiz
let startConfetti = false;
let audioChronoPreviousState = null; //Variable pour garder l'état précédent du chrono audio
let questionTime = timer; //temps en ms pour chaque question
let numbQuestionPerTheme = selectedOptions.numbQuestionPerTheme;
// let musicToggle = false;
let themeIn;
let actualTheme;
let counterFunny = 0; //Permet de compter les réponses drôles cliquées

class Question {
  constructor(questionText, answers, correctAnswer) {
    this.questionText = questionText;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
  }

  shuffleAnswers() {
    // Extraire les trois premières réponses
    const firstThreeAnswers = this.answers.slice(0, 3);

    // Mélanger les trois premières réponses
    firstThreeAnswers.sort(() => Math.random() - 0.5);

    // Remettre les réponses mélangées dans le tableau original
    this.answers = [...firstThreeAnswers, this.answers[3]];
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
const music = document.getElementById("music");

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
const audio_startQuiz = new Audio("./assets/sounds/startQuiz.mp3");
const audio_laugh = new Audio("./assets/sounds/laughs.mp3");
const audio_circus = new Audio("./assets/sounds/circusMusic.mp3");
const audio_theme = new Audio("./assets/sounds/themeSound.mp3");
var audio_chrono = new Audio("./assets/sounds/chrono.mp3");
audio_chrono.preload = "auto";
audio_error.preload = "auto"; // Précharge le son pour réduire le délai
audio_correct.preload = "auto";
audio_laugh.preload = "auto";
audio_circus.preload = "auto";

/* ----------------------------------------------------- FIN INIT ------------------------------------------------------------------*/

// Fonction pour changer la carte
const changeCard = () => {
  // Affiche la question actuelle
  cardQuestion.innerText = questionnaireInfo.getCurrentQuestion().questionText;

  //Change le theme (s'il doit)
  themeIn.textContent = actualTheme;

  //Affiche le nombre de questions restantes
  questionsLeftContainer.innerText =
    "Il reste " + questionnaireInfo.questionsLeft() + " questions.";

  // Met à jour l'affichage du score
  scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;

  // Réinitialise le conteneur des réponses
  responsesContainer.innerHTML = "";

  // Ajoute chaque réponse sous forme de div
  questionnaireInfo.getCurrentQuestion().answers.forEach((res, index) => {
    const responseDiv = document.createElement("div"); // Crée un élément <div>
    responseDiv.classList.add("response"); // Ajoute une classe pour pouvoir le styliser
    responseDiv.innerText = res; // Texte de la réponse
    responseDiv.addEventListener("click", () => {
      checkFunnyAnswer(index); //checkfunny d'abord pour ensuite lancer endQuiz correctement
      checkAnswer(res, index); //index servira pour changer couleur si jamais
    });
    responsesContainer.appendChild(responseDiv); // Ajoute la réponse au conteneur
  });
  //put the time on the timer
  timer = questionTime;
  // console.log(responsesContainer.children); //PAUSE ICI
  // checkFunnyAnswer(responsesContainer.children.length -1); //Si l'user a cliqué sur la bonne div

  //launch sound
  audio_chrono.volume = 1;
  audio_chrono.play();
};

// Fonction pour vérifier la réponse et passer à la question suivante
const checkAnswer = (selectedAnswer, funnyOrNot) => {
  if (selectedAnswer === questionnaireInfo.getCurrentQuestion().correctAnswer) {
    score++; // Augmente le score si la réponse est correcte
    audio_correct.currentTime = 0;
    audio_correct.play();
    card.classList.remove("wrong");
    card.classList.remove("correct");
    card.classList.remove("oh-yeah");
    void card.offsetWidth; // Force le reflow pour s'assurer que la suppression est prise en compte
    card.classList.add("correct");
  } else {
    card.classList.remove("correct");
    card.classList.remove("wrong");
    card.classList.remove("oh-yeah");
    void card.offsetWidth; // Force le reflow pour s'assurer que la suppression est prise en compte
    if (funnyOrNot === 3 && counterFunny >= 2) {
      card.classList.add("oh-yeah");
    } else {
      //jouer le son error
      audio_error.currentTime = 0.12;
      audio_error.play();
      card.classList.add("wrong");
    }
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

const checkFunnyAnswer = (isFunnyDivSelected) => {
  if (isFunnyDivSelected === 3) {
    counterFunny++;
    ohYeahSound();
  }
};

const ohYeahSound = () => {
  let timer_end_sound = 0;
  const audio_oh_yeah = new Audio("./assets/sounds/ohYeah.mp3");
  const rngIndex = Math.ceil(Math.random() * 14);
  switch (rngIndex) {
    case 1:
      audio_oh_yeah.currentTime = 0;
      timer_end_sound = 3500;
      break;
    case 2:
      audio_oh_yeah.currentTime = 3.5;
      timer_end_sound = 2000;
      break;
    case 3:
      audio_oh_yeah.currentTime = 7.5;
      timer_end_sound = 1500;
      break;
    case 4:
      audio_oh_yeah.currentTime = 9;
      timer_end_sound = 2500;
      break;
    case 5:
      audio_oh_yeah.currentTime = 11.5;
      timer_end_sound = 1000;
      break;
    case 6:
      audio_oh_yeah.currentTime = 12.5;
      timer_end_sound = 1000;
      break;
    case 7:
      audio_oh_yeah.currentTime = 13.5;
      timer_end_sound = 1000;
      break;
    case 8:
      audio_oh_yeah.currentTime = 14.5;
      timer_end_sound = 1300;
      break;
    case 9:
      audio_oh_yeah.currentTime = 15.8;
      timer_end_sound = 800;
      break;
    case 10:
      audio_oh_yeah.currentTime = 16.6;
      timer_end_sound = 1200;
      break;
    case 11:
      audio_oh_yeah.currentTime = 17.8;
      timer_end_sound = 1500;
      break;
    case 12:
      audio_oh_yeah.currentTime = 19.3;
      timer_end_sound = 1000;
      break;
    case 13:
      audio_oh_yeah.currentTime = 20.5;
      timer_end_sound = 1400;
      break;
    case 14:
      audio_oh_yeah.currentTime = 21.9;
      timer_end_sound = 1400;
      break;
    default:
      break;
  }
  if (timer_end_sound != 0) {
    audio_oh_yeah.play();
    setTimeout(() => {
      audio_oh_yeah.pause();
    }, timer_end_sound);
  }
};

// Fonction pour terminer le quiz
const endQuiz = () => {
  let ratioScore = score / questionnaireInfo.questions.length;
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

  //Si user n'a cliqué que sur les réponses drôles :
  const totalQuestions =
    numbQuestionPerTheme * selectedOptions.themesSelected.length;
  //Si user n'a pas cliqué sur assez de réponses funny :
  if (counterFunny > 1 && counterFunny < totalQuestions)
    appreciation += `<br /> <em style="font-size:0.7rem">(Clique sur plus de réponses fun la prochaine fois)</em>`;
  if (counterFunny >= totalQuestions * 0.8) {
    appreciation = `<div class="funny-text">TU ES VRAIMENT HILARANT !!</div>`;
    ratioScore = -1; //Pour calculer le mode hilarant
    audio_laugh.currentTime = 0;
    audio_laugh.volume = 0.65;
    audio_laugh.play();
  }
  //animation fin quiz
  if (ratioScore >= 1) {
    startConfetti = true;
    confettiLoop();
  }
  //Display
  counterFunny >= totalQuestions * 0.8
    ? displayFunnyTheme()
    : createSubmitScoreForm();
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
  finishQuizSound(ratioScore).currentTime = 0;
  finishQuizSound(ratioScore).volume = 0.4;
  finishQuizSound(ratioScore).play();
  //Pour un son un peu plus crescendo
  crescendoSound(finishQuizSound(ratioScore));
  createButtonRetry();
};

const crescendoSound = (sound) => {
  if (sound.volume < 0.8) {
    console.log("volume de la zic :", sound.volume);

    setTimeout(() => {
      sound.volume += 0.01;
      crescendoSound(sound);
    }, 100);
  }
};

const trophyImg = (ratioS) => {
  if (ratioS >= 1) return "first.png";
  if (ratioS >= 0.9) return "second.png";
  if (ratioS >= 0.6) return "third.png";
  if (ratioS == -1) return "laugh.gif";
  return "clap.webp";
};

const finishQuizSound = (ratioS) => {
  if (ratioS >= 1) return audio_applause_first;
  if (ratioS >= 0.9) return audio_applause_second;
  if (ratioS >= 0.6) return audio_applause_third;
  if (ratioS == -1) return audio_circus;
  return audio_applause;
};

const displayFunnyTheme = () => {
  const positions = [
    { top: "15%", right: "10%" },
    { top: "70%", right: "10%" },
    { top: "20%", right: "80%" },
    { top: "40%", right: "45%" },
    { top: "70%", right: "80%" },
  ];

  for (let i = 1; i <= 5; i++) {
    const gif = document.createElement("img");
    gif.src = `./assets/gifs/funnyTheme${i}.gif`;
    gif.classList.add("gif");
    if (i == 4) gif.style.animation = "gifDance 10s infinite";
    else gif.style.animation = `gifClassic ${i + 2}s infinite alternate`;

    // Applique les positions définies dans l'array `positions`
    gif.style.top = positions[i - 1].top;
    gif.style.right = positions[i - 1].right;

    document.body.appendChild(gif);
  }
  //changer l'animation de la carte
  card.style.animation = "funnyCard 2s infinite alternate";
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

    retryButton.remove();
    window.location.reload();
    // changeCard();
    // initializeCard();
    // changeCard();
    // relaunchTimer();
  });
};

const initializeCard = () => {
  // Réinitialiser le contenu de la carte
  card.innerHTML = `
  <div class="theme-in"></div>
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
  themeIn = document.querySelector(".theme-in");
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
  startQuizAnimation().then(() => {
    scoreDisplay.innerText = `Score actuel : ${score} / ${questionnaireInfo.questions.length}`;
    recordDisplay.innerText = `Record : ${record}`;
    displayChangeTheme().then(() => {
      initializeCard();
      changeCard(); // Charge la prochaine question après l'affichage du thème
    });
    relaunchTimer();
  });
};

const startQuizAnimation = async () => {
  audio_startQuiz.currentTime = 0;
  audio_startQuiz.play();
  //Ajouter le flou
  blurBackground.style.display = "block";
  //Ajouter le texte
  const glText = document.createElement("div");
  glText.classList.add("good-luck");
  glText.textContent = "";
  //lancer les confettis
  setTimeout(() => {
    launchConfettiStart(0.3, 120);
    audioRocketPlay();
    //Ajouter un décalage pour donner un effet plus naturel
    setTimeout(() => {
      audioRocketPlay();
      launchConfettiStart(0.7, 60);
    }, 50);
  }, 1800);
  //Gérer le texte "bonne chance !""
  const text = "Bonne chance !";
  for (let i = 0; i < text.length; i++) {
    const glLetter = document.createElement("div");
    glLetter.classList.add("gl-letter");
    glLetter.style.animationDelay = `${i / 10}s`;
    //ajouter barre d'espace
    text[i] === " "
      ? (glLetter.innerHTML = "&nbsp")
      : (glLetter.textContent = text[i]);

    glText.appendChild(glLetter);
  }

  blurBackground.appendChild(glText);

  await new Promise((resolve) => {
    setTimeout(() => {
      blurBackground.style.display = "none";
      glText.remove();
      resolve();
    }, 3500);
  });
};

const audioRocketPlay = () => {
  const audio_rocket = new Audio("./assets/sounds/rocketStart.mp3");
  audio_rocket.play();
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

function launchConfettiStart(xValue, angleValue) {
  confetti({
    particleCount: 200,
    spread: 70,
    shapes: ["square"],
    origin: {
      x: xValue,
      y: 0.6,
    },
    angle: angleValue,
  });
}

//Bouton Settings
settingsBtn.addEventListener("click", () => {
  openSettings();
});

//jouer son blop quand survole une réponse

/*
responsesContainer.addEventListener("mouseenter", () => {
  const children = responsesContainer.children;
  let count_sound = 0; //Compteur pour que le son ne se joue qu'une seule fois
  Array.from(children).forEach((child) => {
    count_sound++;
    //Une fois que le compteur est à 4, on joue le son
    if (count_sound === 4) {
      const audio_blop = new Audio("./assets/sounds/blop-ans.mp3");
      audio_blop.currentTime = 0.2;
      audio_blop.play();
      setTimeout(() => {
        audio_blop.pause();
        audio_blop.remove();
      }, 600);
    }
  });
});
*/

music.addEventListener("click", () => {
  musicToggle = !musicToggle;
  console.log(music.muted);

  musicToggle ? music.play() : (music.muted = true);
});

const displayChangeTheme = async () => {
  //Repérer quel est le thème suivant
  const questionIndex = questionnaireInfo.currentQuestionIndex;
  const themes = selectedOptions.themesSelected;
  const qpr = numbQuestionPerTheme;
  const indexActualTheme = Math.floor(questionIndex / qpr); //Formule permettant de trouver l'index du theme
  actualTheme = themes[indexActualTheme];
  timer = questionTime; //Car le joueur peut perdre un point s'il répond trop tard avant le changement de thème

  //AFFICHAGE
  blurBackground.style.display = "block";
  blurBackground.style.animation = "fadeInOut 3s forwards";
  const changingThemeCard = document.createElement("div");
  changingThemeCard.innerText = "Nouveau thème : " + actualTheme;

  // Ajouter la carte dans le DOM
  blurBackground.appendChild(changingThemeCard);
  changingThemeCard.classList.add("changing-theme-card");

  //Jouer le son changement de thème
  audio_theme.currentTime = 0;
  audio_theme.playbackRate = 2.5;
  audio_theme.volume = 0.6;
  audio_theme.play();

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
        case "HTML2":
          questionnaireInfo.fillQuestionnaire(
            qlHTML2,
            ansHTML2,
            cAnsHTML2,
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
        case "CSS2":
          questionnaireInfo.fillQuestionnaire(
            qlCSS2,
            ansCSS2,
            cAnsCSS2,
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
        case "JS2":
          questionnaireInfo.fillQuestionnaire(
            qlJS2,
            ansJS2,
            cAnsJS2,
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
        case "LINUX2":
          questionnaireInfo.fillQuestionnaire(
            qlLinux2,
            ansLinux2,
            cAnsLinux2,
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

/* CORRESPONDANCE BACK ET FRONT */

import {
  getTop100Scores,
  submitScore,
  getTotalVisits,
  trackVisit,
} from "./app.js";

//Lorsque la page se charge, va chercher directement le top 100 et l'affiche dans le bouton top 100
// + Affiche le nombre total de visites
document.addEventListener("DOMContentLoaded", async () => {
  //Tracker la visite
  await trackVisit();
  //Afficher nombre de visites
  const visites = document.querySelector(".visites");
  const nbVisites = await getTotalVisits();
  if (nbVisites && nbVisites.total_visits !== undefined) {
    visites.textContent = `Ce quiz a déjà été joué plus de ${nbVisites.total_visits} fois.`;
  } else {
    visites.textContent = "Nombre total de visites non récupéré.";
  }

  //Partie Leaderboard
  try {
    const topScores = await getTop100Scores();

    const scoreList = document.querySelector(".leaderboard-container");
    scoreList.innerHTML = ""; // Nettoyer la liste

    topScores.forEach((score, index) => {
      const player = document.createElement("div");
      const indexPlayer = document.createElement("div");
      const namePlayer = document.createElement("div");
      const scorePlayer = document.createElement("div");
      player.classList.add("top100-li");
      indexPlayer.classList.add("top100-index");
      namePlayer.classList.add("top100-name");
      scorePlayer.classList.add("top100-score");
      indexPlayer.textContent = `${index + 1}`;
      namePlayer.textContent = `${score.pseudo}`;
      scorePlayer.textContent = `${score.score}`;
      player.appendChild(indexPlayer);
      player.appendChild(namePlayer);
      player.appendChild(scorePlayer);
      scoreList.appendChild(player);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage des scores", error);
  }
});

//test

//Fonction pour créer le formulaire de submit pseudo en cas de challenge
export default function createSubmitScoreForm() {
  //Créer le formContainer
  const formContainer = document.createElement("div");
  formContainer.classList.add("submit-score-container");
  blurBackground.style.display = "block";

  //texte pour le joueur
  const sscText = document.createElement("div");
  sscText.classList.add("ssc-title");
  sscText.innerHTML = `Veuillez entrer votre pseudo <br /> <em style="font-size:0.9rem">(12 caractères max)</em>`;
  formContainer.appendChild(sscText);

  //input entrer le pseudo
  const sscInput = document.createElement("input");
  sscInput.type = "text";
  sscInput.maxLength = 12;
  formContainer.appendChild(sscInput);

  //button submit
  const sscSubmit = document.createElement("input");
  sscSubmit.type = "submit";
  formContainer.appendChild(sscSubmit);

  //button cancel (si joueur ne veut pas enregistrer son score)
  const cancelBtn = document.createElement("div");
  cancelBtn.classList.add("cancel-cross");
  cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>`;
  formContainer.appendChild(cancelBtn);

  //faire apparaître le formContainer, une fois celui-ci prêt
  document.body.appendChild(formContainer);

  //ajouter l'écouteur d'event pour cancel
  cancelBtn.addEventListener("click", () => {
    const confirm = window.confirm(
      "Cette action est irréversible, souhaitez-vous continuer ?"
    );
    if (confirm) {
      formContainer.remove();
      blurBackground.style.display = "none";
    }
  });

  //écouteur d'event pour submit
  sscSubmit.addEventListener("click", () => {
    const pseudo = sscInput.value;
    //Il faudra configurer les types de pseudo pas accepté (comme des espaces, des pseudo vides, etc)
    if (pseudo) {
      submitScore(pseudo, score);
      formContainer.remove();
      blurBackground.style.display = "none";
    } else {
      window.alert("Veuillez entrer un pseudo valide.");
    }
  });
}

//fonction qui update le leaderboard (utile lorsque l'user entre son pseudo)
export const updateLeaderboard = () => {
  getTop100Scores().then((scores) => {
    const scoreList = document.querySelector(".leaderboard-container");
    scoreList.innerHTML = "";

    scores.forEach((score, index) => {
      const player = document.createElement("div");
      const indexPlayer = document.createElement("div");
      const namePlayer = document.createElement("div");
      const scorePlayer = document.createElement("div");
      player.classList.add("top100-li");
      indexPlayer.classList.add("top100-index");
      namePlayer.classList.add("top100-name");
      scorePlayer.classList.add("top100-score");
      indexPlayer.textContent = `${index + 1}`;
      namePlayer.textContent = `${score.pseudo}`;
      scorePlayer.textContent = `${score.score}`;
      player.appendChild(indexPlayer);
      player.appendChild(namePlayer);
      player.appendChild(scorePlayer);
      scoreList.appendChild(player);
    });
  });
};
