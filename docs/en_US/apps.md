---
title: ℹ️ General
lang: en_US
sidebarDepth: 2
---

# ℹ️ General information on modules

On the following pages you will find a description of all our modules. We have done our best to keep them as understandable and complete as possible. However, due to the size of LSSM this is not always easy.

If you have suggestions for improvement, you can send them to us as always - or even do it yourself.

:::danger modules that do not work in Mapkit
As described in the explanation of the [Appstore](appstore.md), there are modules which are unfortunately not compatible with the map type `Mapkit`. These are these modules:
<ul>
    <li v-for="module in $theme.variables.noMapkitModules.en_US" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::


## LSSM V.3 vs. LSSM V.4

Below we have listed the features of V.3 and where you can find them in V.4.
We want to integrate all the features of V.3 into V.4 in time!
 
|              Feature V.3               |                   Module V.4                     |             Setting V.4            |                Changes / Tips                 |
|:--------------------------------------:|:------------------------------------------------:|:----------------------------------:|:---------------------------------------------:|
|       Alarm-Regulations-Counter        |     [Extended alarm window][extendedCallWindow]  |            ARR Counter             |                                               | 
|              AAO-Search                |     [Extended alarm window][extendedCallWindow]  |            ARR-Search              |                                               |
|          Alert, Share & Post           |             [Share-Alliance-Post][sap]           |                                    |                                               |
|               Center-Map               |             [Improved Map][extendedMap]          |                                    |  Currently only the static mode, the dynamic mode will be implemented in the future. |
|                  Clock                 |                  [Clock][clock]                  |       Toon klok als overlay        |                                               |
|          Credits expansion             |      [Credits Expansion][creditsextension]       |                                    |                                               |
|               Dashboard                |             [Dashboard][dashboard]               |                                    |                                               |
|     Save created alliance calls        |                                                  |                                    |                                               |
|             Missionhelper              |           [Missionhelper][missionHelper]         |                                    |                                               |
|            Mission Keywords            |    [Extended alarm window][extendedCallWindow]   |          Mission keywords          |                                               |
|             Mission share              |    [Extended Missionlist][extendedCallList]      |           Share missions           |                                               |
|             Mission search             |                                                  |                                    |                                               |
|         Extended building view         |    [Extended building view][extendedBuilding]    |                                    |                                               |
|             Rename vehicle             |                                                  |                                    |                                               |
|        Request transport in map        |                                                  |                                    |                                               |
|         Icon building filter           | [Customizable buildings list][buildingListFilter]|                                    | There are no default icons anymore. You could do more with the module of V.4: Set the filter with text or icons! |
|          Callview control              |               [Hotkeys][hotkeys]                 |                                    | The module is not complete yet, but with time there will be all the hotkeys of V3  |
|               Layout 01                |                                                  |                                    |We want to offer a module for many layouts, which you can adjust yourself |
|               Layout 02                |                                                  |                                    |We want to offer a module for many layouts, which you can adjust yourself |
|               Layout 03                |                                                  |                                    |We want to offer a module for many layouts, which you can adjust yourself |
|               Layout 04                |                                                  |                                    |We want to offer a module for many layouts, which you can adjust yourself |
|               LS-Heatmap               |                [Heatmap][heatmap]                |                                    |                                               |
|             Marked events              |     [Extended Missionlist][extendedCallList]     |        Mark seasonal missions      |                                               |
|              Mission Date              |     [Extended alarm window][extendedCallWindow]  |           Generation time          |                                               |
|              MissionOut                |     [Extended Missionlist][extendedCallList]     |          Collapse missions         |Showing the amount of current patients is implemented in the same module as setting `Current Patients`|
|          HEMS request in radio         |                                                  |                                    |                                               |
|           Notification Alert           |         [Notifications][notificationAlert]       |                                    |In V4 you will find various types of notifications that are also adjustable. |
|              Redesign 01               |                                                  |                                    |We want to offer a module for many layouts, which you can adjust yourself |
|             Release Notes              |                                                  |                                    |The release notes are integrated in V4 and cannot be disabled |
|         show Back Alarm Above          |                                                  |                                    |                                               |
|         show Chatbutton Above          |                                                  |                                    |                                               |
|             Status Counter             |           [Status counter][statusCounter]        |                                    |                                               |
|          Sum for daily stats           |       [Credit summary][dailyCreditsSummary]      |                                    |                                               |
|                User-ID                 |                [User-ID][userid]                 |                                    |                                               |
|          Alliance-extension            |                                                  |                                    |                                               |
|      Enhanced transport requests       |                                                  |                                    |Already included in redesign, a standalone module will come. |
|              Station status            |   [Short building information][buildingHover]    |                                    |                                               |
|           Destination filter           |                                                  |                                    |Already included in redesign, a standalone module will come. | 
|               Overview                 |              [Overview][overview]                |                                    |                                               |

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
