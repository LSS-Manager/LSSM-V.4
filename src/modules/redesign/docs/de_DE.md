Das Redesign versucht sich an einer ganz neuen Methode des Game-Plays. Dazu werden nach und nach die verschiedensten
Seiten des Spiels redesigned, d.h. komplett überarbeitet. Das Ziel davon ist, das gesamte Spiel schneller laufen zu
lassen. Leider ist der Fortschritt in diesem Modul nur langsam, da das Redesign andere Scripts ohne Anpassung schnell
unbrauchbar macht.

## Das Redesign bietet nicht nur Vorteile

<!-- markdownlint-disable line-length -->

|               Vorteile                |                                                                                                 Nachteile                                                                                                 |
| :-----------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Das ganze Spiel läuft etwas schneller | Vielleicht wird das eine oder andere Scripts mit dem Redesign nicht einfach ohne Extra-Arbeit funktionieren. Wir kümmern uns natürlich vor dem release darum, dass alle gängigen Scripts kompatibel sind. |
|   super freshes und modernes Design   |                                                                                                                                                                                                           |

<!-- markdownlint-enable line-length -->

## Profil

<!-- markdownlint-disable line-length -->

|                        Eigenes Profil                         |                       Profil eines Verbandsmitglieds                        |                       Profil anderer Nutzer                        |
| :-----------------------------------------------------------: | :-------------------------------------------------------------------------: | :----------------------------------------------------------------: |
|       ![eigenes Profil: Text](assets/de_DE/profiles/self/text.png)       |       ![Verbandsmitglied: Text](assets/de_DE/profiles/alliance_members/text.png)       |       ![sonstiger Spieler: Text](assets/de_DE/profiles/others/text.png)       |
|       ![eigenes Profil: Karte](assets/de_DE/profiles/self/map.png)       |       ![Verbandsmitglied: Karte](assets/de_DE/profiles/alliance_members/map.png)       |                                                                    |
|   ![eigenes Profil: Gebäude](assets/de_DE/profiles/self/buildings.png)   |   ![Verbandsmitglied: Gebäude](assets/de_DE/profiles/alliance_members/buildings.png)   |                                                                    |
| ![eigenes Profil: Auszeichnungen](assets/de_DE/profiles/self/awards.png) | ![Verbandsmitglied: Auszeichnungen](assets/de_DE/profiles/alliance_members/awards.png) | ![sonstiger Spieler: Auszeichnungen](assets/de_DE/profiles/others/awards.png) |
|                                                               |                                                                             |   ![sonstiger Spieler: ignoriert](assets/de_DE/profiles/others/ignore.png)    |

<!-- markdownlint-enable line-length -->

### Features

* linker Rand:
    * bekannte Knöpfe
    * Kurzinfos (Dienstgrad, verdiente Credits, Verband).
        * Im eigenen Profil natürlich auch Anmeldedatum
        * Bei Verbandsmitgliedern: Die Rolle(n)
    * Profilbild
    * Kleine Grafik zur Übersicht der Auszeichnungen
        * Die Maximalzahl scheint auf den ersten Blick verwirrend:
            Warum kann man 23 von 15 Auszeichnungen haben?
            Die Maximalzahl kommt aber daher, dass ein Nutzer,
            der sich jetzt registriert so viele Auszeichnungen erhalten kann.
* Profiltext
* Karte mit Kartenfilter (Knöpfe über der Karte)
    * nur bei Verbandsmitgliedern und im eigenen Profil
* Gebäudeliste
    * nach Leitstellen sortiert
    * mit Filter und Suche
    * Springe auf der Karte des Profils zu jedem Gebäude
        mit dem kleinen Icon neben dem Gebäudenamen
* Liste der Auszeichnungen
* Auch die Fenster "Profiltext bearbeiten" und "Profilbild bearbeiten" wurden redesigned,
    um ein verbessertes Gesamterlebnis zu bekommen.

## AAOs

:::danger Achtung
Die AAOs sind aktuell noch in Arbeit, deshalb gibt es hier leider nur eine Vorschau,
wie wir uns das
ganze schlussendlich vorstellen.
:::

![AAO Übersicht](assets/de_DE/aao/overview.png)

## Verbandsliste & Spielerliste

<!-- markdownlint-disable line-length -->

