Das Redesign versucht sich an einer ganz neuen Methode des Game-Plays. Dazu werden nach und nach die verschiedensten
Seiten des Spiels redesigned, d.h. komplett überarbeitet. Das Ziel davon ist, das gesamte Spiel schneller laufen zu
lassen. Leider ist der Fortschritt in diesem Modul nur langsam, da das Redesign andere Scripts ohne Anpassung schnell
unbrauchbar macht.

## Das Redesign bietet nicht nur Vorteile:

|               Vorteile                |                                                                                                 Nachteile                                                                                                 |
|:-------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Das ganze Spiel läuft etwas schneller | Vielleicht wird das eine oder andere Scripts mit dem Redesign nicht einfach ohne Extra-Arbeit funktionieren. Wir kümmern uns natürlich vor dem release darum, dass alle gängigen Scripts kompatibel sind. |
|   super freshes und modernes Design   |                                                                                                                                                                                                           |

## Profil

|                        Eigenes Profil                         |                       Profil eines Verbandsmitglieds                        |                       Profil anderer Nutzer                        |
|:-------------------------------------------------------------:|:---------------------------------------------------------------------------:|:------------------------------------------------------------------:|
|       ![eigenes Profil: Text](./profiles/self/text.png)       |       ![Verbandsmitglied: Text](./profiles/alliance_members/text.png)       |       ![sonstiger Spieler: Text](./profiles/others/text.png)       |
|       ![eigenes Profil: Karte](./profiles/self/map.png)       |       ![Verbandsmitglied: Karte](./profiles/alliance_members/map.png)       |                                                                    |
|   ![eigenes Profil: Gebäude](./profiles/self/buildings.png)   |   ![Verbandsmitglied: Gebäude](./profiles/alliance_members/buildings.png)   |                                                                    |
| ![eigenes Profil: Auszeichnungen](./profiles/self/awards.png) | ![Verbandsmitglied: Auszeichnungen](./profiles/alliance_members/awards.png) | ![sonstiger Spieler: Auszeichnungen](./profiles/others/awards.png) |
|                                                               |                                                                             |   ![sonstiger Spieler: ignoriert](./profiles/others/ignore.png)    |

### Features:

* linker Rand:
    * bekannte Knöpfe
    * Kurzinfos (Dienstgrad, verdiente Credits, Verband).
        * Im eigenen Profil natürlich auch Anmeldedatum
        * Bei Verbandsmitgliedern: Die Rolle(n)
    * Profilbild
    * Kleine Grafik zur Übersicht der Auszeichnungen
        * Die Maximalzahl scheint auf den ersten Blick verwirrend: Warum kann man 23 von 15 Auszeichnungen haben? Die
          Maximalzahl kommt aber daher, dass ein Nutzer, der sich jetzt registriert so viele Auszeichnungen erhalten
          kann.
* Profiltext
* Karte mit Kartenfilter (Knöpfe über der Karte) ⇒ nur bei Verbandsmitgliedern und im eigenen Profil
* Gebäudeliste
    * nach Leitstellen sortiert
    * mit Filter und Suche
    * Springe auf der Karte des Profils zu jedem Gebäude mit dem kleinen Icon neben dem Gebäudenamen
* Liste der Auszeichnungen
* Auch die Fenster "Profiltext bearbeiten" und "Profilbild bearbeiten" wurden redesigned, um ein verbessertes
  Gesamterlebnis zu bekommen.

## AAOs

:::danger Achtung
Die AAOs sind aktuell noch in Arbeit, deshalb gibt es hier leider nur eine Vorschau, wie wir uns das
ganze schlussendlich vorstellen.
:::

![AAO Übersicht](./aao/overview.png)

## Verbandsliste & Spielerliste

|                     Verbandsliste                      |                  Spielerliste                   |
|:------------------------------------------------------:|:-----------------------------------------------:|
|       ![Verbandsliste](./alliance_list/list.png)       |       ![Spielerliste](./toplist/list.png)       | 
| ![Verbandsliste mit Suche](./alliance_list/search.png) | ![Spielerliste mit Suche](./toplist/search.png) | 

## Verbandsseiten

|                            Beispielbilder                            |                           Beispielbilder                           |
|:--------------------------------------------------------------------:|:------------------------------------------------------------------:|
|          ![Vorstellung des Verbands](./alliances/intro.png)          |                  ![Regeln](./alliances/rules.png)                  | 
|             ![Bewerbungen](./alliances/applications.png)             |            ![Mitgliederliste](./alliances/members.png)             | 
|    ![Verbandskasse (deaktiviert)](./alliances/funds_disabled.png)    |    ![Verbandskasse (aktiviert)](./alliances/funds_enabled.png)     | 
|        ![Bereitstellungsräume](./alliances/staging_areas.png)        |           ![Verbandsgebäude](./alliances/buildings.png)            |
|                ![Protokoll](./alliances/protocol.png)                | ![Lehrgänge: Zusammenfassung](./alliances/schoolings/overview.png) | 
| ![Lehrgänge mit eigenen Teilnehmern](./alliances/schoolings/own.png) |      ![Offene Lehrgänge](./alliances/schoolings/alliance.png)      | 

## Credits & Coins

|                            Beispielbilder                             |                               Beispielbilder                                |
|:---------------------------------------------------------------------:|:---------------------------------------------------------------------------:|
|          ![Einzeltransaktionen](./credits/credits_list.png)           |      ![Einzeltransaktionen](./credits/credits_list_multiple_pages.png)      | 
|              ![Übersicht](./credits/credits_summary.png)              |                                                                             | 
|         ![Tageszusammenfassung](./credits/credits_daily.png)          |         ![Tageszusammenfassung](./credits/credits_daily_filter.png)         | 
| ![Tageszusammenfassung](./credits/credits_daily_filter_yesterday.png) |                                                                             | 
|            Mittlerweile gibt es sogar einen neuen Filter:             | ![Der neue Filter der Tageszusammenfassung](./credits/daily_new_filter.png) |
|                     ![Coins](./credits/coins.png)                     |                ![Coins](./credits/coins_multiple_pages.png)                 |

## Fahrzeuge

|                         Beispielbilder                          |                     Bemerkungen                     |
|:---------------------------------------------------------------:|:---------------------------------------------------:|
|              ![Einsätze](./vehicles/missions.png)               |                                                     |
|     ![Einsätze (sortiert)](./vehicles/missions_sorted.png)      |     sortiert nach durchschnittlichem Verdienst      |
|    ![Krankenhaus auswählen](./vehicles/choose_hospital.png)     | Sprechwunsch (Patienten) inklusive Filterfunktionen |
|        ![Zellen auswählen](./vehicles/choose_prison.png)        |  Sprechwunsch (Gefangene) inklusive Filterfunktion  |
| ![Fahrzeug eines anderen Spielers](./vehicles/other_player.png) |           Fahrzeug eines anderen Spielers           |

## Aufgaben

Wir haben auch die Seite [Aufgaben und Events](https://leitstellenspiel.de/tasks/index) redesigned:

![Aufgaben](./tasks/full_size.png)

![Aufgaben im eingeklappten Status](./tasks/collapsed.png)
