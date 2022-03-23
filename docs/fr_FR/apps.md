---
title: ℹ️ Général
lang: fr_FR
sidebarDepth: 2
---

# ℹ️ Informations générales sur les modules

Dans les pages suivantes, vous trouverez une description de tous nos modules. Nous avons fait de notre mieux pour qu'ils soient aussi compréhensibles et complets que possible. Cependant, en raison de la taille de LSSM, ce n'est pas toujours facile.

Si vous avez des suggestions d'amélioration, vous pouvez nous les envoyer - ou même le faire vous-même.

:::danger Modules qui ne fonctionnent pas dans Mapkit
Comme décrit dans l'explication de l'[Appstore](appstore.md), il y a des modules qui ne sont malheureusement pas compatibles avec le type de carte `Mapkit`. Il s'agit de ces modules :
<ul>
    <li v-for="module in $theme.variables.noMapkitModules.fr_FR" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
	Et ces réglages :
<ul>
    <li><router-link to="modules/generalExtensions">
        Améliorations générales:
        <ul>
            <li><router-link to="modules/generalExtensions#enregistrer-le-centrage-de-la-carte">
                Enregistrer le centrage de la carte
            </router-link></li>
        </ul>
    </router-link></li>
</ul>
:::

## Fonctionnalité disponible sur LSSM V.3 et sur LSSM V.4 

Ci-dessous, nous avons dressé une liste des fonctionnalités de la V.3 et de l'endroit où tu les trouveras dans la V.4.

|           Fonctionnalité V.3           |                        Module V.4                          |            Réglage V.4            |                  Modifications / Remarques                   |
| :------------------------------------: | :--------------------------------------------------------: | :-------------------------------: | :----------------------------------------------------------: |
|           Aide à la mission            |                   [Aide à la mission][missionHelper]       |                                   |                                                              |
|             Plan du centre             |           [Améliorations de la carte][extendedMap]         |                                   | Actuellement, seul le mode statique est intégré ici. Le mode dynamique suivra. |
|                survol                  |                      [Aperçu général][overview]            |                                   |                                                              |
|               LS-Heatmap               |                     [Carte thermique][heatmap]             |                                   |                                                              |
|          Compteur de statuts           |                  [Compteur de Status][statusCounter]       |                                   |                                                              |
|         L'expansion du crédit          |               [Extension des crédits][creditsextension]    |                                   |                                                              |
| Alarme Régulations Compteur d'alarmes  |      [Fenêtre de déploiement étendue][extendedCallWindow]  |      Compteur de régulations      |                                                              |
|           Date de la mission           |      [Fenêtre de déploiement étendue][extendedCallWindow]  |  Heure de génération de mission   |                                                              |
|        Mots-clés de la mission         |      [Fenêtre de déploiement étendue][extendedCallWindow]  |       Mots-clefs de mission       |                                                              |
|             Recherche AAO              |      [Fenêtre de déploiement étendue][extendedCallWindow]  |           RAI-Recherche           |                                                              |
|                Horloge                 |                             [Horloge][clock]               |   Afficher l'horloge en overlay   |                                                              |
|          État de la station            |         [Infobulle sur les bâtiments][buildingHover]       |                                   |                                                              |
|           Événements marqués           |            [Liste de mission étendue][extendedCallList]    | Marquer les missions saisonnières |                                                              |
|           Part de la mission           |            [Liste de mission étendue][extendedCallList]    |       Partager les missions       |                                                              |
|               MissionOut               |            [Liste de mission étendue][extendedCallList]    |        Réduire les missions       | L'affichage du nombre de patients se trouve dans le même module sous le réglage `Patients actuels`. |
|    Filtre de construction d'icônes     | [Liste des bâtiments personnalisable][buildingListFilter]  |                                   | Les icônes ne sont plus remplacées par défaut. En revanche, le module de la V.4 peut faire beaucoup plus : tu peux définir toi-même les filtres, aussi bien avec du texte qu'avec des icônes ! |
|         Alerte de notification         |                       [Notifications][notificationAlert]   |                                   | Dans la V.4, il y a de nombreuses notifications possibles au choix, qui sont aussi partiellement configurables. |
|      Alerter, Partager & Poster        |            [Partage-Alliance-Message][sap]                 |                                   |                                                              |
|              Redesign 01               |                   [Refonte du design][redesign]            |                                   |                                                              |
|  Somme des statistiques quotidiennes   |                  [Sommaire du crédit][dailyCreditsSummary] |                                   |                                                              |
|               Dashboard                |                     [Tableau de bord][dashboard]           |                                   |                                                              |
|   Contrôle de l'affichage des appels   |                [Touches de raccourci][hotkeys]             |                                   | Ce module est encore loin d'être terminé, mais avec le temps, toutes les touches de raccourci de la V3 seront disponibles ici aussi. |
|                User-ID                 |                             [User-ID][userid]              |                                   |                                                              |
|        Vue agrandie du bâtiment        |         [Vue améliorée des bâtiments][extendedBuilding]    |                                   |                                                              |
|             Release Notes              |                                                            |                                   | Les releasenotes sont intégrées nativement dans la V.4 et ne peuvent pas être désactivées ;) |

 
   

