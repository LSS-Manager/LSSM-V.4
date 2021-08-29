Les (co-)administrateurs d'alliance ont souvent besoin d'envoyer des messages similaires à leurs membres.

Cette tâche étant pénible, le module **messages prédéfinis** simplifie l'envoi de ces messages à l'aide de modèles.

# Variables

Ces variables sont disponibles uniquement dans le contenu du message, elle n'ont pas d'effet dans le sujet.

## Nom d'utilisateur

La variable <code><span>{{</span>username<span>}}</span></code> insère le nom d'utilisateur destinataire.
Attention elle n'est utilisable que pour les **nouveaux messages**, et pas pour les réponses à un message reçu.

:::tip Pourquoi n'est-ce disponible que pour les nouveaux messages ?
C'est lié à l'interface de messagerie, il n'est facile d'identifier avec certitude le destinataire des messages envoyés et reçus.
:::

## Date

La variable <code><span>{{</span>today<span>}}</span></code> insère la date courante au format JJ/MM/AAAA.

On peut également calculer des dates dans le passé ou le futur en indiquant le décalage en nombre de jours.
Par exemple <code><span>{{</span>today+14<span>}}</span></code> insère la date dans deux semaines,
et <code><span>{{</span>today-436<span>}}</span></code> la date d'il y a 436 jours.
