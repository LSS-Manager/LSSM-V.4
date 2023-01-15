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

*Nous nous sommes inspirés de l'article suivant : [How to use Tampermonkey on Firefox mobile](https://enux.pl/article/en/2021-03-14/how-use-tampermonkey-firefox-mobile)*.

1. Installer Firefox Nightly pour Android : [Google Play](https://play.google.com/store/apps/details?id=org.mozilla.fenix)
2. Dans Firefox Nightly, aller dans les paramètres, descendre jusqu'à "A propos de Firefox Nightly".
3. Cliquer 5 fois sur le logo Firefox. Il y a un petit message en bas qui indique l'activation du menu de débogage.
4. Retourner dans les paramètres. Dans la zone "Avancé", un point "Collection de modules complémentaires personnalisés" est apparu. En cliquant dessus, on peut entrer un ID utilisateur et un nom de collection. Nous nous sommes donné la peine de rassembler dans une collection tous les modules complémentaires disponibles par défaut dans Firefox Nightly pour Android, ainsi que Tampermonkey : [https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/](https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/)
5. Indiquez `16048019` sous "ID utilisateur" et `Tampermonkey` sous "Nom de la collection". Bien entendu, chacun est libre d'utiliser d'autres collections ou de créer les siennes. Malheureusement, il ne semble pas y avoir de "collection" officielle où l'on puisse simplement naviguer à travers les collections. De plus, les add-ons standard ne sont disponibles que s'ils sont dans la collection (comme dans la collection liée ci-dessus).

Néanmoins, nous attirons encore une fois explicitement votre attention sur le fait que LSSM n'est pas conçu pour les terminaux mobiles et que notre support est donc très limité, voire inexistant.

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