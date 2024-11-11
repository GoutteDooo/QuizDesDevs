export const qlHTML = [
  "En HTML, quelle est la balise utilisée pour écrire le titre principal ?",
  "En HTML, quelle est la balise utilisée pour faire une liste non ordonnée ?",
  "Trouver l'intrus dans cette liste",
  "Quelle balise est utilisée pour les images ?",
  "Citez un attribut HTML lié aux images",
  "Que signifie HTML ? ",
  "Quelle est la balise HTML correcte pour insérer un passage à la ligne ?",
  "Quelle balise est utilisée pour définir les en-têtes dans un tableau ?",
  "Quelle balise HTML est utilisée pour créer une liste de définitions ?",
  "Quelle balise HTML est utilisée pour créer un formulaire ?",
  "Comment spécifier un champ obligatoire dans un formulaire HTML ?",
  "Quel attribut est utilisé pour lier un label à un champ de formulaire ?",
  "Quelle balise HTML est utilisée pour définir une citation longue ?",
  "Quel attribut permet d’ouvrir un lien dans un nouvel onglet ?",
  "Quelle est la structure correcte d'une table HTML ?",
  "Comment définir un bouton en HTML ?",
  "Quel attribut permet de spécifier le lien d’une page dans une balise <a> ?",
  "À quoi sert la balise <title> ?",
  "Quelle balise HTML définit une liste non ordonnée ?",
  "Quel attribut permet d’ajouter un texte alternatif à une image ?",
  "Quelle balise HTML représente du texte important en gras ?",
  "Quelle balise permet d’insérer un champ de texte pour l’utilisateur ?",
  "Comment commenter une ligne de code HTML ?",
];

export const ansHTML = [
  ["<h1></h1>", "<title></title>", "<p></p>", '<input type="title" />'],
  ["<ul></ul>", "<list></list>", "<order></order>", '<input type="list" />'],
  ["<img></img>", "<ol></ol>", "<h5></h5>", "<th></th>"],
  ["<img />", "<picture />", "<pic />", "<link img />"],
  ["src", "class", "href", "img"],
  [
    "HyperText Markup Language",
    "Hyperlink Text Management Language",
    "Hierarchical Tagging Markup Language",
    "How To Meet Ladies",
  ],
  ["<br />", "<nbsp />", "<hr />", "<passage-a-la-ligne />"],
  ["<th>", "<td>", "<theader>", "<tete-du-tableau>"],
  ["<dl>", "<dlist>", "<del>", "<définissez_vous>"],
  ["<form>", "<fieldset>", "<input>", "<boite_a_questions>"],
  ["required", "mandatory", "haveto", "c_obligatoire"],
  ["for", "name", "id", "hello_c_moi"],
  ["<blockquote>", "<quote>", "<q>", "<parole_de_sage>"],
  ['target="_blank"', 'newtab="true"', 'rel="noopener"', "sesame_ouvre_toi"],
  [
    "<table><tr><td></td></tr></table>",
    "<table><td><tr></tr></td></table>",
    "<table><tr><tc><td></td></tc></tr></table>",
    "<table><diner_presque_parfait /></table>",
  ],
  ["<button>", '<input type="button">', "<btn>", "<appuie_sur_moi>"],
  ["src", "href", "link", "redirection_dans_3_2_1"],
  [
    "À ajouter le nom de la page dans l'onglet du navigateur",
    "À ajouter un titre à l'article",
    "À insérer un titre à une image",
    "À afficher des blagues toto",
  ],
  ["<ul>", "<li>", "<ol>", "<unordered>"],
  ["alt", "title", "description", "<alternatif-texte-image>"],
  ["<strong>", "<bold>", "<em>", "<heavystuff>"],
  [
    '<input type="text">',
    "<textzone>",
    '<input type="textarea">',
    "<champdetexte>",
  ],
  [
    "<!-- Commentaire -->",
    "// Commentaire",
    "/* Commentaire */",
    "J'm'en fou. J'ai un raccourci VS Code.",
  ],
];
export const cAnsHTML = [
  "<h1></h1>",
  "<ul></ul>",
  "<img></img>",
  "<img />",
  "src",
  "HyperText Markup Language",
  "<br />",
  "<th>",
  "<dl>",
  "<form>",
  "required",
  "for",
  "<blockquote>",
  'target="_blank"',
  "<table><tr><td></td></tr></table>",
  "<button>",
  "src",
  "À ajouter le nom de la page dans l'onglet du navigateur",
  "<ul>",
  "alt",
  "<strong>",
  '<input type="text">',
  "<!-- Commentaire -->",
];

