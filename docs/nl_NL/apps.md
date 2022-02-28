---
title: ℹ️ Algemeen
lang: nl_NL
sidebarDepth: 2
---

# ℹ️ Algemene infomatie over modules

Op de volgende pagina's vindt u een beschrijving van al onze modules. We hebben ons best gedaan om ze zo begrijpelijk en compleet mogelijk te houden. Vanwege de grootte van LSSM is dit echter niet altijd gemakkelijk.

Als u suggesties voor verbetering heeft, kunt u deze zoals altijd naar ons opsturen - of zelfs zelf aanpassen.

:::danger Modules die niet werken in Mapkit
Zoals beschreven in de uitleg van de [Appstore](appstore.md), zijn er modules die helaas niet compatibel zijn met het kaarttype `Mapkit`. Dit zijn de volgende modules:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.nl_NL" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
:::


## LSSM V.3 vs. LSSM V.4

Hieronder hebben we een lijst van de features van V.3 op een rijtje gezet en waar je ze in V.4 kunt vinden.
In principe willen we alle functies van V.3 in de loop van de tijd in V.4 integreren!

|              Functie V.3               |                   Module V.4                    |       Instelling V.4        |                                                                            Veranderingen / Tips                                                                            |
|:--------------------------------------:|:------------------------------------------------:|:----------------------------------:|:---------------------------------------------:|
|           AUR-klik-teller              | [Uitgebreid meldingsvenster][extendedCallWindow] |       Inzetvoorsteltellers         |                                               | 
|        AUR-zoekfuncties                | [Uitgebreid meldingsvenster][extendedCallWindow] |     Inzetvoorstellen Zoeken        |                                               |
|      Alarmeren, delen en posten        |           [Alarmeren, delen en posten][sap]      |                                    |                                               |
|               Kaart Centreren          |          [Verbeterde Kaart][extendedMap]         |                                    |  Momenteel alleen de statische modus, de dynamische modus komt nog. |
|                  Klok                  |                  [Klok][clock]                   |       Toon klok als overlay        |                                               |
|          Credits-uitbreiding           |     [Credits uitbreiding][creditsextension]      |                                    |                                               |
|               Dashboard                |             [Dashboard][dashboard]               |                                    |                                               |
|     Zelfgemaakte inzetten opslaan      |                                                  |                                    |                                               |
|             Meldinghelper              |           [Inzethelper][missionHelper]           |                                    |                                               |
|      Steekwoorden bij meldingen        | [Uitgebreid meldingsvenster][extendedCallWindow] |          Meldingstrefwoord         |                                               |
|           Meldingen vrijgeven          |  [Uitgebreide meldingenlijst][extendedCallList]  |           Deel meldingen           |                                               |
|          Meldingen doorzoeken          |                                                  |                                    |                                               |
|        Uitgebreide bouwweergave        | [Uitgebreide gebouwweergave][extendedBuilding]   |                                    |                                               |
|         Voertuigen herbenoemen         |                                                  |                                    |                                               |
| Spraakaanvragen op de kaart weergeven  |                                                  |                                    |                                               |
|    Redesign Filterknoppen Gebouwen     | [Aanpasbare gebouwenlijst][buildingListFilter]   |                                    | Er worden geen standaard iconen meer ingesteld. Je kan met de module in V.4 veel meer: Je kan het filter zelfstandig instellen, zowel met tekst als iconen! |
|       Besturing met toetsenbord        |             [Sneltoetsen][hotkeys]               |                                    | Deze module is nog lang niet klaar, maar met de tijd worden hier ook alle sneltoetsen uit V3 beschikbaar |
|               Layout 01                |                                                  |                                    |We willen een module voor vele layouts aanbieden, die je zelf kan aanpassen |
|               Layout 02                |                                                  |                                    |We willen een module voor vele layouts aanbieden, die je zelf kan aanpassen |
|               Layout 03                |                                                  |                                    |We willen een module voor vele layouts aanbieden, die je zelf kan aanpassen |
|               Layout 04                |                                                  |                                    |We willen een module voor vele layouts aanbieden, die je zelf kan aanpassen |
|           Voertuigspreiding            |                [Heatmap][heatmap]                |                                    |                                               |
|          Markeer Eventinzetten         |  [Uitgebreide meldingenlijst][extendedCallList]  |      Seizoensmeldingen markeren    |                                               |
|     Begintijd meldingen weergeven      | [Uitgebreid meldingsvenster][extendedCallWindow] |            Generatietijd           |                                               |
|         Meldingen inklappen            |  [Uitgebreide meldingenlijst][extendedCallList]  |         Meldingen inklappen        |Het tonen van het patiënten aantal, zit in dezelfde module als instelling `Huidige patiënten`|
|        Spraakaanvraag voor MMT         |                                                  |                                    |                                               |
|           Browsermeldingen             |         [Notificaties][notificationAlert]        |                                    |In V4 vind je diverse soorten notificaties die ook instelbaar zijn.|
|              Redesign 01               |                                                  |                                    |We willen een module voor vele layouts aanbieden, die je zelf kan aanpassen |
|             Release Notes              |                                                  |                                    |De releasenotes zijn geïntegreerd in V4 en kan je niet uitschakelen |
|           Extra annuleerknop           |                                                  |                                    |                                               |
|          Toon boven chat-knop          |                                                  |                                    |                                               |
|             Statusteller               |           [Statusteller][statusCounter]          |                                    |                                               |
|    Totaalweergave in dagsamenvatting   | [Totaalweergave dagsamenvatting][dailyCreditsSummary]  |                              |                                               |
|                User-ID                 |                [User-ID][userid]                 |                                    |                                               |
|            Team-uitbreiding            |                                                  |                                    |                                               |
|      Verbeterde spraakaanvragen        |                                                  |                                    |Is reeds in redesign opgenomen, een zelfstandige module komt nog. | 
|      Voertuigstatus bij gebouwen       |     [Korte gebouwinformatie][buildingHover]      |                                    |                                               |
|           Bestemming Filter            |                                                  |                                    |Is reeds in redesign opgenomen, een zelfstandige module komt nog. | 
|               Overzicht                |              [Overzicht][overview]               |                                    |                                               |

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
