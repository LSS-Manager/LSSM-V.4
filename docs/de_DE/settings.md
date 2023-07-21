---
title: Einstellungen ⚙️
lang: de_DE
---

# Einstellungen :gear:

In den Einstellungen werden die Einstellungen aller Module zentral verwaltet. Es können nur die Einstellungen aktiver
Module verändert werden.

Mittels der Knöpfe `Export` und `Import` kannst du deine Einstellungen in einer Datei sichern und / oder an deine
Freunde weitergeben.
Wir möchten in naher Zukunft die Möglichkeit bieten, Einstellungen profilgebunden zu speichern. Damit sind Einstellungen
nicht mehr an ein Gerät gebunden.

:::tip Änderungen
Sobald du die Einstellungen verlässt und gespeicherte Änderungen hast, wird das Spiel neu geladen, um alle Einstellungen
problemlos zu übernehmen.
Hast du ungespeicherte Änderungen, kannst du die Einstellungen nicht schließen, es kommt eine kleine Hinweis-Meldung.
:::

:::danger Zurücksetzen der Einstellungen
Vorsicht: Setzt du Einstellungen zurück, können sie ohne den vorherigen Export nicht wieder hergestellt werden!
:::

## Allgemeine Einstellungen

### Label statt Icon im Menü

Standardmäßig wird in der Navigationsleiste das LSSM-Logo als Menü-Kopf angezeigt. Manchen suspekten Nutzern ist die
Nutzung eines einfachen grün hinterlegten Textes aber lieber. Deshalb kann man dieses mit dieser Einstellung aktivieren.

### Telemetrie erlauben

Damit kannst du bestimmen, ob der LSSM [Metadaten][docs.metadata] senden darf oder nicht.

### LSSM-Icon Hintergrund

Diese Einstellung legt die Hintergrundfarbe des LSSM-Icons bzw. des Labels fest.

### Navigationsleiste einfärben

Du möchtest die Farbe aus [`LSSM-Icon Hintergrund`](#lssm-icon-hintergrund) als Farbe für alle Navigationsleisten haben?
Das geht mit dieser Einstellung ganz einfach!

### Dunkle Tooltips in der Karte

Hast du das dunkle Design aktiv, sind die Tooltips (Fahrzeug-/Einsatznamen etc.) trotzdem hell. Mittels diesem Feature
lässt sich das ganz einfach korrigieren, sodass auch die Tooltips dunkel sind.

### V3 Menü als Untermenü

Hat man viele Scripts aktiv, so wird die Navigationsleiste des Spiels schnell sehr voll. Mit dieser Einstellung wird das
Menü des LSSM V.3 in das Menü der V4 verschoben:

![V3 Menü als Untermenü](/img/de_DE/v3submenu.png)

### Ladekreisel anzeigen

Ist diese Einstellung aktiv, zeigt der LSSM einen kleinen Ladekreisel in der unteren rechten Ecke an, wenn er eigene
Dateien lädt.

### Debug-Modus

Ein kleiner Debug-Modus, der hilfreiche Hinweise in der Browserkonsole ausgibt. Das Aktivieren wird nur empfohlen, wenn
durch das LSSM-Team darum bittet, da die Konsole viele Nachrichten enthalten wird.

## Moment.js

Dieser Abschnitt bietet dir eine Hilfestellung bei der Konfiguration von Daten und Uhrzeiten, die du selber einstellen
kannst, z.B. im Modul [Uhr](modules/clock.md).

Wir nutzen [Moment.js](https://momentjs.com/), um dir eine möglichst breite Auswahl an Konfigurationsmöglichkeiten
bieten zu können.
Im Folgenden versuchen wir die Möglichkeiten so verständlich wie möglich aufzulisten. Das Original-Dokument dazu findest
du in der [Moment.js Dokumentation](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Live-Editor

Probiere hier dein Format aus und sieh, was bei rauskommt! Informationen zur Konfiguration findest du in den Abschnitten
darunter.

<momentjs-preview/>

### Variablen

<momentjs-variables/>

### Lokale Kurzformen

<momentjs-shorts/>

### Normaler Text

Möchte man die aktuelle Uhrzeit mit nachfolgendem `Uhr` ausgeben lassen, also z.B. `08:33:31 Uhr`, kann man
einfach `LTS Uhr` schreiben. Das Problem hierbei ist jedoch, dass das `h` ebenfalls ersetzt wird. Das Ergebnis
wäre `08:33:31 U8r`.
Deshalb kann man reinen Text "ausklammern", um eine Formatierung zu verhindern. Das geschieht, indem man ihn in eckige
Klammern `[]` setzt. Eigentlich ist nur das Umklammern von Variablen im reinen Text nötig, um eine schönere und
lesbarere Formatierung zu erhalten kann man aber auch den gesamten Text in Klammern setzen.
Das oben gewünschte Ergebnis von `08:33:31 Uhr` erreicht man über `LTS [Uhr]` oder `LTS U[h]r`. 

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