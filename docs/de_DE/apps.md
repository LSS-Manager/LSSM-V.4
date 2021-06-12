---
title: ℹ️ Allgemein
lang: de_DE
sidebarDepth: 2
---

# ℹ️ Allgemeines zu Modulen

Auf den folgenden Seiten findest du zu allen unseren Modulen eine Beschreibung. Wir haben unser bestes gegeben, diese so verständlich, und trotzdem vollständig, wie möglich zu halten. Allerdings ist dies aufgrund des Umfangs des LSSM nicht immer einfach.

Wenn du Verbesserungsvorschläge hast, kannst du uns diese wie immer zukommen lassen – oder sogar selbst einbauen.

:::danger Module und Einstellungen, die in Mapkit nicht funktionieren
Wie in der Erklärung zum [Appstore](appstore.md) beschrieben, gibt es Module und Einstellungen, die leider nicht mit dem Kartentyp `Mapkit` kompatibel sind. Dies sind diese Module:
<ul>
    <li v-for="module in $themeConfig.variables.noMapkitModules.de_DE" :key="module.title">
        <router-link :to="module.f">
            {{ module.title }}
        </router-link>
    </li>
</ul>
    Und diese Einstellungen:
<ul>
    <li><router-link to="modules/generalExtensions">
        Allgemeine Verbesserungen:
        <ul>
            <li><router-link to="modules/generalExtensions#kartensprunge-speichern">
                Kartensprünge speichern
            </router-link></li>
        </ul>
    </router-link></li>
</ul>
:::

## LSSM V.3 vs. LSSM V.4

Im folgenden haben wir dir eine kleine Auflistung der Features der V.3 aufgelistet und wo du diese in der V.4 findest.
Grundsätzlich möchten wir mit der Zeit alle Funktionen der V.3 in die V.4 integrieren!

|              Feature V.3               |                   Modul V.4                    |      Einstellung V.4      |                    Änderungen / Hinweise                     |
| :------------------------------------: | :--------------------------------------------: | :-----------------------: | :----------------------------------------------------------: |
|            AAO-Klickzähler             | [Erweitertes Alarmfenster][extendedCallWindow] |      AAO-Klickzähler      |                                                              |
|               AAO-Suche                |                                                |                           |                                                              |
|      Alarmieren, Teilen & Posten       |                                                |                           |                                                              |
|               Center-Map               |                                                |                           |                                                              |
|                 Clock                  |                  [Uhr][clock]                  | Uhr als Overlay anzeigen  |                                                              |
|           Creditserweiterung           |                                                |                           |                                                              |
|               Dashboard                |             [Dashboard][dashboard]             |                           |                                                              |
|          Eigene VGE speichern          |                                                |                           |                                                              |
|             Einsatzhelfer              |         [Einsatzhelfer][missionHelper]         |                           |                                                              |
|           Einsatzstichworte            | [Erweitertes Alarmfenster][extendedCallWindow] |     Einsatzstichworte     |                                                              |
|           Einsätze freigeben           |                                                |                           |                                                              |
|            Einsätze suchen             |                                                |                           |                                                              |
|       Erweiterte Gebäudeansicht        | [Erweiterte Gebäudeansicht][extendedBuilding]  |                           |                                                              |
|          Fahrzeuge umbenennen          |                                                |                           |                                                              |
|           FMS 5 in der Karte           |                                                |                           |                                                              |
|          Icon Gebäude Filter           | [Anpassbare Gebäudeliste][buildingListFilter]  |                           | Es werden keine Icons mehr Standardmäßig ersetzt. Dafür kann das Modul der V.4 viel mehr: Du kannst die Filter selbstständig festlegen, sowohl mit Text als auch mit Icons! |
|          Keyboard Alarmierung          |                                                |                           | Wir werden in Zukunft ein Modul für viele selbst anpassbare Hotkeys anbieten |
|         Kreis- & Landesgrenzen         |                                                |                           |                                                              |
|               Layout 01                |                                                |                           | Wir möchten ein Modul für viele Layouts anbieten, die man auch selbst anpassen kann. |
|               Layout 02                |                                                |                           | Wir möchten ein Modul für viele Layouts anbieten, die man auch selbst anpassen kann. |
|               Layout 03                |                                                |                           | Wir möchten ein Modul für viele Layouts anbieten, die man auch selbst anpassen kann. |
|               Layout 04                |                                                |                           | Wir möchten ein Modul für viele Layouts anbieten, die man auch selbst anpassen kann. |
|               LS-Heatmap               |                                                |                           |                                                              |
|         Markiert Eventeinsätze         |                                                |                           |                                                              |
|         Maßgeschneiderte Tabs          | [Erweitertes Alarmfenster][extendedCallWindow] | Eigene Fahrzeugkategorien |                                                              |
|        Meldedatum für Einsätze         | [Erweitertes Alarmfenster][extendedCallWindow] |   Generierungszeitpunkt   |                                                              |
|               MissionOut               |                                                |                           |                                                              |
|        Nachforderungen per FMS         |                                                |                           |                                                              |
|           Notification Alert           |    [Benachrichtigungen][notificationAlert]     |                           | In der V.4 gibt es viele mögliche Benachrichtigungen zur Auswahl, die auch teilweise konfigurierbar sind. |
|              Redesign 01               |                                                |                           |                                                              |
|             Release Notes              |                                                |                           | Die Releasenotes sind nativ in der V.4 integriert und nicht deaktivierbar ;) |
|         show Back Alarm Above          |                                                |                           |                                                              |
|         show Chatbutton Above          |                                                |                           |                                                              |
|      show Patient entlassen Above      |                                                |                           |                                                              |
|             Status-Zähler              |         [Statuszähler][statusCounter]          |                           |                                                              |
| Summe für die tägliche Zusammenfassung | [Creditszusammenfassung][dailyCreditsSummary]  |                           |                                                              |
|                User-ID                 |               [User-ID][userid]                |                           |                                                              |
|           Verbandsverwaltung           |                                                |                           |                                                              |
|          Verbesserte Status 5          |                                                |                           |                                                              |
|              *Vonginator*              |                                                |                           |     *Ob dieses Modul in die V.4 kommt ist noch unklar!*      |
|             Wachen Status              |       [Gebäude-Kurzinfos][buildingHover]       |                           |                                                              |
|      Wachenplanung auf der Karte       |                                                |                           |                                                              |
|             Zielort Filter             |                                                |                           |                                                              |
|               Übersicht                |             [Übersicht][overview]              |                           |                                                              |

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
