---
title: LSS-Manager V.4
lang: fr-FR
sidebarDepth: 2
---

# Wiki 🇫🇷 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[Statut du serveur LSSM][lssm.status]

[Statut du jeu en ligne](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## A propos de LSSM

LSS-MANAGER V.4 est une extension de [www.operateur112.fr][games.self] et de ses autres versions linguistiques.

Avec cette extension, une appstore est ajoutée au jeu, ce qui permet l'utilisation de plugins. Toutes les fonctions sont modulaires - vous pouvez décider de ce qui doit être activé, jusqu'au dernier module.

Les plugins qui ne sont pas activés ne seront pas non plus chargés - ce qui facilite évidemment l'administration et améliore les performances.


## Installation 📥
En utilisant LSSM, vous acceptez que nous recueillions des métadonnées. Vous trouverez de plus amples informations à ce sujet à l'adresse suivante [métadonnées][docs.metadata]

Un tableau avec les navigateurs compatibles avec LSSM se trouve dans notre site web. [FAQ](faq.md#dans-quels-navigateurs-lss-manager-fonctionne-t-il-)

::: tip Utiliser LSSM sur votre téléphone portable
Officiellement, nous ne prenons pas en charge une version mobile. Cependant, le navigateur Firefox offre la possibilité d'utiliser des modules complémentaires même dans sa version mobile. Néanmoins, nous ne garantissons pas un design attrayant ou une fonctionnalité complète pour les navigateurs mobiles.

Le support officiel des navigateurs mobiles n'est actuellement **pas** prévu.
:::

### Étape 1 : Tampermonkey
Si vous n'avez pas encore installé Tampermonkey dans votre navigateur, vous devez encore le faire. Voici un aperçu des liens pour les navigateurs les plus courants :

<tampermonkey-download-table/>

Pour les autres navigateurs, vous pouvez télécharger Tampermonkey sur [tampermonkey.net][tampermonkey].

::: warning Attention
Veuillez noter que nous ne prenons pas officiellement en charge les anciens navigateurs, les navigateurs mobiles et Apple Safari. La prise en charge de ces navigateurs n'est donc pas garantie.
:::

### Étape 2 : Userscript
Si Tampermonkey a été installé avec succès dans votre navigateur, vous pouvez soit cliquer sur [Ici][lssm.userscript] ou créer un nouveau userscript avec le contenu suivant :

@[code js](@userscript)

### Étape 3 : Activation
L'indicateur LSSM est un texte surligné en vert `LSSM V.4`.

Un clic sur l'indicateur ouvre un petit menu qui vous permet d'accéder à l'[Appstore][docs.appstore] et aux [paramètres][docs.settings]. Dans les paramètres, seuls les modules que vous avez activés apparaissent, vous devez donc d'abord visiter l'AppStore !

Si vous êtes dans operateur112 mais qur vous ne voyez pas l'indicateur dans le coin supérieur droit, cliquez sur l'icône tampermonkey dans votre navigateur et vérifiez si le commutateur pour le script LSS-Manager est réglé sur `on`.

Si vous avez des problèmes, vous pouvez toujours contacter le [Support][docs.support].

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