export const qlHTML2 = [
  "Quel attribut ARIA est utilisé pour définir le rôle principal du contenu d'une page web ?",
  "Quel attribut permet d’indiquer une description longue pour les images ?",
  "Quelle balise HTML est recommandée pour le sous-titrage de vidéos ?",
  "Quel attribut de la balise <input> permet de limiter la saisie à des chiffres ?",
  "Comment spécifier plusieurs fichiers JavaScript dans l'attribut srcset d’une balise <script> ?",
  'À quoi sert l’attribut loading="lazy" dans la balise <img> ?',
  "Quelle balise est utilisée pour regrouper des boutons de radio ?",
  "Quel attribut de <meta> est utilisé pour le référencement international d’un site ?",
  "Comment spécifier un favicon en HTML ?",
  "Quelle balise permet d’ajouter du code pour une PWA (Progressive Web App) ?",
];

export const ansHTML2 = [
  ["aria-main", 'role="main"', "main-content", "aria-rockstar"],
  ["longdesc", "aria-describedby", "alt", "im_really_long_description"],
  ["<track>", "<caption>", "<subtitle>", "<itadakimasu>"],
  ['inputmode="numeric"', 'type="number"', 'type="integer"', "noWordsAllowed"],
  [
    "Ce n’est pas possible avec srcset",
    'srcset="fichier1.js, fichier2.js"',
    'scriptset="fichier1.js, fichier2.js"',
    'srcset="loadAllTheThings.js"',
  ],
  [
    "Charger une image seulement lorsque nécessaire",
    "Charger une image immédiatement",
    "Désactiver le chargement de l’image",
    "À faire la grasse matinée",
  ],
  ["<fieldset>", "<group>", "<button-group>", "<radioParty>"],
  ["hreflang", "language", "region", "speakMultipleLanguages"],
  [
    '<link rel="icon" href="favicon.ico">',
    '<favicon src="favicon.ico">',
    '<meta icon="favicon.ico">',
    '<link rel="cool-look">',
  ],
  ["<manifest>", '<script type="pwa">', '<meta pwa="true">', "<addMagicHere>"],
];

export const cAnsHTML2 = [
  "aria-main",
  "longdesc",
  "<track>",
  'inputmode="numeric"',
  "Ce n’est pas possible avec srcset",
  "Charger une image seulement lorsque nécessaire",
  "<fieldset>",
  "hreflang",
  '<link rel="icon" href="favicon.ico">',
  "<manifest>",
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
  "Quel est le bon ordre de priorité des styles ?",
  "Quel est le bon ordre de spécificité des sélecteurs ?",
  "Que se passe-t-il si deux règles sont de même niveau ?",
  "Laquelle de ces propriétés n'est pas héritable ?",
  "Laquelle de ces propriétés est héritable ?",
  "Quelle propriété force l'héritage de son parent ?",
  "Quelle propriété annule l'héritage de son parent ?",
  "Quelle propriété permet de définir la hauteur minimale d’un élément en CSS ?",
  "Quelle valeur de position permet à un élément de rester fixe lors du défilement ?",
  "Comment définir une bordure en CSS ?",
  "Quelle propriété permet de changer la police d’un texte en CSS ?",
  "Quelle propriété contrôle l’espace entre les lignes de texte ?",
  "Quelle unité CSS est relative à la largeur de la fenêtre ?",
  "Comment transformer le texte en majuscules en CSS ?",
  "Quelle propriété permet de centrer un élément avec margin en CSS ?",
  "Quel est le code CSS pour centrer du texte ?",
  "Comment appliquer un style sur un élément possédant un id ?",
  "À quoi sert la propriété margin ?",
  "Comment appliquer un style uniquement aux liens non visités ?",
  "Quel mot-clé CSS permet de mettre en page un site en grille ?",
  "Comment rendre un texte en italique en CSS ?",
  "Quel sélecteur permet de styliser un élément en fonction de son statut d’enfant dans son parent ?",
];

