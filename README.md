# Site internet — Le Kab Chazay (kiné sport & balnéo, Chazay-d'Azergues)

Site statique (HTML / CSS / JavaScript, aucune installation requise).
Ouvrir `index.html` dans un navigateur, ou héberger le dossier tel quel
(GitHub Pages, Netlify, OVH, o2switch…).

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : présentation, philosophie, accès rapides, carte + itinéraire, avis Google défilants |
| `equipe.html` | Les 3 associés (photo ou vidéo, formations dépliables, lien Doctolib) et les 6 assistants à venir |
| `expertise.html` | Silhouette interactive (face / dos) : clic sur une zone → pathologies + approche |
| `cabinet.html` | Survol aérien → porte d'entrée → visite des salles à points d'intérêt, zoom sur chaque machine, fiche produit interactive, et mode « matériel un à un » |
| `contact.html` | Doctolib, téléphone, horaires (avec « ouvert maintenant »), accès, parking, carte, Instagram |

Sur toutes les pages : logo / nom, menu, bouton « Prendre rendez-vous » dans l'en-tête et bouton flottant toujours visible.

## À compléter (informations provisoires)

1. **`assets/js/config.js`** : téléphone, e-mail, lien Doctolib, Instagram / Facebook, horaires.
2. **`equipe.html`** (tableau `TEAM`) : les 3 associés (Quentin Lorie, Max Fajou, Antoine Grange) sont en place avec leur lien Doctolib ;
   leurs **formations sont à recopier** depuis leurs profils Doctolib, avec spécialités et photo/vidéo.
   Les 6 assistants apparaissent en « Bientôt » : remplacer les cartes `.assist` quand l'équipe sera connue.
3. **`assets/js/reviews.js`** : les avis affichés sont **des exemples fictifs**. Remplacez-les par de vrais avis Google
   (copiés à la main) puis passez `PLACEHOLDER` à `false`. Pour un affichage automatique, il faut un widget
   (Elfsight, Trustindex…) ou l'API Google Places (clé API + petit serveur).
5. **`assets/js/cabinet-data.js`** : textes des salles et du matériel (planning balnéo, location Game Ready…).

## Photos

- `assets/img/cabinet/` : façade, accueil, soins, couloir, balnéo, plateau. Ce sont des **visuels non
  contractuels** (projection d'aménagement) : la mention est affichée sur le site. Remplacez-les par les
  vraies photos en gardant le même nom de fichier et un format 16:9 ; si le cadrage change, ajustez les
  positions `x` / `y` (en %) des points d'intérêt dans `assets/js/cabinet-data.js`.
- `assets/img/materiel/` : Voltra et EMG (photos produit), et des recadrages du plateau pour les autres machines.
  Vérifiez que vous avez le droit d'utiliser les photos produit des fabricants (ou utilisez vos propres photos).
- Plyo box et reverse hyper n'ont pas encore de photo : ils utilisent une illustration
  (ajouter `photo: IMG + "fichier.jpg"` dans `cabinet-data.js` suffit pour basculer sur une photo).
- Survol aérien : c'est un plan dessiné d'après la disposition réelle (rue en courbe, parking, entrée).
  Les captures Google Maps / Street View ne sont pas utilisées : elles ne peuvent pas être publiées sur un site.
  Une vraie vidéo de drone pourra remplacer le dessin (`aerial()` dans `cabinet.js`).
- Équipe : champs `photo` ou `video` de chaque membre dans `equipe.html`.

## Vidéos de l'équipe

Chaque associé peut avoir une courte vidéo à la place de sa photo (un mouvement, un exercice…) :
déposer le fichier dans `assets/video/equipe/` puis renseigner `video: "assets/video/equipe/prenom.mp4"`
dans le tableau `TEAM` de `equipe.html`. La photo reste affichée en attendant le chargement, et la vidéo
se lance quand la carte apparaît à l'écran. Conseils : 5 à 8 s, sans son, format portrait (4:5),
H.264/MP4 de moins de 3 Mo, mouvement qui boucle proprement.

## Plan du cabinet (RDC)

Les textes de la visite suivent le plan d'aménagement : entrée face au parking, accueil central et salle d'attente
(22 m²), 6 box de soin (10 à 17 m²), espace balnéo avec 3 cabines et douche commune, bassin 6 × 3 m (1,30 m de
profondeur), couloir le long du bassin vers le plateau technique (136 m²) et la salle technique attenante (30 m²).
La vue aérienne du survol reprend l'emprise du bâtiment.

## Version de test (GitHub Pages)

Le site est publié en test sur https://rugbystaps17.github.io/monster.rugby/ (Réglages du dépôt → Pages →
« Deploy from a branch » → branche `claude/le-kab-website-8adehq`, dossier `/ (root)`).
Les pages contiennent `<meta name="robots" content="noindex, nofollow">` pour que Google ne référence pas
cette version (avis d'exemple, numéro provisoire). **À retirer à la mise en ligne officielle.**
