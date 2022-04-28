---
titre: FAQ ❓
lang: fr_FR
sidebarDepth: 3
---

# FAQ ❓

## Combien coûte LSS-Manager ?
LSS-Manager est une offre gratuite - nous n'avons pas l'intention de changer cela.
Même s'il apporte certainement une valeur ajoutée, il n'y a pas de TVA sur ce produit :wink:

:::warning Dons
Il y a quelques utilisateurs sympathiques qui aimeraient nous donner de l'argent. Mais : LSS-Manager est et restera gratuit. Aussi, nous n'accepterons aucun don pour ce projet.

Ceci pour plusieurs raisons :

* Ce projet est développé sur une base volontaire pendant le temps libre des développeurs participants.
* Une variante d'abonnement, similaire à la prime dans le jeu, mettrait trop de pression sur nous personnellement pour continuer à programmer au-delà de notre désir.
* Pour des raisons légales, nous ne pouvons pas accepter de dons :
    * Si nous fondions une société pour LSS Manager afin de pouvoir recevoir des dons, cela n'aurait aucun avenir, car une société sans frais ne peut être une société.
    * Si nous faisions fonctionner les serveurs, qui font actuellement tourner LSS Manager, par le biais d'une société, ils absorberaient immédiatement les revenus.

Par conséquent, en dehors de l'idée de volontariat, cela n'a aucun sens pour nous de prendre de l'argent pour le LSS-Manager.
:::

## Comment puis-je contribuer à LSS Manager ?
L'utilisateur "normal" peut [Signaler les bugs][error] ou [faire des suggestions][suggestions].

Nous sommes actuellement en train de concevoir un guide de style pour les développeurs, afin qu'eux aussi puissent facilement ajouter leurs propres plugins à LSSM. Nous avons également essayé de garder notre structure de code claire et compréhensible. Cependant, ajouter un plugin n'implique en aucun cas de rejoindre l'équipe.

## Comment puis-je signaler des bugs ?
Veuillez consulter notre page [Signaler les bugs][error].

## Où puis-je obtenir de l'aide ?
Par le biais de notre support. Vous pouvez trouver plus d'informations [ici][support].

## Comment puis-je soumettre des idées ?
Sur la page [suggestions][suggestions], nous avons rassemblé quelques informations à ce sujet.

## Pourquoi mes paramètres et les modules complémentaires activés ne sont-ils pas enregistrés ?
Cela n'arrive que si la `Base de données indexée` est vidée dans ton navigateur. Tu peux modifier cela quelque part dans les paramètres du navigateur (c'est souvent la même chose que les paramètres des cookies).

## Dans quels navigateurs LSS Manager fonctionne-t-il ?
Seuls les navigateurs de bureau sont répertoriés ici, les navigateurs mobiles n'étant pas officiellement pris en charge.

Comme nous voulons conserver les dernières normes de codage, un navigateur moderne et à jour est nécessaire et recommandé - ne serait-ce que pour des raisons de sécurité, même en dehors du jeu.

<browser-support-table/>

:::danger Internet Explorer et Safari
Ces deux navigateurs peuvent être décrits comme les "nid à problèmes" du développeur web moderne. Certaines fonctions ne fonctionnent pas dans ces navigateurs ou nécessitent du code supplémentaire.

Nous ne voyons pas l'intérêt de faire cela partout et ne supportons officiellement **pas** ces deux navigateurs.
:::

### Utiliser LSSM sur un téléphone portable
Nous recevons régulièrement des demandes pour savoir si LSSM peut être utilisé sur un téléphone portable.

La réponse est oui - de manière détournée - mais nous ne proposons pas de support pour cela. L'activation se fait à vos risques et périls.

Comment cela fonctionne-t-il ?

*Nous nous sommes inspirés de l'article suivant : [How to use Tampermonkey on Firefox mobile](https://enux.pl/article/en/2021-03-14/how-use-tampermonkey-firefox-mobile)*.

1. installer Firefox Nightly pour Android : [Google Play](https://play.google.com/store/apps/details?id=org.mozilla.fenix)
2. Dans Firefox Nightly, aller dans les paramètres, descendre jusqu'à "A propos de Firefox Nightly".
3. Cliquer 5 fois sur le logo Firefox. Il y a un petit message en bas qui indique l'activation du menu de débogage.
4. Retourner dans les paramètres. Dans la zone "Avancé", un point "Collection de modules complémentaires personnalisés" est apparu. En cliquant dessus, on peut entrer un ID utilisateur et un nom de collection. Nous nous sommes donné la peine de rassembler dans une collection tous les modules complémentaires disponibles par défaut dans Firefox Nightly pour Android, ainsi que Tampermonkey : [https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/](https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/)
5. indiquez `16048019` sous "ID utilisateur" et `Tampermonkey` sous "Nom de la collection". Bien entendu, chacun est libre d'utiliser d'autres collections ou de créer les siennes. Malheureusement, il ne semble pas y avoir de "collection" officielle où l'on puisse simplement naviguer à travers les collections. De plus, les add-ons standard ne sont disponibles que s'ils sont dans la collection (comme dans la collection liée ci-dessus).

Néanmoins, nous attirons encore une fois explicitement votre attention sur le fait que LSSM n'est pas conçu pour les terminaux mobiles et que notre support est donc très limité, voire inexistant.


## Je souhaite partager ma configuration avec des amis ou l'utiliser sur plusieurs appareils. Est-ce possible ?
Oui, c'est possible. Pour cela, il te suffit de cliquer dans les [paramètres][settings] sur `Export` pour télécharger un fichier et `Import` pour importer les paramètres depuis un fichier.

## Existe-t-il un moyen d'enregistrer les paramètres liés au compte afin de ne pas avoir à les importer sur un autre appareil ?
Actuellement, nous ne proposons pas cette possibilité, mais une implémentation de cette fonctionnalité est prévue.

## Comment puis-je savoir si les serveurs de l'ONSSM sont en ligne ? 
<!--Le mieux est de le consulter ici : [https://status.lss-manager.de/](https://status.lss-manager.de/) -->

Ou dans le <discord-channel channel="uptime"/> sur notre <discord/>. 

[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
[settings]: settings.md
