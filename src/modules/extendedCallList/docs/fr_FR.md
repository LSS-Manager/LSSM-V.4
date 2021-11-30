La liste des missions est l'un des éléments centraux du jeu. Malheureusement, elle n'est mise en œuvre que de manière minimaliste par le jeu.

Avec ce module, nous souhaitons la rendre un peu plus attrayante. Voici les paramètres possibles :

## Durée des missions restantes
Tu veux savoir combien de temps il faut encore à une mission pour être complètement traitée ?
Ce paramètre t'indique exactement cette information :
![durée dans la liste des missions](einsatzdauer.png)

### Durée des missions uniquement pour les missions vertes
Si ce paramètre est désactivé (il est activé par défaut), les durées sont également affichées lorsque la mission a le statut `jaune`.

Pourquoi en est-il ainsi ?
> Pour chaque mission en cours, le jeu exécute une fonction toutes les secondes. Cette fonction calcule entre autres le moment où la mission cesse d'être traitée. Et c'est justement une fois que la mission est terminée, ou lorsque tout ce qui est nécessaire n'est pas encore sur place et que la mission a quand même déjà commencé.
> Nous utilisons cette "heure de fin" calculée et calculons ensuite la distance qui nous sépare de cette heure et la mettons en forme.
> C'est pourquoi il est possible d'afficher la durée de de la mission même si celle-ci n'est pas encore "verte". 

## Durée du traitement du patient
Ceci permet d'afficher en petit le temps nécessaire aux patients pour être complètement traités.

## Marquer les missions
Cette fonction te permet de marquer les missions afin qu'elles apparaissent toujours en haut de la liste des missions. Tu peux marquer les missions aussi bien dans la liste des missions que dans la fenêtre des missions. Une étoile jaune indique qu'une intervention est marquée.
![Marquer dans la liste des affectations](markieren.png)
![Marquer dans la fenêtre d'intervention](markieren_einsatz.png)

## Afficher les gains
Cette fonctionnalité t'indique combien rapporte en moyenne une mission :
![Afficher les gains](verdienst.png)

## Réduire les missions
Cette fonction remplace le module "Mission Out" de la V3 !

Tu peux réduire ou ouvrir les missions à ta guise ou les réduire toutes en même temps. Le bouton situé sur le bord droit de la barre de boutons supérieure permet de basculer toutes les missions en une seule fois. Voici à quoi cela ressemble :
![Réduire les missions](einklappen.png)

## Partager les missions
Cette fonction remplace le module "Partager les missions" de la V3 !

Tu peux ainsi partager des missions au sein de l'alliance directement à partir de la liste des missions. Avec les paramètres suivants, tu peux limiter les missions pour lesquelles un bouton "partager" doit être affiché.
Tu peux également choisir la couleur des boutons :

![Partager les missions](shareMissions.png)

### Partager les missions : Types de missions
Choisisez si les boutons doivent apparaître pour les missions d'urgence, pour les gardes de sécurité ou pour les deux.

### Partager les missions : Crédits minimums
On ne veut pas partager toutes les missions, par exemple seulement les missions qui donnent en moyenne plus de 7.0000 crédits. Tu peux régler cela via ce paramètre.

## Trier les missions
Trie ta liste de missions selon certains critères ! Ici aussi, la couleur du bouton peut être adaptée.

![Trier les missions](missionSort.png)

### Tri dans la fenêtre de déploiement
Avec ce paramètre, tu peux reprendre le tri dans la fenêtre de déploiement. Bien entendu, tu peux aussi définir [Raccourcis](hotkeys.md) pour les boutons modifiés. Une petite case à cocher te permet de changer à tout moment le mode des boutons entre "trier" et "standard" dans la fenêtre de déploiement.

Si tu n'as pas choisi de tri, les boutons ne seront pas modifiés et aucune coche n'apparaîtra.

Le mode actuel des boutons est indiqué par la couleur : `Vert → Standard` et `Bleu → Trié` :

![Trier les missions dans la fenêtre déploiement : non triées](missionSortMissionsStandard.png)

![Trier les missions dans la fenêtre déploiement : triées](missionSortMissionsModified.png)

## Nombre de patients
Affiche sur le bord droit d'une missions un petit nombre indiquant combien de patients se trouvent actuellement sur le lieu d'intervention :

![Nombre de patients](patientenzahl.png)

### Masquer 0 patient
Si ce paramètre est activé, le nombre de patients n'est affiché que s'il est supérieur à 0.

## Marquer les missions saisonnières
Avec ce paramètre, tu peux noter pour chaque mission autant de brèves indications que tu veux, qui seront affichées avant le nom dans la liste des interventions. Par défaut, les missions saisonnières sont inscrites ici (été, Halloween, football, etc.), d'où le nom.

Voici par exemple comment se présente le paramètre par défaut pour une mission de type football :
![Mission saisonnières lors d'une mission de football](eventMission.png)
