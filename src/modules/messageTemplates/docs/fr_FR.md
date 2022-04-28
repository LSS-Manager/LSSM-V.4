Les (co-)administrateurs d'alliance ont souvent besoin d'envoyer des messages similaires à leurs membres.

Cette tâche étant pénible, le module **messages prédéfinis** simplifie l'envoi de ces messages à l'aide de modèles.

## Chats de l'alliance

Ici, il n'y a en fait pas grand-chose à expliquer, pour être honnête 😅.

Les messages ne sont pas directement postés dans le chat, mais peuvent bien sûr être édités avant.

## Conversations privées

Dans les paramètres, il est possible de créer différents modèles :

![Paramètres](./settings.png)

### Variables

#### Nom d'utilisateur

La variable <variable variable="username"/> insère le nom d'utilisateur destinataire. Attention elle n'est utilisable que pour les **nouveaux messages**, et pas pour les réponses à un message reçu.

:::tip Pourquoi n'est-ce disponible que pour les nouveaux messages ?
C'est lié à l'interface de messagerie, il n'est facile d'identifier avec certitude le destinataire des messages envoyés et reçus.
:::

#### Date

La variable <variable variable="today"/> insère la date courante au format JJ/MM/AAAA.

On peut également calculer des dates dans le passé ou le futur en indiquant le décalage en nombre de jours. Par exemple <variable variable="today+14"/> insère la date dans deux semaines, et <variable variable="today-436"/> la date d'il y a 436 jours.


### Exemples

Pour les nouveaux messages, cela ressemble par exemple à ceci :

![Démarrer la conversation](./new_message.png)

ou après l'insertion du premier modèle :

![Modèle inséré](./entered.png)

Et ainsi pour les conversations existantes :

![Conversation existante](./existing_messages.png)
