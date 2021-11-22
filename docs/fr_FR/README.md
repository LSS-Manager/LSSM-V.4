---
title: LSS-Manager V.4
lang: fr_FR
sidebarDepth: 2
---

# Wiki 🇫🇷 <Badge :text="'v' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>



[Statut du jeu en ligne](https://stats.uptimerobot.com/OEKDJSpmvK)

## A propos de LSSM

LSS-MANAGER V.4 est une extension de [www.operateur112.fr](https://www.operateur112.fr) et de ses autres versions linguistiques.

Avec cette extension, une appstore est ajoutée au jeu, ce qui permet l'utilisation de plugins. Toutes les fonctions sont modulaires - vous pouvez décider de ce qui doit être activé, jusqu'au dernier module.

Les plugins qui ne sont pas activés ne seront pas non plus chargés - ce qui facilite évidemment l'administration et améliore les performances.


## Installation 📥
En utilisant LSSM, vous acceptez que nous recueillions des métadonnées. Vous trouverez de plus amples informations à ce sujet à l'adresse suivante [métadonnées](metadata.md)

Un tableau avec les navigateurs compatibles avec LSSM se trouve dans notre site web. [FAQ](faq.md#dans-quels-navigateurs-lss-manager-fonctionne-t-il-)

::: tip Utiliser LSSM sur votre téléphone portable
Officiellement, nous ne prenons pas en charge une version mobile. Cependant, le navigateur Firefox offre la possibilité d'utiliser des modules complémentaires même dans sa version mobile. Néanmoins, nous ne garantissons pas un design attrayant ou une fonctionnalité complète pour les navigateurs mobiles.

Le support officiel des navigateurs mobiles n'est actuellement **pas** prévu.
:::

### Étape 1 : Tampermonkey
Si vous n'avez pas encore installé Tampermonkey dans votre navigateur, vous devez encore le faire. Voici un aperçu des liens pour les navigateurs les plus courants :

<tampermonkey-download-table/>

Pour les autres navigateurs, vous pouvez télécharger Tampermonkey sur [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Veuillez noter que nous ne prenons pas officiellement en charge les anciens navigateurs, les navigateurs mobiles et Microsoft Edge ou Internet Explorer. La prise en charge de ces navigateurs n'est donc pas garantie.
:::

### Étape 2 : Userscript
Si Tampermonkey a été installé avec succès dans votre navigateur, vous pouvez soit cliquer sur <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">Ici</a> ou créer un nouveau userscript avec le contenu suivant :

<<< ./dist/static/lssm-v4.user.js

### Étape 3 : Activation
L'indicateur LSSM est un texte surligné en vert `LSSM V.4`.
Si vous êtes dans operateur112 mais qur vous ne voyez pas l'indicateur dans le coin supérieur droit, cliquez sur l'icône tampermonkey dans votre navigateur et vérifiez si le commutateur pour le script LSS-Manager est réglé sur `on`.

Si vous avez des problèmes, vous pouvez toujours contacter le [Support](support.md).
