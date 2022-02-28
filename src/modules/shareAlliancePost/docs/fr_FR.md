De nombreux utilisateurs aiment partager des missions avec leur alliance et également poster une note d'incident pour informer les membres de l'alliance.

Ce module vous permet d'alerter, de partager et de poster en un seul clic ! Vous pouvez définir des modèles pour les notes d'incident dans les paramètres, donc nous supportons certaines variables :

## Variables

### Crédits

<code v-html="'{{credits}}'"></code> sont remplacés par les crédits moyens, les récompenses de la mission.

### Adresse

<code v-html="'{{address}}'"></code> est remplacé par l'adresse complète de la mission.

Vous pouvez utiliser <code v-html="'{{city}}'"></code> pour insérer uniquement le code postal et le nom de la ville.

Pour ne pas avoir le code postal/zipcode, il suffit d'utiliser <code v-html="'{{cityWithoutZip}}'"></code>.

### Restant

<code v-html="'{{remaining}}'"></code> est remplacé par les véhicules qui sont encore nécessaires pour cette mission. Il reflète exactement le texte dans la case rouge "Véhicules nécessaires".

### Patients

<code v-html="'{{patients}}'"></code> est remplacé par le nombre de patients actuellement présents à la mission.

### Début d'une mission planifiée

<code v-html="'{{beginAt}}'"></code> est remplacé par l'heure à laquelle une mission planifiée commencera.

### Nom de la mission

<code v-html="'{{name}}'"></code> est remplacé par le nom de la mission.

**Uniquement disponible dans la fenêtre de mission** <code v-html="'{{remainingSpecial}}'"></code> est remplacé par les véhicules en approche et ceux sélectionnés. Donc ceux de la liste des Interventions (le contenu de la boîte rouge).

### Le trajet le plus long

<code v-html="'{{longestDrive}}'"></code> est remplacé par le temps qu'il faut pour que tous les véhicules sélectionnés soient sur place. **Important** : Cette variable n'est évidemment pas disponible lors du partage dans la liste des missions !

### Date

<code v-html="'{{today}}'"></code> est remplacé par la date local (jour et mois).

De même, <code v-html="'{{tomorrow}}'"></code> produit la date de demain (jour et mois).

### Temps

Vous pouvez également définir des distances temporelles. Le système est un peu compliqué, alors lisez attentivement :

<code v-html="'{{now+5}}'"></code> ajoute exactement 5 heures, <code v-html="'{{now+5.5}}'"></code> ajoute 5 heures et 30 minutes. Vous pouvez utiliser n'importe quel nombre à ajouter.

Vous pouvez également choisir d'arrondir à l'unité supérieure ou inférieure. Pour arrondir au quart d'heure supérieur, ajoutez simplement un `r15`, pour arrondir au quart d'heure inférieur, ajoutez simplement `r-15`. Vous pouvez utiliser n'importe quel nombre entre `0` et `59`..

Exemple : Si vous voulez faire "en 7 heures et 22,5 minutes, mais arrondir à une minute divisible par 3", il suffit d'utiliser <code v-html="'{{now+7.266r-3}}'"></code>.

Si vous ne comprenez pas le système ou si vous avez besoin d'aide, vous pouvez toujours joindre notre [Support](/support.md).
