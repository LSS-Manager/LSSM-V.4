On fait et refait beaucoup d'actions.
Pour éviter les clics de souris, ce module permet de configurer des touches de raccourci.
Celles-ci te permettent d'effectuer certaines actions sans utiliser la souris.

Vous pouvez déterminer librement quelles combinaisons de touches doivent être utilisées.

::: warning Combinaisons prédéfinies
Tous les navigateurs ont déjà intégré des touches de raccourci pour leurs propres fonctionnalités.
(par ex. `Ctrl+S` pour enregistrer une page ou `Ctrl+O` pour ouvrir un fichier).
Actuellement, nous n'écrasons **PAS** ces touches de raccourci standard !
Si vous définissez une fonctionnalité LSSM sur `Ctrl+O`, le dialogue "Ouvrir fichier" de ton navigateur s'ouvrira également.
La raison en est la structure de notre reconnaissance des hotkeys.
:::

Vous pouvez utiliser comme touche de raccourci soit une seule lettre (par ex. `U` ou `P`), une combinaison de touches
(par ex. `Alt+U` ou `Ctrl+Alt+P`) ou plusieurs de ces lettres à la suite (par ex. `U P`, `Alt+U P` ou `Ctrl+Alt+U P Alt+U`).
Les majuscules et les minuscules ne sont pas prises en compte !

Pour définir une touche de raccourci, il te suffit d'aller dans les paramètres à la rubrique "Touches de raccourci".
Vous avez alors la possibilité de définir une action (voir les actions possibles ci-dessous)
et une touche de raccourci en cliquant sur `+`.

Pour définir une touche de raccourci, il te suffit de cliquer sur le champ de saisie dans la zone de droite.
Appuie sur la combinaison de touches ou la séquence de touches que vous souhaitez.
La combinaison de touches apparaît dans le champ de saisie 0,5 seconde après que vous ayez relâché la dernière touche.

![paramètres des touches de raccourci](./settings.png)

Avec la touche `F1`,
vous pouvez à tout moment afficher un aperçu rapide des touches de raccourci que vous avez définies :

![Aperçu des touches de raccourci](./overview.png)

Les actions disponibles jusqu'à présent sont listées ci-dessous.
N'hésite pas à nous faire part d'autres propositions sur le
[Forum](https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/), sur notre <discord/> ou dans le
<a :href="$theme.variables.github + '/issues/15'" target="_blank">GitHub Issue #15</a>.
Vérifie d'abord dans le GitHub Issue si ta demande a déjà été notée, afin d'éviter les doublons.

## Général

Ces touches de raccourci sont disponibles dans tout le jeu.
Lorsqu'elles ouvrent des pages, celles-ci s'ouvrent toujours dans une lightbox (c'est-à-dire une sorte de popup ingame).
Ainsi, vous n'avez pas à craindre que l'affichage actuel soit endommagé.

* Ouvrir le journal des gestions des appelles

### Alliance

* Ouvrir la liste des candidatures actuelles
* Ouvrir la bue d'ensemble des bâtiments
* Ouvrir le mur
* Ouvrir la banque de l'alliance
* Ouvrir le journal de modération
* Ouvrir la liste des membres
* Ouvrir les messages
* Ouvrir la liste des membres (Afficher les joueurs en ligne uniquement)
* Ouvrir une page d'alliance
* Ouvrir la page de formation

### Crédits

* Ouvrir le résumé quotidien
* Ouvrir les logs
* Ouvrir l'aperçu des 7 derniers jours

### Profil

* Ouvrir la liste des récompenses
* Ouvrir la liste des niveaux
* Ouvrir les notes
* Ouvrir son profil personnel

### Tâches et événements

*Ouvrir la liste des Tâches et événements

## Bâtiments

### Ouvrir

* Centre de Traitement des Appels
* Élargir
* Ouvrir le premier véhicule
* Recruter de nouveaux personnels
* Bâtiments Suivant
* Vue d'ensemble du personnel
* Bâtiments Précédent

### Centre de Traitement des Appels

* Onglet "Bâtiments"
* Onglet "Extensions"
* Onglet Suivant
* Ouverture de la première mission
* Onglet "Trajet de patrouille"
* Onglet "Véhicules de patrouille"
* Onglet "Extensions"
* Onglet "Évenements programmés"
* Onglet Précédent
* Onglet "Journal"
* Onglet "Paramètres"
* Onglet "Statistiques"
* Onglet "Véhicules"

### Partage des bâtiments

* Désactiver le partage
* Activer le partage
* Changer le mode de partage

## Fenêtre principale

Ces touches de raccourci ne sont disponibles que dans la fenêtre principale
(là où sont affichés la carte, la liste des missions, l'alliance, etc.

### Chat

* Cocus sur le champ de saisie

### LSSM

* Ouvrir et fermer le menu LSSM
    * A l'état ouvert, vous pouvez naviguer dans les entrées du menu avec les touches fléchées `↑` et `↓`.
    * Avec la touche Entrée `Enter`, vous cliquez sur l'entrée sélectionnée.

### Map

* Déplacer
    * En bas
    * À gauche
    * À droite
    * En haut
* Recherche de lieu
    * Focus sur le champ de saisie
* Zoomer
* Dézoomer

### Liste des Missions

* Ouvrir le tri des missions
    * Ouvrir le menu de sélection
* Recherche
    * Focus dans le champ de saisie

## Fenêtre des missions

### Alliance

* Focus de la fenêtre de réponse de l'alliance
* Alter 'Poster dans le chat de l'alliance'

### RAI

* Onglet Suivant
* Onglet Précédent

### signal de retour

* Annuler l'approche
* Signal de retour pour tous les véhicules
* Signal de retour uniquement pour les ambulances

### Mission triées

Ces touches de raccourci sont là pour les boutons modifiés du tri des interventions dans le module
[Liste de mission étendue](../extendedCallList/#trier-les-missions) :

* Déployer et allez à la mission suivante
* Déployer, partager et allez à la mission suivante
* Mission Suivante
* Mission Précédente

### Liste des véhicules

* Chargement des véhicules manquants
* Onglet Suivant
* Onglet Précédent
