# Site internet — Le Kab (kinésithérapie, Chazay-d'Azergues)

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

## Remplacer les illustrations par de vraies photos / vidéos

- **Salles** : dans `assets/js/cabinet.js`, chaque salle est dessinée par `SCENES.<id>()`. Pour une photo,
  remplacer le retour de la fonction par `'<img src="assets/img/salles/accueil.jpg" alt="">'` et ajuster
  les positions `x` / `y` (en %) des points d'intérêt dans `cabinet-data.js`.
- **Survol aérien** : une vidéo drone peut remplacer `SCENES.aerial()` ; la porte animée reste au-dessus.
- **Matériel** : même principe avec `DRAW.<id>` ; les points `spots` sont en % de l'image.
- **Équipe** : champs `photo` ou `video` de chaque membre (une vidéo courte en boucle fonctionne très bien).

## Formulaire de demande de RDV

Le formulaire ouvre la messagerie du patient avec un e-mail pré-rempli adressé au cabinet (pas de serveur
nécessaire). Pour recevoir les demandes directement, on peut le brancher sur Formspree / Netlify Forms.
Ne pas collecter de données médicales par ce biais.