### Actuellement seulement sur LSSM V.3

En principe, nous souhaitons intégrer à terme toutes les fonctionnalités de la V.3 dans la V.4 !


|           Fonctionnalité V.3           |                          Remarques                           |
| :------------------------------------: | :----------------------------------------------------------: |
|Enregistrer les appels d'alliance créés |                                                              |
|          Recherche par mission         |                                                              |
|          Renommer le véhicule          |                                                              |
|    Demande de transport sur la carte   |                                                              |
|               Layout 01                | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 02                | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 03                | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 04                | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|        Demande HEMS à la radio         |                                                              |
| Afficher l'alarme de retour ci-dessus  |                                                              |
|   Afficher le bouton Chat ci-dessus    |                                                              |
|        Extension de l'Alliance         |                                                              |
|    Demandes de transport améliorées    |                                                              |
|         Filtre de destination          |                                                              |

## Nouveauté de LSSM V.4 

|                        Module V.4                          |                          Remarques                           |
| :--------------------------------------------------------: | :----------------------------------------------------------: |
|              [Améliorations du tchat][chatExtras]          |                                                              |
|             [Améliorations générales][generalExtensions]   |                                                              |
|                    [Aperçu formation][schoolingOverview]   |                                                              |
|                 [Boutons asynchrones][asyncButtons]        | En cours de developpement                                    |
|                     [Console LSSMAQL][lssmaql]             | En cours de developpement                                    |
|                 [Messages Prédéfinis][messageTemplates]    |                                                              |
|                       [POI améliorés][enhancedPOI]         |                                                              |






[missionHelper]: modules/missionHelper.md
[extendedMap]: modules/extendedMap.md
[chatExtras]: modules/chatExtras.md
[generalExtensions]: modules/generalExtensions.md
[schoolingOverview]: modules/schoolingOverview.md
[overview]: modules/overview.md
[asyncButtons]: modules/asyncButtons.md
[heatmap]: modules/heatmap.md
[statusCounter]: modules/statusCounter.md
[lssmaql]: modules/lssmaql.md
[creditsextension]: modules/creditsextension.md
[extendedCallWindow]: modules/extendedCallWindow.md
[clock]: modules/clock.md
[buildingHover]: modules/buildingHover.md
[extendedCallList]: modules/extendedCallList.md
[buildingListFilter]: modules/buildingListFilter.md
[messageTemplates]: modules/messageTemplates.md
[notificationAlert]: modules/notificationAlert.md
[enhancedPOI]: modules/enhancedPOI.md
[sap]: modules/shareAlliancePost.md
[redesign]: modules/redesign.md
[dailyCreditsSummary]: modules/dailyCreditsSummary.md
[dashboard]: modules/dashboard.md
[hotkeys]: modules/hotkeys.md
[userid]: modules/userid.md
[extendedBuilding]: modules/extendedBuilding.md
