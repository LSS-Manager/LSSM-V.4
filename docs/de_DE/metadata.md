---
title: Metadaten
lang: de_DE
sidebarDepth: 0
---

# Erheben von Metadaten der Nutzer

Mit der Nutzung des `LSSM` (Leitstellenspiel Manager, Userscript für den Browser) akzeptiert der Nutzer, das Metadaten erhoben werden. Es werden folgende Daten gespeichert:

* Eindeutige Nutzer-ID (User ID)
    * inklusive eindeutigem Secret (eindeutige, nicht-öffentliche Zeichenkette zur Identifikation)
* Nutzername
* Anzahl der Gebäude
* Aktuell genutzter Browser
    * inklusive Version
* Zeitpunkt der Erhebung der Metadaten
* aktivierte Module
* Sprachversion des Spiels
    * inklusive Information, ob Polizei-Version (falls vorhanden) oder nicht
* Welcher Kartentyp aktiviert ist (OSM oder Mapkit)
* LSSM Version
* LSSM Branch (`stable`, `beta` oder ein preview-branch)
* Version des installierten LSSM Userscripts

Diese Daten dienen zur Verbesserung der Erweiterung sowie als Anhaltspunkt für die Entwicklung bestehender bzw. zukünftiger Module.
Ebenso sind sie Grundlage spannender Statistiken, die z.B. als News veröffentlicht werden können (für weitere Informationen, siehe [weiter unten](#veroffentlichung-von-statistiken)).

**Der Nutzer kann die Erhebung dieser Daten jederzeit in den [Einstellungen][docs.settings] (de-)aktivieren.**

**Eine Löschung bereits erhobener Daten kann jederzeit durch eine Nachricht an die Entwickler über einen der unter [Support][docs.support] aufgelisteten Wege oder per formloser E-Mail an `developer[at]lss-manager.de` beantragt werden.**

Bei jedem Aufruf der Hauptseite des Spiels werden die Telemetrie-Daten (falls aktiviert) an den LSSM-Server gesendet.
Ist bereits ein Datensatz für den Nutzer vorhanden, so wird dieser überschrieben, ein Verlauf der Einzeldaten wird nicht gespeichert.
Hat ein Datensatz für mehr als 6 Monate keine Aktualisierung erhalten, so wird dieser automatisch gelöscht.

# Veröffentlichung von Statistiken

Folgende Statistiken der Telemetrie können durch das LSSM-Team veröffentlicht werden:

* Gesamtzahl der aktuellen Telemetrie-Einträge für folgende Zeiträume:
    * vergangene 6 Monate
    * vergangene 30 Tage
    * vergangene 7 Tage
    * vergangene 24 Stunden
    * heutiges Kalenderdatum nach deutscher Zeit
* Zahl der Telemetrie-Einträge von Nutzern mit bzw. ohne Premium-Account
* Zahl der Telemetrie-Einträge pro Sprachversion
    * inklusive Aufteilung in Polizeiversion und "normale" Version, falls vorhanden
* Zahl der Telemetrie-Einträge pro Browser
    * inklusive Aufteilung in Major-Version des Browsers. D.h. "Firefox 100.3" und "Firefox 100.4" werden als "Firefox 100" zusammengefasst.
* Zahl der Telemetrie-Einträge pro Kartentyp
* Zahl der Telemetrie-Einträge pro LSSM-Version
* Zahl der Telemetrie-Einträge für jedes der verfügbaren Module

Durch diese Statistiken ist das Rückschließen auf einzelne Datensätze **nicht** möglich.

## Erhebung von Metadaten durch Drittanbieter

Der LSSM selber nutzt keine Tools, Libraries, Hilfsmittel o.ä., welche Metadaten der Nutzer erheben könnten.
Mit der Nutzung eines Browsers und eines Userscript-Managers, wie z.B. [Tampermonkey][tampermonkey] ist eine Erhebung von Metadaten durch diese nicht ausgeschlossen.
Sämtliche dieser erhobenen Daten sind für das LSSM-Team nicht zugänglich oder einsehbar und können durch den LSSM auch nicht unterbunden, begünstigt oder manipuliert werden.
Informationen über die Datenerhebung der jeweils genutzten Software ist den Informationsquellen der jeweiligen Software zu entnehmen.

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /de_DE/
[docs.apps]: /de_DE/apps.md
[docs.appstore]: /de_DE/appstore.md
[docs.bugs]: /de_DE/bugs.md
[docs.error_report]: /de_DE/error_report.md
[docs.faq]: /de_DE/faq.md
[docs.metadata]: /de_DE/metadata.md
[docs.other]: /de_DE/other.md
[docs.settings]: /de_DE/settings.md
[docs.suggestions]: /de_DE/suggestions.md
[docs.support]: /de_DE/support.md
[games.self]: https://leitstellenspiel.de
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug