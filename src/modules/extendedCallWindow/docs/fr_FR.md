## Paramètres généraux

### Heure de génération de mission
Affiche la date et heure de génération de la mission à côté de l'adresse.
Les deux paramètres suivants permettent d'activer :

* une bordure jaune, si la mission a été générée il y a plus d'un nombre d'heures définit (0 par défaut => pas de bordure).
* une bordure rouge, si la mission expire au cours de la nuit prochaine.

![Heure génération](bordureJaune.png)

### Vue améliorée des véhicules requis
Affiche les véhicules requis sous forme de tableau à la place de d'une simple liste.
Ce tableau prend en compte les véhicules en route, et affiche en vert les besoins satisfaits compte-tenu des véhicules en route et sélectionnés.

![Véhicules requis](vehiculesManquants.png)

### Aperçu des victimes
Affiche dans l'en-tête de mission les véhicules de secours manquants entre ambulances, équipe médicales et hélicoptères de secours.

![Besoins Victimes](apercuVictimes.png)

### Temps de trajet le plus long
Affiche, à côté du bouton « Déployer », le temps de trajet le plus long de l'ensemble des véhicules sélectionnés.

### Toujours montrer l'en-tête
L'en-tête de mission s'affichera toujours même si vous défilez la page vers le bas.

### Bouton "Véhicules limités" dans l'en-tête
Le cas échéant, affiche le bouton « Affichage de véhicules limité ! Chargement insufissant" dans l'en-tête, juste au-dessous de la barre d'avancement de la mission.

### Cacher la liste des véhicules
Masque la liste des unités disponibles, et affiche un bouton au-dessus permettant de les afficher.

### Centrage de la carte
Ajoute un bouton dans le titre de mission après l'icône de mission qui permet de centrer la carte sur la mission actuelle.

### Infobulles
Affiche des infobulles sur différents éléments ajoutés par les autres options de ce module, notamment les icônes de configuration de l'affichage du tableau des véhicules manquants.

### Compteur de véhicules dans les CRM
Affiche à côté des boutons « Déployer » le nombre de véhicules sélectionnés parmis les véhicules disponibles.

### Afficher le type de véhicules
Dans la liste des unités disponible, affiche le type de véhicule à côté de son nom. Si le véhicule a une catégorie propre, c'est cette dernière qui sera affichée.


## Régulations d'alerte et d'intervention (RAI)

### Compteur de régulations
Indique le nombre de fois qu'une régulation a été sélectionné. Le nom de la régulation est préfixé par ''Nx'' où N est le nombre de fois.

L'affichage peut aussi être choisi comme badge, qui s'affiche en haut à gauche du bouton de régulation.

Un bouton est ajouté au bas de la fenêtre de déploiement pour remettre à zéro les compteurs et les véhicules sélectionnés.

![Compteur et bordure de régulations](regulationCompteurs.png)

### Bordure de régulations
Encadre les régulations sélectionnées avec une bordure de couleur et de taille personnalisables.

### Remise à zéro de la sélection de véhicules
Ajoute un bouton pour réinitialiser la sélection de véhicules. Si les options Compteur de régulations ou Bordure de régulations ont été activées, elles sont également remises à zéro.

### Griser les régulations non adaptées
Grise les régulations dont le nom ne contient au mot de la mission courante.

![Feu de Cave et régulations grisées](regulationGrisee.png)

### Temps de trajet de la régulation
Affiche lors du survol le temps nécessaire pour que tous les véhicules de la régulation arrivent sur la mission. Cette option est incompatible avec le paramètre du CTA « Dans les RAI, afficher le temps de trajet max. des véhicules ». Ce dernier affiche le temps de trajet max. sur pour toutes les régulations.

### Détail de la régulation
Affiche lors du survol un mini tableau avec la liste des catégories de véhicules sélectionnés par cette régulation. Les véhicules manquants seront affichés sur un fond rouge. Le nombre de fois où cette régulation peut être sélectionné est également en haut à droite.

![Détails de la régulation](regulationDetails.png)


## Paramètres de personnalisation avancée

### Onglets personnalisés
Cette section permet de redéfinir les onglets par défaut de la liste de véhicules. Vous pouvez modifier les véhicules qui aparaissent dans ces onglets, ainsi que l'ordre d'affichage de ces onglets. Les catégories propres ne sont pas prises en compte.

::: warning Attention
Les onglets « Tout » et « Poursuivre » ne peuvent pas être personnalisés.
:::

### Mots-clefs de mission
Permet l'affichage de mots-clefs personnalisés dans l'en-tête de la mission à côté de son nom.

La couleur du texte, du fond, ainsi que l'affichage avant ou après le nom de la mission peuvent être choisis différemment pour chaque mot-clef. Chaque mot-clef peut-être associé à une ou plusieurs missions.

### Pictos de déploiement
Permet l'affichage de pictogrammes à gauche du bouton « Déployer » en bas à gauche, en fonctions des types de véhicules sélectionnés.

Le choix des pictogrammes se fait parmi les catégories « Solid », « Regular » et « Brands » fournies par la police « Font Awesome ». [Voir la liste](https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=brands,regular,solid&m=free).
