Il est parfois utile de recevoir des notifications pour certains événements. C'est pourquoi nous avons intégré le module **Notifications**.

# Paramètres
Pour chaque notification, tu peux définir les paramètres suivants :

## Type de notification ingame
Nous proposons quatre couleurs différentes :
* Message d'erreur (rouge)
* Info (bleu)
* Confirmation (vert)
* Avertissement (orange)

Voici par exemple ce que cela donne sur le bord gauche de l'écran :
![types en design clair](./types_light.png) ![types en design foncé](./types_dark.png)

## Durée d'affichage
Ici, vous pouvez définir la durée d'affichage d'une notification. Avec `-1`, vous pouvez l'afficher en permanence jusqu'à ce que vozs cliquez dessus pour la supprimer. Note cependant que de nombreux systèmes d'exploitation ignorent cette durée et que le comportement des notifications de bureau peut donc être inattendu.

## Envoyer une notification ingame
Définis ici si vous voulez recevoir la notification dans le jeu ou non.

## Envoyer une notification de bureau
Définis ici si vous voulez recevoir la notification du système d'exploitation ou non.

## Position
Définis ici la position des notifications ingame. Vous pouvez choisir parmi 6 positions possibles.

# Exemple
Voici à quoi peut ressembler une configuration :

![exemple de configuration](./example.png)

# Événements
Vous trouverez ici une liste complète des événements pour lesquels vous pouvez configurer des notifications :

* Nouvelle candidature dans l'alliance
* Message de chat
* Message chat (uniquement les mentions)
* Message chat (uniquement les mentions privées)
* Nouveau message sur le forum
* Nouveau message d'alliance
* Nouvelle actualité d'alliance
* Nouveau message privé
* Nouveauté dans le jeu
* Une mission demande votre attention
* Une mission partagée demande votre attention
* Une mission a été générée
* Une Mission d'Alliance a été créée
* Une mission a été partagée
* Mission planifiée annulée
* Mission planifiée terminée
* Messages radio (Général)
* Messages radio (Status 1)
* Messages radio (Status 2)
* Messages radio (Status 3)
* Messages radio (Status 4)
* Messages radio (Demande de transport)
* Messages radio (Status 6)
* Messages radio (Status 7)
* Messages radio (Status 9)
