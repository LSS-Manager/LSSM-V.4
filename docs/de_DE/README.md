---
title: LSS-Manager V.4
lang: de-DE
sidebarDepth: 2
---

# Wiki 🇩🇪 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[Online-Status: LSSM][lssm.status]

[Online-Status: Spiel](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Über den LSSM

Der LSS-MANAGER V.4 ist eine Erweiterung für das [Leitstellenspiel.de][games.self] und dessen anderssprachige Versionen.

Mit dieser Erweiterung wird ein Appstore zum Spiel hinzugefügt, welcher das Installieren von Plugins ermöglicht. Dabei sind alle Funktionen modular aufgebaut - man kann bis auf den letzten Baustein bestimmen, was alles aktiviert werden soll.

Plugins die nicht aktiviert sind, werden auch nicht geladen - das macht die Verwaltung natürlich sehr einfach und sorgt für eine bessere Performance.


## Installation :inbox_tray:
Mit der Nutzung des LSSM bist du damit einverstanden, dass wir Metadaten erheben. Mehr Informationen hierzu findest du unter [Metadaten][docs.metadata].

Eine Tabelle mit welchen Browsern der LSSM kompatibel ist, findest du in unseren [FAQ](faq.md#in-welchen-browsern-funktioniert-der-lss-manager).

:::tip Den LSSM am Handy nutzen
Offiziell unterstützen wir keine mobile Version. Jedoch bietet der Browser Firefox auch in seiner mobilen Version die Möglichkeit, Add-Ons zu nutzen (siehe [FAQ](faq.md#den-lssm-am-handy-nutzen)). Wir übernehmen jedoch keine Garantie für ein ansprechendes Design, sowie die volle Funktionalität bei mobilen Browsern.

Eine offizielle Unterstützung mobiler Browser ist derzeit **nicht** geplant.
:::

### Schritt 1: Tampermonkey
Sofern du Tampermonkey in deinem Browser noch nicht installiert hast, musst du dies noch tun. Hier eine Übersicht der Links für die häufigsten Browser:

<tampermonkey-download-table/>

Für sonstige Browser kann man Tampermonkey auf [tampermonkey.net][tampermonkey] herunterladen.

:::warning
Bitte beachte, dass wir ältere Browser, sowie mobile Browser und Safari nicht offiziell unterstützen. Der Support für diese Browser ist also weder garantiert, noch wahrscheinlich.
:::

### Schritt 2: Userscript
Wenn Tampermonkey in deinem Browser erfolgreich installiert wurde, kannst du entweder [hier][lssm.userscript] klicken oder ein neues Userscript mit folgendem Inhalt anlegen:

@[code js](@userscript)

### Schritt 3: Aktivieren
Der LSSM-Indikator ist das LSSM-Logo oder (falls in den [Einstellungen](settings.md#label-statt-icon-im-menu) entsprechend eingestellt) ein grün hinterlegter Text `LSSM V.4`.

Ein Klick auf den Indikator öffnet ein kleines Menü, über das du in den [Appstore][docs.appstore] und in die [Einstellungen][docs.settings] gelangen kannst. In den Einstellungen tauchen nur die Module auf, die du aktiviert hast, du musst also erst den AppStore besuchen!

Solltest du dich im Leitstellenspiel befinden, aber diesen Indikator nicht in der oberen rechten Ecke sehen, so klicke auf das Tampermonkey-Icon in deinem Browser und überprüfe, ob der Schalter für das LSS-Manager Script auf `an` gestellt ist.

Bei Problemen kannst du dich jederzeit an den [Support][docs.support] wenden.

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