---
title: Paramètres ⚙️
lang: fr_FR
---

# Paramètres ⚙️

Les paramètres de tous les modules sont gérés de manière centralisée dans les paramètres. Seuls les paramètres des modules actifs peuvent être modifiés.

Grâce aux boutons `Export` et `Import`, tu peux sauvegarder tes réglages dans un fichier et / ou les transmettre à tes amis.
Dans un avenir proche, nous souhaitons offrir la possibilité de sauvegarder des paramètres liés à un profil. Ainsi, les paramètres ne seront plus liés à un appareil.

:::tip Modifications
Dès que vous quittez les paramètres et que vous avez sauvegardé les changements, le jeu se recharge pour appliquer facilement tous les paramètres.
Si vous avez des modifications non sauvegardées, vous ne pouvez pas fermer les paramètres, vous obtiendrez un petit message d'aide.
:::

:::danger Réinitialiser les paramètres
Attention : Si vous réinitialisez les paramètres, ils ne peuvent être restaurés sans exportation préalable !
:::

## Paramètres généraux

### Label au lieu de l'icône dans le menu
Par défaut, le logo de LSSM est affiché dans la barre de navigation comme en-tête du menu. Certains utilisateurs préfèrent cependant l'utilisation d'un simple texte sur fond vert. C'est pourquoi il est possible de l'activer avec ce paramètre.

### Autoriser la télémétrie
Cela vous permet de déterminer si LSSM peut envoyer des [métadonnées](metadata.md) ou non.

### Fond de l'icône LSSM
Ce paramètre détermine la couleur de fond de l'icône ou de l'étiquette LSSM.

### Colorer la barre de navigation
Vous souhaitez que la couleur de [`Fond de l'icône LSSM`](#Fond-de-l-icône-LSSM) soit la couleur de toutes les barres de navigation ? C'est très facile avec ce paramètre !

### Infobulles sombres sur la carte
Si tu as activé le design sombre, les infobulles (noms de véhicules/d'interventions, etc.) sont tout de même claires. Cette fonction permet de corriger facilement ce problème afin que les infobulles soient également sombres.

### Menu V3 comme sous-menu
Si l'on a beaucoup de scripts actifs, la barre de navigation du jeu devient vite très chargée. Avec ce réglage, le menu du LSSM V.3 est déplacé dans le menu de la V4 :

![Menu V3 comme sous-menu](/img/fr_FR/v3submenu.png)

## Moment.js
Cette section fournit des informations sur la façon de configurer les paramètres de date et d'heure, par exemple dans le module [clock](modules/clock.md).

Nous utilisons [Moment.js](https://momentjs.com) pour offrir un large choix de configuration. Si vous souhaitez voir la documentation originale, vous pouvez la trouver [ici](https://momentjscom.readthedocs.io/fr/latest/moment/04-displaying/01-format/).

### Éditeur en direct
Essayez votre propre format ici et voyez un aperçu en direct ! Voir les informations sur la configuration ci-dessous.
pour offrir un large choix de configuration. Si vous souhaitez voir l'original

<momentjs-preview/>

### Variables
<momentjs-variables/>

### Formes courtes
<momentjs-shorts/>

### Texte normal
Si vous voulez inclure un autre texte avec votre horloge, tel que `heure`, taper simplement `LTS heure` ne fonctionnera pas. Le résultat est "11:13:27 AM 11eure".
Pour inclure du texte qui ne doit pas être formaté, entourez-le de `[]`. Si vous tapez `LTS [heure]` ou `LTS [h]eure`, vous obtiendrez tous deux l'affichage de `11:13:27 AM heure`.
