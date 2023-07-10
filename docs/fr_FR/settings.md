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

### Titre au lieu d'une icone dans le menu
Par défaut, le logo de LSSM est affiché dans la barre de navigation comme en-tête du menu. Certains utilisateurs préfèrent cependant l'utilisation d'un simple texte sur fond vert. C'est pourquoi il est possible de l'activer avec ce paramètre.

### Autoriser la télémétrie
Cela vous permet de déterminer si LSSM peut envoyer des [métadonnées][docs.metadata] ou non.

### Couleur de fond de l'icône LSSM
Ce paramètre détermine la couleur de fond de l'icône ou de l'étiquette LSSM.

### Colorier la barre de navigation
Vous souhaitez que la couleur de [`Fond de l'icône LSSM`](#Fond-de-l-icône-LSSM) soit la couleur de toutes les barres de navigation ? C'est très facile avec ce paramètre !

### Infobulles foncées sur la carte
Si tu as activé le design sombre, les infobulles (noms de véhicules/d'interventions, etc.) sont tout de même claires. Cette fonction permet de corriger facilement ce problème afin que les infobulles soient également sombres.

### Boutons sombres sur la carte 
Si tu as activé le design sombre, les boutons sont tout de même claires. Cette fonction permet de corriger facilement ce problème afin que les boutons soient également sombres.

### Menu V3 comme sous-menu
Si l'on a beaucoup de scripts actifs, la barre de navigation du jeu devient vite très chargée. Avec ce réglage, le menu du LSSM V.3 est déplacé dans le menu de la V4 :

![Menu V3 comme sous-menu](/img/fr_FR/v3submenu.png)

### Afficher la progression du chargement
Affiche un icone de chargement dans le coins inférieur droite.

### Debug-Mode  
Un petit mode de débogage qui affiche des conseils utiles dans la console du navigateur. Son activation n'est recommandée que si elle est demandée par l'équipe LSSM, car la console contiendra de nombreux messages.

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

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /fr_FR/
[docs.apps]: /fr_FR/apps.md
[docs.appstore]: /fr_FR/appstore.md
[docs.bugs]: /fr_FR/bugs.md
[docs.error_report]: /fr_FR/error_report.md
[docs.faq]: /fr_FR/faq.md
[docs.metadata]: /fr_FR/metadata.md
[docs.other]: /fr_FR/other.md
[docs.settings]: /fr_FR/settings.md
[docs.suggestions]: /fr_FR/suggestions.md
[docs.support]: /fr_FR/support.md
[games.self]: https://operateur112.fr
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug