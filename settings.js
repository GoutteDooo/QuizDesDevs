let questionTime;
let numbQuestionPerTheme;
let themesSelected = [];

//Sélecteurs
let settings = document.querySelector(".settings");
let blur = document.querySelector(".blur-background");

const openSetting = () => {
  //Quand l'user a cliqué sur la roue crantée, ouvre les settings
  settings.style.display = "block";
  blur.style.display = "block";
};

export default openSetting;