|                     Verbandsliste                      |                  Spielerliste                   |
| :----------------------------------------------------: | :---------------------------------------------: |
|       ![Verbandsliste](assets/de_DE/alliance_list/list.png)       |       ![Spielerliste](assets/de_DE/toplist/list.png)       |
| ![Verbandsliste mit Suche](assets/de_DE/alliance_list/search.png) | ![Spielerliste mit Suche](assets/de_DE/toplist/search.png) |

<!-- markdownlint-enable line-length -->

## Verbandsseiten

<!-- markdownlint-disable line-length -->

|                            Beispielbilder                            |                           Beispielbilder                           |
| :------------------------------------------------------------------: | :----------------------------------------------------------------: |
|          ![Vorstellung des Verbands](assets/de_DE/alliances/intro.png)          |                  ![Regeln](assets/de_DE/alliances/rules.png)                  |
|             ![Bewerbungen](assets/de_DE/alliances/applications.png)             |            ![Mitgliederliste](assets/de_DE/alliances/members.png)             |
|    ![Verbandskasse (deaktiviert)](assets/de_DE/alliances/funds_disabled.png)    |    ![Verbandskasse (aktiviert)](assets/de_DE/alliances/funds_enabled.png)     |
|        ![Bereitstellungsräume](assets/de_DE/alliances/staging_areas.png)        |           ![Verbandsgebäude](assets/de_DE/alliances/buildings.png)            |
|                ![Protokoll](assets/de_DE/alliances/protocol.png)                | ![Lehrgänge: Zusammenfassung](assets/de_DE/alliances/schoolings/overview.png) |
| ![Lehrgänge mit eigenen Teilnehmern](assets/de_DE/alliances/schoolings/own.png) |      ![Offene Lehrgänge](assets/de_DE/alliances/schoolings/alliance.png)      |

<!-- markdownlint-enable line-length -->

## Credits & Coins

<!-- markdownlint-disable line-length -->

|                            Beispielbilder                             |                               Beispielbilder                                |
| :-------------------------------------------------------------------: | :-------------------------------------------------------------------------: |
|          ![Einzeltransaktionen](assets/de_DE/credits/credits_list.png)           |      ![Einzeltransaktionen](assets/de_DE/credits/credits_list_multiple_pages.png)      |
|              ![Übersicht](assets/de_DE/credits/credits_summary.png)              |                                                                             |
|         ![Tageszusammenfassung](assets/de_DE/credits/credits_daily.png)          |         ![Tageszusammenfassung](assets/de_DE/credits/credits_daily_filter.png)         |
| ![Tageszusammenfassung](assets/de_DE/credits/credits_daily_filter_yesterday.png) |                                                                             |
|            Mittlerweile gibt es sogar einen neuen Filter:             | ![Der neue Filter der Tageszusammenfassung](assets/de_DE/credits/daily_new_filter.png) |
|                     ![Coins](assets/de_DE/credits/coins.png)                     |                ![Coins](assets/de_DE/credits/coins_multiple_pages.png)                 |

<!-- markdownlint-enable line-length -->

## Fahrzeuge

<!-- markdownlint-disable line-length -->

|                         Beispielbilder                          |                     Bemerkungen                     |
| :-------------------------------------------------------------: | :-------------------------------------------------: |
|              ![Einsätze](assets/de_DE/vehicles/missions.png)               |                                                     |
|     ![Einsätze (sortiert)](assets/de_DE/vehicles/missions_sorted.png)      |     sortiert nach durchschnittlichem Verdienst      |
|    ![Krankenhaus auswählen](assets/de_DE/vehicles/choose_hospital.png)     | Sprechwunsch (Patienten) inklusive Filterfunktionen |
|        ![Zellen auswählen](assets/de_DE/vehicles/choose_prison.png)        |  Sprechwunsch (Gefangene) inklusive Filterfunktion  |
| ![Fahrzeug eines anderen Spielers](assets/de_DE/vehicles/other_player.png) |           Fahrzeug eines anderen Spielers           |

<!-- markdownlint-enable line-length -->

## Aufgaben

Wir haben auch die Seite
[Aufgaben und Events](https://leitstellenspiel.de/tasks/index) redesigned:

![Aufgaben](assets/de_DE/tasks/full_size.png)

![Aufgaben im eingeklappten Status](assets/de_DE/tasks/collapsed.png)
