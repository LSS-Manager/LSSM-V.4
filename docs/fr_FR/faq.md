---
titre: FAQ ❓
lang: fr_FR
sidebarDepth: 3
---

# FAQ ❓

### Combien coûte LSS-Manager ?
LSS-Manager est une offre gratuite - nous n'avons pas l'intention de changer cela.

::: warning Dons
Il y a quelques utilisateurs sympathiques qui aimeraient nous donner de l'argent. Mais : LSS-Manager est et restera gratuit. Aussi, nous n'accepterons aucun don pour ce projet.

Ceci pour plusieurs raisons :

* Ce projet est développé sur une base volontaire pendant le temps libre des développeurs participants.
* Une variante d'abonnement, similaire à la prime dans le jeu, mettrait trop de pression sur nous personnellement pour continuer à programmer au-delà de notre désir.
* Pour des raisons légales, nous ne pouvons pas accepter de dons :
    * Si nous fondions une société pour LSS Manager afin de pouvoir recevoir des dons, cela n'aurait aucun avenir, car une société sans frais ne peut être une société.
    * Si nous faisions fonctionner les serveurs, qui font actuellement tourner LSS Manager, par le biais d'une société, ils absorberaient immédiatement les revenus.

Par conséquent, en dehors de l'idée de volontariat, cela n'a aucun sens pour nous de prendre de l'argent pour le LSS-Manager.
:::

#### Comment puis-je contribuer à LSS Manager ?
L'utilisateur "normal" peut [Signaler les bugs][error] ou [faire des suggestions][suggestions].

Nous sommes actuellement en train de concevoir un guide de style pour les développeurs, afin qu'eux aussi puissent facilement ajouter leurs propres plugins à LSSM. Nous avons également essayé de garder notre structure de code claire et compréhensible. Cependant, ajouter un plugin n'implique en aucun cas de rejoindre l'équipe.

### Comment puis-je signaler des bugs ?
Veuillez consulter notre page [Signaler les bugs][error].

### Où puis-je obtenir de l'aide ?
Par le biais de notre support. Vous pouvez trouver plus d'informations [ici][support].

### Comment puis-je soumettre des idées ?
Sur la page [suggestions][suggestions], nous avons rassemblé quelques informations à ce sujet.

### Dans quels navigateurs LSS Manager fonctionne-t-il ?
Seuls les navigateurs de bureau sont répertoriés ici, les navigateurs mobiles n'étant pas officiellement pris en charge.
Ce tableau n'est pas nécessairement correct pour le moment et sera mis à jour lorsque de nouvelles informations seront disponibles !

Comme nous voulons conserver les dernières normes de codage, un navigateur moderne et à jour est nécessaire et recommandé - ne serait-ce que pour des raisons de sécurité, même en dehors du jeu.

::: warning Compatibilité
Une compatibilité répertoriée ici ne garantit pas la bonne fonctionnalité. Il s'agit uniquement d'informations recueillies et évaluées par des tiers.
:::

<table>
<thead>
    <tr>
        <th>Navigateur</th>
        <th>Version min.</th>
        <th>Téléchargé</th>
    </tr>
</thead>
<tbody>
    <tr v-for="({supported, download}, browser) in $themeConfig.variables.browsers">
        <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
        <td>{{ supported }}</td>
        <td><a :href="download" target="_blank">Téléchargé</a></td>
    </tr>
</tbody>
</table>

::: danger Internet Explorer et Safari
Ces deux navigateurs peuvent être décrits comme les "nid à problèmes" du développeur web moderne. Certaines fonctions ne fonctionnent pas dans ces navigateurs ou nécessitent du code supplémentaire.

Nous ne voyons pas l'intérêt de faire cela partout et ne supportons officiellement **pas** ces deux navigateurs.
:::

### Je souhaite partager ma configuration avec des amis ou l'utiliser sur plusieurs appareils. Est-ce possible ?
Actuellement, ce n'est pas possible, mais nous y travaillons.

#### Existe-t-il un moyen d'enregistrer les paramètres liés au compte afin de ne pas avoir à les importer sur un autre appareil ?
Actuellement, nous ne proposons pas cette possibilité, mais une implémentation de cette fonctionnalité est prévue.


[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
