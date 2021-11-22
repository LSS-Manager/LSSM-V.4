---
title: Paramètres ⚙️
lang: fr_FR
---

# Paramètres ⚙️

Les paramètres de tous les modules sont gérés de manière centralisée dans les paramètres. Seuls les paramètres des modules actifs peuvent être modifiés.

Il est prévu d'ajouter une possibilité d'exporter et d'importer les paramètres comme dans `LSSM V.3`.
En outre, nous aimerions offrir la possibilité de sauvegarder les paramètres liés au profil dans un avenir proche. Cela signifie que les paramètres ne sont plus liés aux appareils.

::: tip Modifications
Dès que vous quittez les paramètres et que vous avez sauvegardé les changements, le jeu se recharge pour appliquer facilement tous les paramètres.
Si vous avez des modifications non sauvegardées, vous ne pouvez pas fermer les paramètres, vous obtiendrez un petit message d'aide.
:::

::: danger Réinitialiser les paramètres
Attention : Si vous réinitialisez les paramètres, ils ne peuvent être restaurés sans exportation préalable !
:::


## Moment.js
Cette section fournit des informations sur la façon de configurer les paramètres de date et d'heure, par exemple dans le module [clock](modules/clock.md).

Nous utilisons [Moment.js](https://momentjs.com) pour offrir un large choix de configuration. Si vous souhaitez voir la documentation originale, vous pouvez la trouver [ici].(https://momentjscom.readthedocs.io/fr/latest/moment/04-displaying/01-format/).

### Éditeur en direct
Essayez votre propre format ici et voyez un aperçu en direct ! Voir les informations sur la configuration ci-dessous.
pour offrir un large choix de configuration. Si vous souhaitez voir l'original

<momentjs-preview/>

### Variables
<momentjs-variables/>

### Formes courtes
<momentjs-shorts/>

### Texte normal
Si vous voulez inclure un autre texte avec votre horloge, tel que `heure`, taper simplement `LTS heure` ne fonctionnera pas. Le résultat est "11:13:27 AM 11eure". Pour inclure du texte qui ne doit pas être formaté, entourez-le de `[]`. Si vous tapez `LTS [Heure]` ou `LTS [H]eure`, vous obtiendrez tous deux l'affichage de `11:13:27 AM Hour`.
