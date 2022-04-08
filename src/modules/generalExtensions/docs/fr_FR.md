Au lieu de créer un module pour chaque idée, aussi petite soit-elle, il est certes possible de le faire, mais cela n'a généralement aucun sens. C'est pourquoi nous proposons ici une collection de fonctions qui n'ont pas pu être intégrées dans un module spécifique.

Chacune des fonctionnalités suivantes peut être (dés)activée individuellement dans les paramètres. Voici une présentation de chaque paramètre :

### Activer l'aperçu des images
*Fonctionne uniquement en combinaison avec `Rendre les liens cliquables`*.

Parfois, on veut simplement intégrer une image dans le forum, le chat ou ailleurs. Ici, vous pouvez au moins activer un aperçu de l'image. Un clic ouvre alors l'image dans un nouvel onglet.

::: warning Aperçus d'images
Seul le lien direct vers les images fonctionne !
:::

## Liens cliquables
Les liens affichés en texte brut (par ex. dans le chat, le forum, les messages, etc.) sont rendus cliquables. Ils s'ouvrent automatiquement dans un nouvel onglet.


## Aperçu du lien
Parfois, on aimerait simplement avoir de brèves informations sur un bâtiment ou un utilisateur par exemple, sans avoir à ouvrir directement le lien. Pour cela, il est possible d'activer nos aperçus de liens dans les paramètres :

![Paramètres pour les aperçus de liens](./linkPreview_setting.png)

Voici quelques impressions :

### Bâtiment
![Aperçu des Bâtiment](./linkPreview_building.png)

### Véhicules
![Aperçu des Véhicules](./linkPreview_vehicle.png)

### Profils
::: warning Profils
Cette fonction est encore en cours de développement. C'est pourquoi il n'y a pas encore d'image ici.
:::

### Missions
::: warning Missions
Cette fonction est encore en cours de développement. C'est pourquoi il n'y a pas encore d'image ici.
:::

## Enregistrer le centrage de la carte

::: warning Type de carte "Mapkit".
Malheureusement, ce paramètre n'est actuellement pas compatible avec le type de carte `Mapkit` !
:::

Il y a quelques endroits dans le jeu où la carte est centrée sur une autre position. Avec ce réglage, les centrage sont enregistrés et sont accessibles via un petit bouton en haut à droite de la carte :

![L'historique des centrages](./mapUndo.png)

Si l'on reste brièvement avec la souris sur l'adresse concernée, celle-ci est affichée sur la carte, mais ce n'est qu'en cliquant dessus que la carte saute réellement à cette position.

Les entrées disparaissent après un nouveau chargement de la page et ne sont pas persistantes ! Pour utiliser des positions persistantes, veuillez utiliser [Signets pour la carte](#Signet-pour-la-carte)

## Signet pour la carte

::: warning Type de carte "Mapkit".
Malheureusement, ce paramètre n'est actuellement pas compatible avec le type de carte `Mapkit` !
:::

Utilise cette option pour créer manuellement des signets sur la carte. Cette fonctionnalité fonctionne de manière assez similaire à [Enregistrer les centrages](#Enregistrer-le-centrage-de-la-carte), à la différence que vous créez toi-même les signets et qu'ils sont toujours disponibles après un nouveau chargement.

## Titre de l'onglet du navigateur

Cette fonction permet d'indiquer dans le navigateur quelle fenêtre du jeu est actuellement ouverte. Voici un petit exemple :

![titre du navigateur pour un véhicule](./browsertitle.png)

## Emoji picker

Vous avez besoin d'un emoji simple mais qui fonctionne bien ? Nous te le donnons !

Il te suffit de taper deux points `:` dans n'importe quel champ de texte et de commencer à écrire. 0.5s après que vous ayez cessé d'appuyer sur une touche, des propositions s'affichent. Si vous cliquez sur une proposition, l'emoji correspondant sera inséré. Note qu'actuellement, seuls les noms officiels des emojis sont utilisés pour la recherche, par exemple `slightly_smiling_face` pour `🙂`. Vous pourrez cependant te souvenir très rapidement des noms les plus importants 😉

![Emoji-Picker](./emojipicker.png)

::: tip Sélection au moyen du clavier
Avec `←` et `→`, vous pouvez aussi parcourir les propositions et les insérer ensuite avec `Enter`. Ainsi, nous ne te forçons pas à utiliser cette construction bizarre qu'est la souris 😜
:::

Une caractéristique supplémentaire est le remplacement automatique des raccourcis courants. Par exemple, ` ;)` est remplacé par `😉` dès que vous mettez un espace après.

## Mémoriser le type de bâtiment

Ainsi, dans le menu "Construire un bâtiment", le type de bâtiment que vous avez utilisé lors de la dernière construction reste sélectionné. Si vous construisez beaucoup de bâtiments d'un même type, cela t'évite de cliquer à chaque fois. 

## Mémoriser le centre de contrôle

Fonctionne de la même manière que [Mémoriser le type de bâtiment](#mémoriser-le-type-de-bâtiment), mais pour la sélection du centre de contrôle.

## FMS amélioré 5

Est-ce que cela t'énerve aussi que lors du transfert, la demande de communication ne soit pas terminée lorsque vous cliquez sur "aller en intervention" ? Cette petite extension ajoute justement cela. 

Les demandes d'appel sont également fermées lorsque l'on clique sur "Allez en mission".

## Recherche de lieu sur la carte

Ta barre de navigation est un peu surchargée ?

Ce paramètre déplace la recherche de lieu de la barre de navigation vers la carte. Vous pouvez choisir la position par réglage. En cliquant sur la loupe, vous ouvrez et fermez la fenêtre de saisie.

![recherche de lieu sur la carte](./mapsearch.png)

## RAI-Exporter en tant que QR-Code

Ce paramètre propose de généré un QR-Code quand vous exportez vos RAIs.
