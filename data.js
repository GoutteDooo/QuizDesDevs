export const qlHTML = [
  "En HTML, quelle est la balise utilisée pour écrire le titre principal ?",
  "En HTML, quelle est la balise utilisée pour faire une liste ? <em style='font-size : 0.7rem'>(et pour les plus pointilleux, oui il y en a plusieurs...)</em>",
  "Trouver l'intrus dans cette liste",
  "Quelle balise est utilisée pour les images ?",
  "Citez un attribut HTML lié aux images",
  "Que signifie HTML ? ",
  "question 7 HTML",
  "question 8 HTML",
  "question 9 HTML",
  "question 10 HTML",
];
export const ansHTML = [
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
  ["r q7", "r q7", "r q7", "r q7"],
  ["r q8", "r q8", "r q8", "r q8"],
  ["r q9", "r q9", "r q9", "r q9"],
  ["r q10", "r q10", "r q10", "r q10"],
];
export const cAnsHTML = [
  "<h1></h1>",
  "<ul></ul>",
  "<img></img>",
  "<img />",
  "src",
  "HyperText Markup Language",
  "r q7",
  "r q8",
  "r q9",
  "r q10",
];

/* ----- CSS ----- */
export const qlCSS = [
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

export const ansCSS = [
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

export const cAnsCSS = [
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
  "em",
  "Placer l'élément par rapport à son conteneur le plus proche avec position: relative;",
  "padding",
];

/*----- JavaScript ----- */
export const qlJS = [
  "Comment afficher un message dans la console en JavaScript ?",
  "Quelle méthode est utilisée pour interagir avec un élément par son ID ?",
  "Quelle syntaxe permet de déclarer une fonction en JavaScript ?",
  "Quelle méthode est utilisée pour ajouter un élément à la fin d’un tableau ?",
  "Comment créer un objet en JavaScript ?",
  "Quelle est la valeur par défaut d’une variable non initialisée en JavaScript ?",
  "Quelle méthode est utilisée pour convertir une chaîne de caractères en nombre ?",
  "Quelle structure permet de boucler tant qu’une condition est vraie ?",
  "Quelle méthode est utilisée pour ajouter un événement à un élément HTML ?",
  "Quelle méthode permet de vérifier si un tableau contient un élément spécifique ?",
];

export const ansJS = [
  ["console.log()", "print()", "message()", "miroir-miroir()"],
  [
    "document.getElementById()",
    "document.querySelectorId()",
    "document.selectElementId()",
    "document.whatsYourName()",
  ],
  [
    "function maFonction() {}",
    "let maFonction() {}",
    "const maFonction() {}",
    "abracadabra() {}",
  ],
  ["push()", "append()", "add()", "ramèneTaFraise()"],
  [
    "let objet = {}",
    "let objet = newObject()",
    "let objet = new Object",
    "et_paf_ca_fait_des_chocapics",
  ],
  ["undefined", "null", "NaN", "pas_encore_la"],
  ["parseInt()", "parseFloat()", "Number()", "transformation()"],
  ["while", "for", "if", "twister()"],
  [
    "addEventListener()",
    "document.appendChild()",
    "onClick()",
    "add_to_calendar()",
  ],
  ["includes()", "filter()", "forEach()", "detection_en_cours()"],
];

export const cAnsJS = [
  "console.log()",
  "document.getElementById()",
  "function maFonction() {}",
  "push()",
  "let objet = {}",
  "undefined",
  "parseInt()",
  "while",
  "addEventListener()",
  "includes()",
];

/* ----- LINUX ----- */
export const qlLinux = [
  "Quelle commande permet de lister les fichiers dans un répertoire ?",
  "Quelle commande est utilisée pour changer de répertoire ?",
  "Comment créer un nouveau fichier dans le terminal ?",
  "Quelle commande est utilisée pour afficher le chemin actuel ?",
  "Comment supprimer un fichier avec le terminal Linux ?",
  "Quelle commande permet de copier un fichier ?",
  "Quelle commande est utilisée pour afficher le contenu d’un fichier texte ?",
  "Quelle commande permet de déplacer un fichier ?",
  "Comment exécuter un script bash ?",
  "Quelle commande est utilisée pour redémarrer le système ?",
];

export const ansLinux = [
  ["ls", "list", "dir", "regarde_moi_tout_ca"],
  ["cd", "mv", "path", "téléportation()"],
  ["touch", "create", "makefile", "creer_qqch"],
  ["pwd", "ls", "cat", "ousuisje"],
  ["rm", "delete", "dl", "goodbyemyfriend"],
  ["cp", "copy", "duplicate", "clone_moi_ca"],
  ["cat", "show", "read", "ouvrir_parchemin"],
  ["mv", "move", "go", "taxi"],
  ["./script.sh", "run script.sh", "exec script.sh", "en_avant_le_show"],
  ["reboot", "restart", "shutdown -r", "en_voiture_simone"],
];

export const cAnsLinux = [
  "ls",
  "cd",
  "touch",
  "pwd",
  "rm",
  "cp",
  "cat",
  "mv",
  "./script.sh",
  "reboot",
];

/* ------ Markdown ----- */
export const qlMD = [
  "Comment créer un titre de premier niveau en Markdown ?",
  "Comment ajouter un lien hypertexte en Markdown ?",
  "Comment créer une liste non ordonnée en Markdown ?",
  "Comment formater du texte en gras en Markdown ?",
  "Comment créer un bloc de code en Markdown ?",
  "Comment ajouter une image en Markdown ?",
  "Comment ajouter une citation en Markdown ?",
  "Comment faire une liste ordonnée en Markdown ?",
  "Comment souligner du texte en Markdown ?",
  "Comment créer une ligne horizontale en Markdown ?",
];

export const ansMD = [
  ["# Titre", "- Titre", "= Titre", "💥 SuperTitre"],
  ["[Texte](URL)", '<a href="URL">Texte</a>', "[Texte]: URL", "[clic_magic]"],
  ["* élément", "1. élément", "- élément", "[liste de courses]"],
  ["**texte**", "*texte*", "_texte_", "💪 strong_text"],
  ["`code`", "<code>", "{code}", "💻 balise_magique"],
  [
    "![alt](URL)",
    '<img src="URL" alt="alt">',
    "[alt](URL)",
    "🖼️_picto_fantaisie",
  ],
  ["> citation", "- citation", '" citation "', "💭un_sage_a_dit_un_jour"],
  ["1. élément", "- élément", "* élément", "📜 belle_liste"],
  ["--- texte", "__texte__", "<u>texte</u>", "texte_souligne_toi"],
  ["--- (dashes)", "___ (underscores)", "***", "-draw_line-"],
];

export const cAnsMD = [
  "# Titre",
  "[Texte](URL)",
  "* élément",
  "**texte**",
  "`code`",
  "![alt](URL)",
  "> citation",
  "1. élément",
  "--- texte",
  "--- (dashes)",
];

/* ------ Git ----- */

export const qlGit = [
  "Quelle commande initialise un nouveau dépôt Git ?",
  "Quelle commande permet d’ajouter des fichiers au staging area ?",
  "Comment confirmer des changements dans Git ?",
  "Quelle commande permet de créer une nouvelle branche ?",
  "Quelle commande fusionne deux branches dans Git ?",
  "Comment récupérer les changements d’un dépôt distant ?",
  "Quelle commande permet d’envoyer des changements vers un dépôt distant ?",
  "Quelle commande affiche l’historique des commits ?",
  "Comment revenir temporairement à un commit précédent ?",
  "Quelle commande permet de cloner un dépôt distant ?",
  "A quoi sert une Pull Request ? (PR)",
];

export const ansGit = [
  ["git init", "git start", "git new", "git fabrique_un_gite"],
  ["git add", "git stage", "git prepare", "git mettre_dans_le_panier"],
  ["git commit", "git save", "git push", "git fais_le_taf"],
  ["git branch", "git new branch", "git checkout", "git fais_du_bois"],
  ["git merge", "git join", "git combine", "git fuuuuuusion HA !"],
  ["git pull", "git fetch", "git clone", "git oh hisse"],
  ["git push", "git send", "git upload", "git le_facteur_est_passé"],
  ["git log", "git history", "git commits", "git ct mieux avant"],
  ["git checkout", "git revert", "git reset", "git back_to_the_futur"],
  ["git clone", "git copy", "git download", "git terminator"],
  [
    "Permettre de proposer des changements à un dépôt distant",
    "Permettre de récupérer des changements d'un dépôt distant",
    "Permettre de récupérer un dépôt distant en y indiquant qu'on va y effectuer des modifs",
    "A signaler qu'il est temps de prendre une pause café",
  ],
];

export const cAnsGit = [
  "git init",
  "git add",
  "git commit",
  "git branch",
  "git merge",
  "git pull",
  "git push",
  "git log",
  "git checkout",
  "git clone",
  "Permettre de proposer des changements à un dépôt distant",
];
