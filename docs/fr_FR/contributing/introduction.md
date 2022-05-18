---
title: Introduction
lang: fr_FR
sidebarDepth: 2
---

# Introduction
Il existe un dicton allemand "Viele Wege führen nach Rom" (Tous les chemins mènent à Rome), ce qui signifie qu'il y a plusieurs façons de faire un travail. Ceci est particulièrement vrai pour git et son écosystème. Il y a un milliard de façons d'accomplir le résultat, mais nous allons nous en tenir à la plus simple.

## Glossaire

| Langue de git  | Reste du monde                                                                                                 |
|----------------|----------------------------------------------------------------------------------------------------------------|
| Repository     | Fondamentalement, un dossier où tous les fichiers sont stockés. Il peut faire quelques trucs intéressants.     |
| Commit         | Point où vous avez sauvegardé le projet. Il est possible de revenir à ce point à chaque fois.                  |
| Branch         | Partie individuelle du développement. Cela n'affectera pas les autres branches (par exemple dev et master).    |
| Fork           | Une copie de l'ensemble du Repository pour votre propre développement/personnalisation.                        |

## Requirements
Configuration requise
Vous aurez besoin :
1. Un ordinateur portable/PC
2. Un compte sur GitHub
    -  [Tutoriel](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)

## Configuration 
Pour des raisons de sécurité, et pour se rappeler que chaque utilisateur de la version bêta obtiendra la dernière version de la branche dev, seules quelques personnes sont autorisées à livrer leurs modifications directement dans les branches. Tous les autres doivent créer une Pull Request pour que leurs modifications soient fusionnées dans la branche dev. Pour ce faire, nous devons créer un fork pour copier le dépôt.
![](../images/contributing/introduction/GH_fork.png)

Vous pouvez laisser tout en l'état et cliquer sur "Create fork". Cela peut prendre quelques secondes.

![](../images/contributing/introduction/GH_fork_settings.png)

Maintenant, nous devons nous assurer d'être à jour avec le dépôt d'origine. Si vous avez votre fork depuis longtemps, appuyez sur le bouton "fetch upstream" de temps en temps, surtout si GH vous dit de le faire. Assurez-vous également d'être sur la branche `dev`. Sinon, vous pouvez manquer les derniers changements (et peut-être les traductions qui ont déjà été faites).Maintenant, nous devons nous assurer d'être à jour avec le dépôt d'origine. Si vous avez votre fork depuis longtemps, appuyez sur le bouton "fetch upstream" de temps en temps, surtout si GH vous dit de le faire. Assurez-vous également d'être sur la branche `dev`. Sinon, vous pouvez manquer les derniers changements (et peut-être les traductions qui ont déjà été faites).

:::tip Quelles sont les prochaines étapes ?
* Lire [Comment "Commit" d'un fichier](./committing.md)
* Lire [Comment Création d'un "Pull Request"](./prs.md)
* Lire l'une des sections spéciales pour les sujets de contribution

:::
