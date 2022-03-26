---
title: LSS-Manager V.4
lang: fr-FR
sidebarDepth: 2
---

# Wiki 🇫🇷 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: <i>{{ $theme.variables.versions.stable }}</i>
> 
> beta: <i>{{ $theme.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[Statut du jeu en ligne](https://stats.uptimerobot.com/OEKDJSpmvK)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

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

::: warning Attention
Veuillez noter que nous ne prenons pas officiellement en charge les anciens navigateurs, les navigateurs mobiles et Microsoft Edge ou Internet Explorer. La prise en charge de ces navigateurs n'est donc pas garantie.
:::

### Étape 2 : Userscript
Si Tampermonkey a été installé avec succès dans votre navigateur, vous pouvez soit cliquer sur <a :href="$theme.variables.server + 'lssm-v4.user.js'" target="_blank">Ici</a> ou créer un nouveau userscript avec le contenu suivant :

@[code js](@userscript)

### Étape 3 : Activation
L'indicateur LSSM est un texte surligné en vert `LSSM V.4`.

Un clic sur l'indicateur ouvre un petit menu qui vous permet d'accéder à l'[Appstore](appstore.md) et aux [paramètres](settings.md). Dans les paramètres, seuls les modules que vous avez activés apparaissent, vous devez donc d'abord visiter l'AppStore !

Si vous êtes dans operateur112 mais qur vous ne voyez pas l'indicateur dans le coin supérieur droit, cliquez sur l'icône tampermonkey dans votre navigateur et vérifiez si le commutateur pour le script LSS-Manager est réglé sur `on`.

Si vous avez des problèmes, vous pouvez toujours contacter le [Support](support.md).