export const ansCSS = [
  [
    "Cascading Style Sheets",
    "Central Script System",
    "Code Structure Simplifier",
    "Crazy Spaghetti Syntax",
  ],
  ["transform", "modulate", "resize", "set-size"],
  ["background-color", "color", "font-color", "rainbow-painter"],
  [
    "Modifier la position des éléments sur l'axe Z (avant/arrière)",
    "Contrôler la transparence d'un élément",
    "Régler la largeur des éléments",
    "Changer l'altitude d'un élément dans le cloud",
  ],
  [
    "Définir le type d'affichage d'un élément (bloc, inline, etc.)",
    "Ajuster l'espacement entre les éléments",
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
  ["border-radius", "border-style", "box-shadow", "arrondis-toi"],
  [
    "box-shadow",
    "shadow",
    "text-shadow",
    "dire 'ombre' et espérer que ça marche",
  ],
  ["opacity", "visibility", "transparency", "incognito-mode"],
  ["em", "px", "rem", "banana"],
  [
    "Placer l'élément par rapport à son conteneur le plus proche avec position: relative;",
    "Fixer l'élément en haut de la page",
    "Garder l'élément toujours visible en défilant",
    "Permettre à l'élément d'exister dans une autre dimension",
  ],
  ["padding", "border-spacing", "margin", "inner-bubble"],
  [
    "inline > interne > externe > user",
    "interne > externe > inline > user",
    "inline > user > interne > externe",
    "y'en a certainement un.",
  ],
  [
    "!important > id > classe > type (p, h1, etc)",
    "id > !important > classe > type (p, h1, etc)",
    "type (p, h1, etc) > classe > id > !important",
    "La réponse D.",
  ],
  [
    "La dernière s'applique ",
    "Les deux s'appliquent mutuellement",
    "La première s'applique",
    "Elles tirent à la courte paille",
  ],
  ["background", "color", "font-family", "La maison de ma belle-mère"],
  ["text-align", "margin", "width", "La calvitie de mon père"],
  ["inherit", "herit", "initial", "Un passage au tribunal"],
  ["initial", "inherit", "unset", "cut-the-cord"],
  ["min-height", "height-limit", "minimum-height", "petit_petit_petit"],
  ["fixed", "absolute", "sticky", "collé_au_sol"],
  ["border", "line-border", "outline", "a_sauter"],
  ["font-family", "text-font", "font-style", "changer_de_stylo"],
  ["line-height", "height", "text-spacing", "spacing-moon"],
  ["vw", "vh", "px", "prendre_son_metre"],
  [
    "text-transform: uppercase",
    "font-case: capital",
    "text-decoration: caps",
    "THIS_IS_SPARTA",
  ],
  ["margin: 0 auto", "align: center", "auto-margin", "met_tout_au_centre"],
  [
    "text-align: center;",
    "align: middle;",
    "center: true;",
    "faites-que-ce-soit-beau",
  ],
  ["#id-element", ".id-element", "id-element", "papiers-svp"],
  [
    "Créer un espace autour d’un élément",
    "Changer la couleur du texte",
    "Redimensionner l’élément",
    "Augmenter la marge entre l'utilisateur et l'écran",
  ],
  ["a:link", "a:visited", "a:hover", "a:jesaispas"],
  ["display: grid;", "layout: grid;", "flex: true;", "ultra-mosaïque;"],
  [
    "font-style: italic;",
    "text-type: italic;",
    "style-italic: true;",
    "nationality:italic",
  ],
  ["nth-child", "child-of", "sub-item", "theChosenOne"],
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
  "inline > interne > externe > user",
  "!important > id > classe > type (p, h1, etc)",
  "La dernière s'applique ",
  "background",
  "text-align",
  "inherit",
  "initial",
  "min-height",
  "fixed",
  "border",
  "font-family",
  "line-height",
  "vw",
  "text-transform: uppercase",
  "margin: 0 auto",
  "text-align: center;",
  "#id-element",
  "Créer un espace autour d’un élément",
  "a:link",
  "display: grid;",
  "font-style: italic;",
  "nth-child",
];

export const qlCSS2 = [
  "Quelle directive SCSS est utilisée pour importer des fichiers partagés ?",
  "Comment déclarer une variable SCSS pour la couleur principale d’un site ?",
  "Quelle fonction SCSS ajuste la transparence d’une couleur ?",
  "Quel est l’ordre correct pour les arguments de margin en CSS shorthand ?",
  "Comment peut-on imbriquer des sélecteurs en SASS ?",
  "Quel est le comportement de & en SCSS lorsqu’il est utilisé avec des pseudo-classes ?",
  "Quelle méthode permet de réutiliser du code CSS avec des paramètres en SASS ?",
  "Quelle est la syntaxe correcte pour une boucle for en SCSS ?",
  "Comment modifier une couleur en ajustant uniquement sa luminosité en SCSS ?",
  "Quelle fonction CSS permet de définir plusieurs fonds d'écran sur un seul élément ?",
  `En SCSS, si deux fichiers possèdent le même sélecteur, quelle va être la réaction du CSS compilé ?`,
  "Parmi ces réponses, laquelle est la bonne ?",
];

export const ansCSS2 = [
  ["@import", "@include", "@use", "@summonTheCode"],
  [
    "$primary-color: #3498db;",
    "var(--primary-color: #3498db);",
    "--primary-color: #3498db;",
    'colorIsLife="#3498db"',
  ],
  ["rgba()", "fade-out()", "opacity()", "magicTransparency()"],
  [
    "top, right, bottom, left",
    "left, right, top, bottom",
    "top, bottom, left, right",
    "whereverItLooksGood",
  ],
  [
    "En utilisant &",
    "En utilisant @mixin",
    "Avec des doubles crochets [[...]]",
    "Avec intothevoid",
  ],
  [
    "Il fait référence au parent et se concatène avec les pseudo-classes",
    "Il est ignoré",
    "Il remplace la pseudo-classe",
    "Il se transforme en super-héros",
  ],
  ["@mixin", "@function", "@reuse", "@code_dance_party"],
  [
    "@for $i from 1 through 5",
    "@loop $i to 5",
    "for($i=1; $i<=5; $i++)",
    "letTheLoopBegin",
  ],
  [
    "lighten($color, 20%)",
    "opacity($color, 0.2)",
    "rgba($color, 0.8)",
    "addSunshine($color)",
  ],
  [
    "background-image: url(...), url(...);",
    "multi-background: url(...);",
    "backgrounds: urls(...)",
    "background-party",
  ],
  [
    "Il n'y aura que le body du dernier fichier importé",
    "Il n'y aura que le body du premier fichier importé",
    "Le CSS prendra les deux bodys et en fera un mix.",
    "Il deviendra trouble comme de l'eau de chaux !",
  ],
  [
    "font-size: $main * 0.8;",
    "color: #000000 + 80;",
    "background: rgb(0,0,0) + rgb(80,80,80);",
    "Celle-ci.",
  ],
];

export const cAnsCSS2 = [
  "@import",
  "$primary-color: #3498db;",
  "rgba()",
  "top, right, bottom, left",
  "En utilisant &",
  "Il fait référence au parent et se concatène avec les pseudo-classes",
  "@mixin",
  "@for $i from 1 through 5",
  "lighten($color, 20%)",
  "background-image: url(...), url(...);",
  "Il deviendra trouble comme de l'eau de chaux !",
  "font-size: $main * 0.8;",
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
  "Quelle méthode permet de parcourir les éléments d’un tableau en JavaScript ?",
  "Quelle est la sortie de typeof null en JavaScript ?",
  "Comment déclarer une variable en JavaScript ?",
  "Quelle méthode retourne l’index d’un élément dans un tableau ?",
  "Que renvoie NaN en JavaScript ?",
  "Quelle méthode permet de convertir un objet en chaîne JSON ?",
  "Comment vérifier si une variable est undefined ?",
  'Quelle est la sortie de 1 + "2" en JavaScript ?',
  "Quelle fonction est utilisée pour temporiser l’exécution d’un code ?",
  "Quel symbole termine une ligne de code en JavaScript ?",
  "À quoi sert console.log ?",
  "Comment ajouter un commentaire sur une ligne en JavaScript ?",
  "Que signifie === en JavaScript ?",
  "Quel opérateur permet d’ajouter 1 à une variable ?",
  "Quelle méthode convertit une chaîne de caractères en majuscules ?",
  "Comment arrondir un nombre à l'entier supérieur en JavaScript ?",
  "Si je fais un 'console.log(window.scrollY);' au chargement de la page, qu'est-ce qui va apparaître à l'écran ?",
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
  ["forEach()", "map()", "filter()", "tournicoti()"],
  ["object", "null", "undefined", "black_hole"],
  ["let", "variable", "constant", "je_declare"],
  ["indexOf()", "findIndex()", "find()", "index_hunter()"],
  [
    "Not a Number",
    "Null and None",
    "New and Nested",
    "Un acronyme pour 'N'importe quoi, Absolument N'importe quoi.'",
  ],
  ["JSON.stringify()", "JSON.parse()", "Object.toJSON()", "conversion_JSON()"],
  [
    'typeof(variable) === "undefined"',
    'variable === "undefined"',
    "variable == null",
    "variable_undefined?()",
  ],
  ['"12"', '"1b"', "NaN", "ca_ne_va_pas"],
  ["setTimeout()", "delay()", "wait()", "have-a-kitkat()"],
  [";", ".", ":", "!#?%*$:P"],
  [
    "Afficher des informations dans la console",
    "Ajouter une ligne",
    "Stocker des données",
    "A allumer la Playstation",
  ],
  [
    "// Commentaire",
    "# Commentaire",
    "-- Commentaire",
    "Je préfère commenter sur Youtube",
  ],
  [
    "Comparaison stricte",
    "Comparaison souple",
    "Comparaison égalitaire",
    "Que je dois aller réviser mon JS",
  ],
  ["++", "+", "add(1)", "devient_plus_fort()"],
  ["toUpperCase()", "toCaps()", "makeUpper()", "shoutLoud"],
  ["Math.ceil()", "Math.floor()", "Math.roundUp()", "WhyRoundWhenYouCanFly"],
  [
    "0",
    "undefined",
    "Error: ScrollYInitializationError",
    "Je préfère aller scroll sur TikTok.",
  ],
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
  "forEach()",
  "object",
  "let",
  "indexOf()",
  "Not a Number",
  "JSON.stringify()",
  'typeof(variable) === "undefined"',
  '"12"',
  "setTimeout()",
  ";",
  "Afficher des informations dans la console",
  "// Commentaire",
  "Comparaison stricte",
  "++",
  "toUpperCase()",
  "Math.ceil()",
  "0",
];

export const qlJS2 = [
  "Comment définir une fonction qui retourne elle-même ?",
  "Quelle méthode de tableau renvoie un nouveau tableau trié ?",
  "Que renvoie la méthode typeof pour un tableau ?",
  "Quelle syntaxe déstructure un objet pour extraire ses propriétés a et b ?",
  "Comment vérifier si une valeur est NaN en JavaScript ?",
  "Quelle méthode Promise permet d'attendre que toutes les promesses soient terminées ?",
  "Comment accéder à tous les arguments d'une fonction dans ES6 ?",
  "Quelle est la syntaxe correcte pour une fonction fléchée avec retour implicite ?",
  "Comment changer obj.key1 en obj.key2 tout en conservant la valeur d'origine ?",
  "Quelle est la sortie de 0.1 + 0.2 === 0.3 ?",
];

export const ansJS2 = [
  [
    "function selfReturning() { return selfReturning; }",
    "function() { return this; }",
    "function recursive() { return recursive(); }",
    "function inception() { return inception(); }",
  ],
  [
    "array.sort()",
    "array.shuffle()",
    "array.reverseSort()",
    "array.magicSort()",
  ],
  ["object", "array", "list", "confusion"],
  [
    "const {a, b} = obj;",
    "const a, b = obj;",
    "const a = obj.a, b = obj.b;",
    'const awesome = "JS is tricky;"',
  ],
  [
    "isNaN(value)",
    "value == NaN",
    "typeof value === 'NaN'",
    "notANumberButMaybeANinja",
  ],
  ["Promise.all", "Promise.race", "Promise.wait", "Promise.weCanDoIt"],
  ["...args", "arguments", "Array.from(args)", "whatsGoingOnHere"],
  [
    "const f = () => value",
    "const f = () => { return value }",
    "const f = (value) => return",
    "function likeAnArrow()",
  ],
  [
    "obj.key2 = obj.key1; delete obj.key1;",
    "obj.key2 = obj.key1;",
    "Object.assign(obj, {key2: obj.key1});",
    "AbraKadabra()",
  ],
  ["false", "true", "undefined", "It's complicated..."],
];

export const cAnsJS2 = [
  "function selfReturning() { return selfReturning; }",
  "array.sort()",
  "object",
  "const {a, b} = obj;",
  "isNaN(value)",
  "Promise.all",
  "...args",
  "const f = () => value",
  "obj.key2 = obj.key1; delete obj.key1;",
  "false",
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
  "Quelle commande est utilisée pour afficher les processus actifs ?",
  "À quoi sert la commande chmod ?",
  "Quelle commande utiliser parmi les suivantes pour revenir d'un répertoire en arrière ?",
  "A quoi sert la commande ssh (secure shell) ?",
  `Lorsque j'utilise la commande "cd /", que se passe-t-il exactement ?`,
  "A quoi sert la commande gzip ?",
  "Lorsque j'utilise la commande 'echo texte', que se passe-t-il ?",
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
  ["top", "ps", "htop", "espionnage_du_CPU"],
  [
    "Modifier les permissions d’un fichier",
    "Afficher le contenu d’un fichier",
    "Copier un fichier",
    "Mettre à chauffer la pizza dans le four.",
  ],
  ["cd ..", "cd /", "cd ./", "marche-arriere"],
  [
    "A se connecter sur un serveur distant",
    "A compresser un fichier",
    "A crypter un fichier afin de le sécuriser",
    "A se brosser les dents.",
  ],
  [
    "On retourne au répertoire racine",
    "On retourne d'un répertoire en arrière",
    "Le terminal demande dans quel répertoire l'on veut aller",
    "Tu insères un cd rayé dans le lecteur dvd.",
  ],
  [
    "A compresser un fichier en .gzip",
    "A décompresser un fichier .zip",
    "A compresser un fichier en .zip",
    "A sortir ses bijoux les plus précieux",
  ],
  [
    "le terminal affiche text",
    "le terminal crée une variable temporaire text et nous demande d'y insérer ce que l'on veut",
    "Ca effectue une recherche dans les répertoires et sous-répertoires un fichier du nom de text",
    "le terminal se met à nous parler en ch'ti",
  ],
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
  "top",
  "Modifier les permissions d’un fichier",
  "cd ..",
  "A se connecter sur un serveur distant",
  "On retourne au répertoire racine",
  "A compresser un fichier en .gzip",
  "le terminal affiche text",
];
//Linux Moyen
export const qlLinux2 = [
  "Comment afficher les 10 premières lignes d’un fichier ?",
  "Quelle commande permet de rechercher un mot dans un fichier ?",
  "Comment afficher la date et l’heure actuelles ?",
  "Quelle commande affiche les processus en cours ?",
  "Quelle commande permet de rechercher un mot dans plusieurs fichiers et sous-dossiers ?",
  "Comment exécuter une commande avec des privilèges root ?",
  "Quelle commande affiche l'espace disque disponible pour chaque partition ?",
  "Comment sauvegarder la sortie d’une commande dans un fichier texte ?",
  "Quelle commande affiche l'utilisation de la mémoire par les processus ?",
  "Comment lister les fichiers cachés dans un répertoire ?",
  "Comment afficher les permissions d’un fichier en détail ?",
  "Quelle commande affiche uniquement les dix dernières lignes d’un fichier ?",
  "Quelle commande exécute une commande précédente sans avoir à la retaper ?",
  "Comment modifier l'utilisateur actif sans quitter la session ?",
];

export const ansLinux2 = [
  ["head", "first10", "tail", "Les-Dix-1ere-Stp"],
  ["grep", "find", "locate", "sherlock-mot(mot)"],
  ["date", "time", "now", "Je regarde l'heure sur le téléphone."],
  ["ps", "proc", "run", "¿Qué pasa?"],
  ["grep -r", "grep", "search -all", "find_my_lost_files"],
  ["sudo", "root", "admin", "justTrustMe"],
  ["df -h", "du", "lsblk", "pleaseGiveMeMoreSpace"],
  [
    "commande > fichier.txt",
    "save commande",
    "commande /to fichier.txt",
    "justRememberIt.txt",
  ],
  ["top", "free", "memcheck", "nosyNeighbor"],
  ["ls -a", "ls --hidden", "dir -hidden", "peekBehindTheCurtain"],
  ["ls -l", "chmod", "perm file", "showMeYourSecrets"],
  ["tail", "bottom", "end", "finalWords"],
  ["!!", "again", "runLast", "doItAgainSam"],
  ["su", "change-user", "switch", "I'mSomebodyElseNow"],
];

export const cAnsLinux2 = [
  "head",
  "grep",
  "date",
  "ps",
  "grep -r",
  "sudo",
  "df -h",
  "commande > fichier.txt",
  "top",
  "ls -a",
  "ls -l",
  "tail",
  "!!",
  "su",
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
  "Comment formater du texte en italique en Markdown ?",
  "Comment créer une liste à puce en Markdown ?",
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
  [
    "Ce n'est pas possible",
    "__texte__",
    "<u>texte</u>",
    "////////// texte//////////",
  ],
  ["--- (dashes)", "___ (underscores)", "***", `¯\_(ツ)_/¯`],
  ["*texte*", "**texte**", "_texte_", "🎩_texte_🎩"],
  ["- élément", "* élément", "= élément", "Xx_?!|[liste2010]|!?_xX"],
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
  "Ce n'est pas possible",
  "--- (dashes)",
  "*texte*",
  "- élément",
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
  "A quoi sert le rebase ?",
  "Comment vérifier l’état actuel du dépôt en Git ?",
  "Comment configurer le nom d’utilisateur dans Git ?",
  "Quelle commande permet de visualiser les différences entre deux commits ?",
  "Comment annuler un commit qui n’a pas encore été envoyé au dépôt distant ?",
  "Quelle commande permet de télécharger les dernières modifications sans les fusionner ?",
  "Comment marquer un moment précis dans l’historique d’un dépôt ?",
];

export const ansGit = [
  ["git init", "git start", "git new", "git fabrique_un_gite"],
  ["git add", "git stage", "git prepare", "git mettre_dans_le_panier"],
  ["git commit", "git save", "git push", "git fais_le_taf"],
  ["git branch", "git new branch", "git checkout", "git fais_du_bois"],
  ["git merge", "git join", "git combine", "git fuuuuuusion HA !"],
  ["git pull", "git push", "git clone", "git oh hisse"],
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
  [
    "A réécrire l'historique des commits d'une branche",
    "A incorporer l'historique des commits d'une branche à une autre",
    "A préserver l'historique de chaque branche, y compris les parallèles",
    "À remonter le temps et corriger les erreurs avec style, mais sans DeLorean.",
  ],
  ["git status", "git check", "git show", "git_comment_va_ton_code"],
  [
    "git config --global user.name",
    "git set-username",
    "git init-user",
    "git_identité_secrète",
  ],
  ["git diff", "git show", "git compare", "git_keléladiff"],
  ["git reset", "git undo", "git uncommit", "oopsIDidItAgain"],
  ["git fetch", "git pull", "git grab", "git telecharge_moi_ca"],
  ["git tag", "git mark", "git stamp", "git souviens-toi"],
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
  "A réécrire l'historique des commits d'une branche",
  "git status",
  "git config --global user.name",
  "git diff",
  "git reset",
  "git fetch",
  "git tag",
];
