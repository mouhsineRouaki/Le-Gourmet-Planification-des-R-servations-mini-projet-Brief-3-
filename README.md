# Le Gourmet — Planification des Réservations
Mini-projet (Brief 3)

## Résumé
Le Gourmet est une application web front-end pour la planification et la gestion des réservations d'un restaurant. L'application permet aux utilisateurs de consulter les créneaux disponibles et de créer des réservations via une interface moderne en HTML, CSS et JavaScript.

Ce dépôt contient le code source (HTML/CSS/JS) du mini-projet.

## Fonctionnalités principales
- Consultation des créneaux / horaires disponibles
- Création d'une réservation (nom, date, heure, nombre de personnes)
- Validation côté client des champs de réservation
- Interface responsive (adaptée mobile & desktop)
- Feedback visuel lors de la création d'une réservation

## Technologies
- JavaScript (ES6+)
- HTML5
- CSS3 (Flexbox / Grid)
- (Optionnel) Outils de build légers ou serveur statique pour le développement

## Aperçu / Démo
- Pour une visualisation rapide : ouvrez `index.html` dans votre navigateur.
- Pour une expérience de développement proche d'un serveur de production, servez le dossier du projet via un serveur HTTP local (exemples ci-dessous).

## Prérequis
- Navigateur moderne (Chrome, Firefox, Edge, Safari)
- (Optionnel) Node.js si vous souhaitez utiliser des outils npm ou serveurs locaux
- (Optionnel) Python 3 pour un serveur HTTP simple

## Installation et exécution locale

1. Clonez le dépôt
   git clone https://github.com/mouhsineRouaki/Le-Gourmet-Planification-des-R-servations-mini-projet-Brief-3-.git
   cd Le-Gourmet-Planification-des-R-servations-mini-projet-Brief-3-

2. Méthodes pour lancer l'application

   - Ouvrir directement (simple)
     - Double-cliquez sur `index.html` ou ouvrez-le depuis votre navigateur.

   - Via un serveur HTTP simple (recommandé pour éviter les restrictions CORS)
     - Avec Python 3 :
       python3 -m http.server 8000
       puis ouvrez http://localhost:8000
     - Avec `serve` (npm) :
       npm install -g serve
       serve -s . -l 5000
       puis ouvrez http://localhost:5000

   - Si un workflow npm est présent (package.json)
     - npm install
     - npm start
     (Les commandes dépendent des scripts définis dans package.json.)

## Structure suggérée du projet
(Adaptée au dépôt — vérifiez les chemins dans votre repo)
- index.html — point d'entrée
- /css — feuilles de style
- /js — scripts JavaScript
- README.md — ce fichier

## Utilisation
- Remplissez le formulaire de réservation : nom, date, heure, nombre de personnes.
- Validez la réservation ; des contrôles côté client vérifient la validité des champs.
- Après envoi, une confirmation s'affiche (ou un message d'erreur si les données sont invalides).
- (Optionnel) Les réservations peuvent être persistées en localStorage pour les tests locaux.

## Tests
- Aucun framework de tests inclus par défaut.
- Pour tester les scripts vous pouvez :
  - Ouvrir la console du navigateur pour lire les logs
  - Simuler des réservations et vérifier localStorage
  - Ajouter des tests unitaires (jest / vitest) si nécessaire

## Accessibilité & bonnes pratiques
- Utiliser des éléments HTML sémantiques (formulaires, labels associées)
- Garder le contraste des couleurs lisible
- Gérer le focus pour la navigation clavier
- Ajouter des attributs ARIA si nécessaire

## Contribution
Contributions bienvenues : reportez les bugs via Issues et proposez des améliorations via des Pull Requests.
- Forkez le dépôt
- Créez une branche feature/bugfix
- Faites vos modifications, testez localement
- Ouvrez une Pull Request décrivant les changements

Pensez à :
- Ajouter des commits atomiques et descriptifs
- Mettre à jour ce README si vous modifiez la structure ou les commandes

## Déploiement
- Le projet peut être déployé sur GitHub Pages, Vercel ou n'importe quel hébergeur de pages statiques.
https://le-gourmet-planification-des-r-serv.vercel.app/
- Exemple GitHub Pages : paramétrez la branche `main` ou `gh-pages` dans les settings du repo.

## Licence
Aucune licence présente par défaut dans ce dépôt. Si vous souhaitez partager le projet publiquement, ajoutez un fichier `LICENSE` (ex. MIT).

## Contact
Auteur : mouhsineRouaki  
GitHub : https://github.com/mouhsineRouaki

## Remarques finales
Ce README fournit une base professionnelle et complète pour documenter le mini-projet. Adaptez les sections "Installation", "Scripts" et "Tests" 
