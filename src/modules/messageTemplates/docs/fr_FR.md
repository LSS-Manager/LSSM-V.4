Les (co-)administrateurs d'alliance ont souvent besoin d'envoyer des messages similaires à leurs membres.

Cette tâche étant pénible, le module **messages prédéfinis** simplifie l'envoi de ces messages à l'aide de modèles.

## Chats de l'alliance

Ici, il n'y a en fait pas grand-chose à expliquer, pour être honnête 😅.

Les messages ne sont pas directement postés dans le chat, mais peuvent bien sûr être édités avant.

## Conversations privées

Dans les paramètres, il est possible de créer différents modèles :

![Paramètres](assets/fr_FR/settings.png)

### Variables

#### Nom d'utilisateur

La variable <span v-pre>`{{username}}`</span> insère le nom d'utilisateur destinataire.
Attention elle n'est utilisable que pour les **nouveaux messages**, et pas pour les réponses à un message reçu.

:::tip Pourquoi n'est-ce disponible que pour les nouveaux messages ?
C'est lié à l'interface de messagerie,
il n'est facile d'identifier avec certitude le destinataire des messages envoyés et reçus.
:::

#### Date

La variable <span v-pre>`{{today}}`</span> insère la date courante au format JJ/MM/AAAA.

On peut également calculer des dates dans le passé ou le futur en indiquant le décalage en nombre de jours.
Par exemple <span v-pre>`{{today+14}}`</span> insère la date dans deux semaines, et <span v-pre>`{{today-436}}`</span> la date d'il y a 436 jours.

### Exemples

Pour les nouveaux messages, cela ressemble par exemple à ceci :

![Démarrer la conversation](assets/fr_FR/new_message.png)

ou après l'insertion du premier modèle :

![Modèle inséré](assets/fr_FR/entered.png)

Et ainsi pour les conversations existantes :

![Conversation existante](assets/fr_FR/existing_messages.png)
