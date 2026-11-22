# Site internet — Le Kab Chazay (kiné sport & balnéo, Chazay-d'Azergues)

Site statique (HTML / CSS / JavaScript, aucune installation requise).
Ouvrir `index.html` dans un navigateur, ou héberger le dossier tel quel
(GitHub Pages, Netlify, OVH, o2switch…).

## Pages

| Fichier | Contenu |
|---|---|
| `index.html` | Accueil : présentation, philosophie, accès rapides, carte + itinéraire, avis Google défilants |
| `equipe.html` | Animation « Essai ! », cartes des kinés avec parcours / formations dépliables et lien Doctolib |
| `expertise.html` | Silhouette interactive (face / dos) : clic sur une zone → pathologies + approche |
| `cabinet.html` | Survol aérien → porte d'entrée → visite des salles à points d'intérêt, zoom sur chaque machine, fiche produit interactive, et mode « matériel un à un » |
| `contact.html` | Doctolib, téléphone, formulaire de demande de RDV, horaires (avec « ouvert maintenant »), accès, parking, carte, Instagram |

Sur toutes les pages : logo / nom, menu, bouton « Prendre rendez-vous » dans l'en-tête et bouton flottant toujours visible.

## À compléter (informations provisoires)

1. **`assets/js/config.js`** : téléphone, e-mail, lien Doctolib, Instagram / Facebook, horaires.
2. **`equipe.html`** (tableau `TEAM`) : noms, rôles, spécialités, parcours, photo ou vidéo, lien Doctolib de chaque kiné.
3. **`assets/js/reviews.js`** : les avis affichés sont **des exemples fictifs**. Remplacez-les par de vrais avis Google
   (copiés à la main) puis passez `PLACEHOLDER` à `false`. Pour un affichage automatique, il faut un widget
   (Elfsight, Trustindex…) ou l'API Google Places (clé API + petit serveur).
4. **`contact.html`** : accessibilité PMR à préciser.
5. **`assets/js/cabinet-data.js`** : textes des salles et du matériel (planning balnéo, location Game Ready…).

## Photos

- `assets/img/cabinet/` : façade, accueil, soins, couloir, balnéo, plateau. Ce sont des **visuels non
  contractuels** (projection d'aménagement) : la mention est affichée sur le site. Remplacez-les par les
  vraies photos en gardant le même nom de fichier et un format 16:9 ; si le cadrage change, ajustez les
  positions `x` / `y` (en %) des points d'intérêt dans `assets/js/cabinet-data.js`.
- `assets/img/materiel/` : Voltra et EMG (photos produit), et des recadrages du plateau pour les autres machines.
  Vérifiez que vous avez le droit d'utiliser les photos produit des fabricants (ou utilisez vos propres photos).
- Mad-Up BFR, plyo box, reverse hyper et Normatec n'ont pas encore de photo : ils utilisent une illustration
  (ajouter `photo: IMG + "fichier.jpg"` dans `cabinet-data.js` suffit pour basculer sur une photo).
- Survol aérien : c'est un plan dessiné d'après la disposition réelle (rue en courbe, parking, entrée).
  Les captures Google Maps / Street View ne sont pas utilisées : elles ne peuvent pas être publiées sur un site.
  Une vraie vidéo de drone pourra remplacer le dessin (`aerial()` dans `cabinet.js`).
- Équipe : champs `photo` ou `video` de chaque membre dans `equipe.html`.

## Formulaire de demande de RDV

Le formulaire ouvre la messagerie du patient avec un e-mail pré-rempli adressé au cabinet (pas de serveur
nécessaire). Pour recevoir les demandes directement, on peut le brancher sur Formspree / Netlify Forms.
Ne pas collecter de données médicales par ce biais.
