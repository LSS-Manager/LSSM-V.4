On fait et refait beaucoup d'actions.
Pour éviter les clics de souris, ce module permet de configurer des touches de raccourci.
Celles-ci te permettent d'effectuer certaines actions sans utiliser la souris.

Tu peux déterminer librement quelles combinaisons de touches doivent être utilisées.

::: warning Combinaisons prédéfinies
Tous les navigateurs ont déjà intégré des touches de raccourci pour leurs propres fonctionnalités. (par ex. `Ctrl+S` pour enregistrer une page ou `Ctrl+O` pour ouvrir un fichier).
Actuellement, nous n'écrasons **PAS** ces touches de raccourci standard !
Si tu définis une fonctionnalité LSSM sur `Ctrl+O`, le dialogue "Ouvrir fichier" de ton navigateur s'ouvrira également.
La raison en est la structure de notre reconnaissance des hotkeys.
:::

Tu peux utiliser comme touche de raccourci soit une seule lettre (par ex. `U` ou `P`), une combinaison de touches (par ex. `Alt+U` ou `Ctrl+Alt+P`) ou plusieurs de ces lettres à la suite (par ex. `U P`, `Alt+U P` ou `Ctrl+Alt+U P Alt+U`).
Les majuscules et les minuscules ne sont pas prises en compte !

Pour définir une touche de raccourci, il te suffit d'aller dans les paramètres à la rubrique "Touches de raccourci".
Tu as alors la possibilité de définir une action (voir les actions possibles ci-dessous) et une touche de raccourci en cliquant sur `+`.

Pour définir une touche de raccourci, il te suffit de cliquer sur le champ de saisie dans la zone de droite.
Appuie sur la combinaison de touches ou la séquence de touches que tu souhaites.
La combinaison de touches apparaît dans le champ de saisie 0,5 seconde après que tu aies relâché la dernière touche.

![paramètres des touches de raccourci](settings.png)

Avec la touche `F1`, tu peux à tout moment afficher un aperçu rapide des touches de raccourci que tu as définies :

![Aperçu des touches de raccourci](overview.png)


Les actions disponibles jusqu'à présent sont listées ci-dessous.
N'hésite pas à nous faire part d'autres propositions sur le [Forum](https://forum.leitstellenspiel.de/index.php?thread/19176-lss-manager-v-4/), sur notre <discord/> ou dans le <a :href="$themeConfig.variables.github + '/issues/15'" target="_blank">GitHub Issue #15</a>.
Vérifie d'abord dans le GitHub Issue si ta demande a déjà été notée, afin d'éviter les doublons.

## Généralités

Ces touches de raccourci sont disponibles dans tout le jeu.
Lorsqu'elles ouvrent des pages, celles-ci s'ouvrent toujours dans une lightbox (c'est-à-dire une sorte de popup ingame).
Ainsi, tu n'as pas à craindre que l'affichage actuel soit endommagé.

* Ouvrir le protocole du centre de contrôle

### Crédits

* Ouvrir le journal
* Ouvrir le résumé de la journée
* Ouvrir le résumé des derniers jours

### Profil

* Ouvrir son propre profil
* Ouvrir les notes
* Ouvrir la page de niveau
* Ouvrir ses propres récompenses

### Alliance

* Ouvrir la page d'accueil de l'alliance
* Ouvrir la liste des membres
* Ouvrir les messages
* Ouvrir le forum
* Ouvrir la page de la banque de l'alliance
* Ouvrir l'aperçu des bâtiments de l'alliance
* Ouvrir l'aperçu des formations actuels
* Ouvrir la liste des candidatures actuelles
* Ouvrir les nouvelles de l'alliance
* Ouvrir le journal de l'alliance

### Tâches

* Ouvrir la liste des tâches actuelles

## Fenêtre principale

Ces touches de raccourci ne sont disponibles que dans la fenêtre principale (là où sont affichés la carte, la liste des missions, l'alliance, etc.

### Chat

* Focaliser le champ de saisie du chat

### LSSM

* Ouvrir et fermer le menu LSSM
  * A l'état ouvert, tu peux naviguer dans les entrées du menu avec les touches fléchées `↑` et `↓`.
  * Avec la touche Entrée `Enter`, tu cliques sur l'entrée sélectionnée.

### Carte

* Focaliser la recherche de lieu

### Liste des interventions

* Focaliser le champ de recherche
