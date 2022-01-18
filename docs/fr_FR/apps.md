---
title: ℹ️ Général
lang: fr_FR
sidebarDepth: 2
---

# ℹ️ Informations générales sur les modules

Dans les pages suivantes, vous trouverez une description de tous nos modules. Nous avons fait de notre mieux pour qu'ils soient aussi compréhensibles et complets que possible. Cependant, en raison de la taille de LSSM, ce n'est pas toujours facile.

Si vous avez des suggestions d'amélioration, vous pouvez nous les envoyer - ou même le faire vous-même.

::: danger Modules qui ne fonctionnent pas dans Mapkit
Comme décrit dans l'explication de l'[Appstore](appstore.md), il y a des modules qui ne sont malheureusement pas compatibles avec le type de carte `Mapkit`. Il s'agit de ces modules :
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.fr_FR" :key="module.title">
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

## LSSM V.3 vs. LSSM V.4

Ci-dessous, nous avons dressé une petite liste des fonctionnalités de la V.3 et de l'endroit où tu les trouveras dans la V.4.
En principe, nous souhaitons intégrer à terme toutes les fonctionnalités de la V.3 dans la V.4 !

|           Fonctionnalité V.3           |                        Module V.4                          |            Réglage V.4            |                  Modifications / remarques                   |
| :------------------------------------: | :--------------------------------------------------------: | :-------------------------------: | :----------------------------------------------------------: |
| Alarme Régulations Compteur d'alarmes  |    [Fenêtre de déploiement étendue][extendedCallWindow]    |      Compteur de régulations      |                                                              |
|             Recherche AAO              |                                                            |                                   |                                                              |
|      Alerter, Partager & Poster        |           [Partager le message à l'Alliance][sap]          |                                   |                                                              |
|             Plan du centre             |             [Améliorez la carte][extendedMap]              |                                   | Actuellement, seul le mode statique est intégré ici. Le mode dynamique suivra. |
|                Horloge                 |                      [Horloge][clock]                      |   Afficher l'horloge en overlay   |                                                              |
|         L'expansion du crédit          |        [Extension de crédit][creditsextension]             |                                   |                                                              |
|               Dashboard                |                [Tableau de bord][dashboard]                |                                   |                                                              |
|Enregistrer les appels d'alliance créés |                                                            |                                   |                                                              |
|           Aide à la mission            |               [Missionhelper][missionHelper]               |                                   |                                                              |
|        Mots-clés de la mission         |    [Fenêtre de déploiement étendue][extendedCallWindow]    |       Mots-clefs de mission       |                                                              |
|           Part de la mission           |        [Liste de mission étendue][extendedCallList]        |       Partager les missions       |                                                              |
|          Recherche par mission         |                                                            |                                   |                                                              |
|        Vue agrandie du bâtiment        |      [Vue améliorée des bâtiments][extendedBuilding]       |                                   |                                                              |
|          Renommer le véhicule          |                                                            |                                   |                                                              |
|    Demande de transport sur la carte   |                                                            |                                   |                                                              |
|    Filtre de construction d'icônes     | [Liste des bâtiments personnalisable][buildingListFilter]  |                                   | Les icônes ne sont plus remplacées par défaut. En revanche, le module de la V.4 peut faire beaucoup plus : tu peux définir toi-même les filtres, aussi bien avec du texte qu'avec des icônes ! |
|   Contrôle de l'affichage des appels   |               [Raccourcis clavier][hotkeys]                |                                   | Ce module est encore loin d'être terminé, mais avec le temps, toutes les touches de raccourci de la V3 seront disponibles ici aussi. |
|               Layout 01                |                                                            |                                   | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 02                |                                                            |                                   | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 03                |                                                            |                                   | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               Layout 04                |                                                            |                                   | Nous souhaitons proposer un module pour de nombreuses mises en page, que l'on peut également adapter soi-même. |
|               LS-Heatmap               |                 [Carte thermique][heatmap]                 |                                   |                                                              |
|           Événements marqués           |        [Liste de mission étendue][extendedCallList]        | Marquer les missions saisonnières |                                                              |
|           Date de la mission           |    [Fenêtre de déploiement étendue][extendedCallWindow]    |  Heure de génération de mission   |                                                              |
|               MissionOut               |        [Liste de mission étendue][extendedCallList]        |      Réduire les missions         | L'affichage du nombre de patients se trouve dans le même module sous le réglage `Patients actuels`. |
|        Demande HEMS à la radio         |                                                            |                                   |                                                              |
|         Alerte de notification         |            [Notifications][notificationAlert]              |                                   | Dans la V.4, il y a de nombreuses notifications possibles au choix, qui sont aussi partiellement configurables. |
|              Redesign 01               |                                                            |                                   |                                                              |
|             Release Notes              |                                                            |                                   | Les releasenotes sont intégrées nativement dans la V.4 et ne peuvent pas être désactivées ;) |
| Afficher l'alarme de retour ci-dessus  |                                                            |                                   |                                                              |
|   Afficher le bouton Chat ci-dessus    |                                                            |                                   |                                                              |
|          Compteur de statuts           |            [Compteur de Status][statusCounter]             |                                   |                                                              |
|  Somme des statistiques quotidiennes   |         [Sommaire du crédit][dailyCreditsSummary]          |                                   |                                                              |
|                User-ID                 |                     [User-ID][userid]                      |                                   |                                                              |
|        Extension de l'Alliance         |                                                            |                                   |                                                              |
|    Demandes de transport améliorées    |                                                            |                                   |                                                              |
|          État de la station            |        [Infobulle sur les bâtiments][buildingHover]        |                                   |                                                              |
|         Filtre de destination          |                                                            |                                   |                                                              |
|                survol                  |                [Aperçu général][overview]                  |                                   |                                                              |



[extendedCallWindow]: modules/extendedCallWindow.md
[clock]: modules/clock.md
[dashboard]: modules/dashboard.md
[missionHelper]: modules/missionHelper.md
[extendedBuilding]: modules/extendedBuilding.md
[notificationAlert]: modules/notificationAlert.md
[statusCounter]: modules/statusCounter.md
[dailyCreditsSummary]: modules/dailyCreditsSummary.md
[userid]: modules/userid.md
[buildingHover]: modules/buildingHover.md
[overview]: modules/overview.md
[buildingListFilter]: modules/buildingListFilter.md
[extendedCallList]: modules/extendedCallList.md
[hotkeys]: modules/hotkeys.md
[extendedMap]: modules/extendedMap.md
[creditsextension]: modules/creditsextension.md
[heatmap]: modules/heatmap.md
[sap]: modules/shareAlliancePost.md