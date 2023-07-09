---
titre: FAQ ❓
lang: fr_FR
sidebarDepth: 3
---

# FAQ ❓

## Combien coûte LSS-Manager ?
LSS-Manager est une offre gratuite - nous n'avons pas l'intention de changer cela.
Même s'il apporte certainement une valeur ajoutée, il n'y a pas de TVA sur ce produit :wink:

Vous souhaitez quand même nous soutenir financièrement ? Alors vous pouvez nous envoyer un don via [OpenCollective][lssm.donations]. Nous sommes heureux de tout soutien !

:::warning Dons
Tous les dons seront uniquement utilisés pour couvrir nos frais de fonctionnement. Nous n'avons pas l'intention de faire des bénéfices et nous ne les distribuerons pas.

Les dons n'ont aucune influence directe sur le développement de LSSM ! Nous n'investirons pas plus ou moins de temps et il n'y aura pas d'avantages directs pour les utilisateurs tels que des fonctionnalités premium. Le développement de LSSM se fera sur une base volontaire, pendant notre temps libre, et l'utilisation restera entièrement gratuite pour tous les utilisateurs !

Bien sûr, nous sommes heureux de tout don, mais nous tenons à souligner que nous aimerions continuer à faire fonctionner le projet comme avant, même sans les dons.
:::

## Comment puis-je contribuer à LSS Manager ?
L'utilisateur "normal" peut [Signaler les bugs][docs.error_report] ou [faire des suggestions][docs.suggestions].

Nous sommes actuellement en train de concevoir un guide de style pour les développeurs, afin qu'eux aussi puissent facilement ajouter leurs propres plugins à LSSM. Nous avons également essayé de garder notre structure de code claire et compréhensible. Cependant, ajouter un plugin n'implique en aucun cas de rejoindre l'équipe.

## Comment puis-je signaler des bugs ?
Veuillez consulter notre page [Signaler les bugs][docs.error_report].

## Où puis-je obtenir de l'aide ?
Par le biais de notre support. Vous pouvez trouver plus d'informations [ici][docs.support].

## Comment puis-je soumettre des idées ?
Sur la page [suggestions][docs.suggestions], nous avons rassemblé quelques informations à ce sujet.

## Pourquoi mes paramètres et les modules complémentaires activés ne sont-ils pas enregistrés ?
Cela n'arrive que si la `Base de données indexée` est vidée dans ton navigateur. Tu peux modifier cela quelque part dans les paramètres du navigateur (c'est souvent la même chose que les paramètres des cookies).

## Dans quels navigateurs LSS Manager fonctionne-t-il ?
Seuls les navigateurs de bureau sont répertoriés ici, les navigateurs mobiles n'étant pas officiellement pris en charge.

Comme nous voulons conserver les dernières normes de codage, un navigateur moderne et à jour est nécessaire et recommandé - ne serait-ce que pour des raisons de sécurité, même en dehors du jeu.

<browser-support-table/>

:::danger Safari
Ce navigateur peut être décrit comme un "nid à problème" du développeur web moderne. Certaines fonctions ne fonctionnent pas dans ce navigateur ou nécessitent du code supplémentaire.

Nous ne voyons pas l'intérêt de modifier cela partout et ne supportons officiellement **pas** ce navigateur.
:::

### Utiliser LSSM sur un téléphone portable
Nous recevons régulièrement des demandes pour savoir si LSSM peut être utilisé sur un téléphone portable.

La réponse est oui - de manière détournée - mais nous ne proposons pas de support pour cela. L'activation se fait à vos risques et périls.

Comment cela fonctionne-t-il ?

1. Installer Firefox pour Android (au moins la version 110).
2. Lancer Firefox et ouvrez le menu contextuel (trois points dans la barre de menu).
3. Sous "Modules complementaires", Tampermonkey devrait maintenant être propposer.
4. Continuer avec les [instructions d'installation][docs.home] normales.

## Je souhaite partager ma configuration avec des amis ou l'utiliser sur plusieurs appareils. Est-ce possible ?
Oui, c'est possible. Pour cela, il te suffit de cliquer dans les [paramètres][docs.settings] sur `Export` pour télécharger un fichier et `Import` pour importer les paramètres depuis un fichier.

## Existe-t-il un moyen d'enregistrer les paramètres liés au compte afin de ne pas avoir à les importer sur un autre appareil ?
Actuellement, nous ne proposons pas cette possibilité, mais une implémentation de cette fonctionnalité est prévue.

## Comment puis-je savoir si les serveurs de l'LSSM sont en ligne ?
Le mieux est de le consulter ici : [https://status.lss-manager.de/](https://status.lss-manager.de/)

Ou dans sur <discord-channel channel="uptime"/> sur notre <discord/>.

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