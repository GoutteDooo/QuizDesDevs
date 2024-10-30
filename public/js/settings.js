//variables settings avec valeur par défaut
let questionTime = 20000;
let numbQuestionPerTheme = 5;
let themesSelected = ["HTML", "CSS", "JS", "MD", "GIT", "LINUX"];
let selectedOptions = {
  questionTime,
  numbQuestionPerTheme,
  themesSelected,
};

/* Sélecteurs d'input */
//range
const settingsTime = document.getElementById("settings-time");
const settingsQpt = document.getElementById("settings-qpt");
const settingsTimeValue = document.getElementById("settings-time-value");
settingsTimeValue.value = questionTime / 1000; //Afficher la valeur en secondes
const settingsQptValue = document.getElementById("settings-qpt-value");
settingsQptValue.value = numbQuestionPerTheme;
//checkboxes
const allThemes = document.getElementById("theme-all");
allThemes.checked = false;
const htmlTheme = document.getElementById("theme-html");
htmlTheme.checked = true;
const cssTheme = document.getElementById("theme-css");
cssTheme.checked = true;
const jsTheme = document.getElementById("theme-js");
jsTheme.checked = true;
const mdTheme = document.getElementById("theme-md");
mdTheme.checked = true;
const gitTheme = document.getElementById("theme-git");
gitTheme.checked = true;
const linuxTheme = document.getElementById("theme-linux");
linuxTheme.checked = true;
const html2Theme = document.getElementById("theme-html2");
html2Theme.checked = false;
const css2Theme = document.getElementById("theme-css2");
css2Theme.checked = false;
const js2Theme = document.getElementById("theme-js2");
js2Theme.checked = false;
const linux2Theme = document.getElementById("theme-linux2");
linux2Theme.checked = false;

//button
const buttonValidate = document.getElementById("settings-validate");

//Main page
let settings = document.querySelector(".settings");
let blur = document.querySelector(".blur-background");
const settingsBtn = document.querySelector(".settings-btn");

//sfx
const audio_cric = new Audio("./assets/sounds/cric.mp3");
const audio_whoosh = new Audio("./assets/sounds/settings-appear.mp3");
const audio_validate = new Audio("./assets/sounds/settings-ok.mp3");

//Lorsque l'user hover les settings, déclenche le petit cric
settingsBtn.addEventListener("mouseover", () => {
  audio_cric.currentTime = 0.2;
  audio_cric.volume = 0.5;
  audio_cric.play();
  setTimeout(() => {
    audio_cric.pause();
  }, 200);
});

//Quand l'user a cliqué sur la roue crantée au début du quiz, ouvre les settings
const openSettings = () => {
  audio_whoosh.currentTime = 0;
  audio_whoosh.volume = 1;
  audio_whoosh.playbackRate = 1;
  audio_whoosh.play();
  settings.style.display = "block";
  settings.style.animation = "active 0.4s forwards";
  blur.style.display = "block";
};

//Lorsque l'user clique sur le bouton "valider"
const saveSettings = () => {
  audio_validate.currentTime = 0;
  audio_validate.volume = 0.7;
  audio_validate.playbackRate = 5;
  audio_validate.play();
  settings.style.animation = "valid 0.2s forwards";
  setTimeout(() => {
    settings.style.display = "none";
    blur.style.display = "none";
  }, 200);
};

/* ------ GERE LES INPUTS ------- */
settingsTime.addEventListener("input", (e) => {
  //affichage dynamique
  settingsTimeValue.value = e.target.value;
  //affecter la valeur dans la variable option
  questionTime = e.target.value * 1000;
});

settingsQpt.addEventListener("input", (e) => {
  //affichage dynamique
  settingsQptValue.value = e.target.value;
  //affecter la valeur dans la variable option
  numbQuestionPerTheme = e.target.value;
});

//lorsque all est coché, coche automatiquement tout les themes  (ou les décoche)
allThemes.addEventListener("input", (e) => {
  htmlTheme.checked = e.target.checked;
  cssTheme.checked = e.target.checked;
  jsTheme.checked = e.target.checked;
  mdTheme.checked = e.target.checked;
  gitTheme.checked = e.target.checked;
  linuxTheme.checked = e.target.checked;
  html2Theme.checked = e.target.checked;
  css2Theme.checked = e.target.checked;
  js2Theme.checked = e.target.checked;
  linux2Theme.checked = e.target.checked;
  fillThemesArray(e.target.checked);
});

htmlTheme.addEventListener("input", (e) => {
  htmlTheme.checked
    ? themesSelected.push("HTML")
    : (themesSelected = themesSelected.filter((ele) => ele !== "HTML"));
});

cssTheme.addEventListener("input", (e) => {
  cssTheme.checked
    ? themesSelected.push("CSS")
    : (themesSelected = themesSelected.filter((ele) => ele !== "CSS"));
});

jsTheme.addEventListener("input", (e) => {
  jsTheme.checked
    ? themesSelected.push("JS")
    : (themesSelected = themesSelected.filter((ele) => ele !== "JS"));
});

mdTheme.addEventListener("input", (e) => {
  mdTheme.checked
    ? themesSelected.push("MD")
    : (themesSelected = themesSelected.filter((ele) => ele !== "MD"));
});

gitTheme.addEventListener("input", (e) => {
  gitTheme.checked
    ? themesSelected.push("GIT")
    : (themesSelected = themesSelected.filter((ele) => ele !== "GIT"));
});

linuxTheme.addEventListener("input", (e) => {
  linuxTheme.checked
    ? themesSelected.push("LINUX")
    : (themesSelected = themesSelected.filter((ele) => ele !== "LINUX"));
});

html2Theme.addEventListener("input", (e) => {
  html2Theme.checked
    ? themesSelected.push("HTML2")
    : (themesSelected = themesSelected.filter((ele) => ele !== "HTML2"));
});

css2Theme.addEventListener("input", (e) => {
  css2Theme.checked
    ? themesSelected.push("CSS2")
    : (themesSelected = themesSelected.filter((ele) => ele !== "CSS2"));
});

js2Theme.addEventListener("input", (e) => {
  js2Theme.checked
    ? themesSelected.push("JS2")
    : (themesSelected = themesSelected.filter((ele) => ele !== "JS2"));
});

linux2Theme.addEventListener("input", (e) => {
  linux2Theme.checked
    ? themesSelected.push("LINUX2")
    : (themesSelected = themesSelected.filter((ele) => ele !== "LINUX2"));
});

//fonction appelée lorsque all themes a été coché
const fillThemesArray = (allIsChecked) => {
  if (allIsChecked) {
    themesSelected = [
      "HTML",
      "HTML2",
      "CSS",
      "CSS2",
      "JS",
      "JS2",
      "MD",
      "GIT",
      "LINUX",
      "LINUX2",
    ];
  } else {
    themesSelected = [];
  }
};

buttonValidate.addEventListener("click", (e) => {
  let options = {
    questionTime,
    numbQuestionPerTheme,
    themesSelected,
  };
  //Si l'user n'a choisi aucun thème, on ne valide pas
  if (themesSelected.length === 0) {
    window.alert("Veuillez sélectionner au moins un thème.");
  } else {
    //Tout est bon
    selectedOptions = options;
    saveSettings();
    console.log("options sélectionnées :", selectedOptions);
  }
});

export default openSettings;
export { selectedOptions };
