---
title: Allgemein
lang: de_DE
sidebarDepth: 2
---

# Wiki :de: <Badge :text="'LSSM V.' + ($themeConfig.variables.versions.stable || 4)"/>

*Aktuelle Versionen:*
> Stable: <i>{{ $themeConfig.variables.versions.stable }}</i>

<a :href="$themeConfig.variables.discord" target="_blank" style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Unser Discord-Server: United Dispatch" data-prevent-zooming></a>

[Server-Status](https://status.lss-manager.de)

## Über den LSSM

Der LSS-MANAGER V.4 ist eine Erweiterung für das [Leitstellenspiel.de](https://www.leitstellenspiel.de) und dessen anderssprachige Versionen.

Mit dieser Erweiterung wird ein Appstore zum Spiel hinzugefügt, welcher das Installieren von Plugins ermöglicht. Dabei sind alle Funktionen modular aufgebaut - man kann bis auf den letzten Baustein bestimmen, was alles aktiviert werden soll.

Plugins die nicht aktiviert sind, werden auch nicht geladen - das macht die Verwaltung natürlich sehr einfach und sorgt für eine bessere Performance.


## Installation :inbox_tray:
Mit der Nutzung des LSSM bist du damit einverstanden, dass wir Metadaten erheben. Mehr Informationen hierzu findest du unter [Metadaten](metadata.md)

Eine Tabelle mit welchen Browsern der LSSM kompatibel ist, findest du in unseren [FAQ](faq.md#in-welchen-browsern-funktioniert-der-lss-manager)

::: tip Den LSSM am Handy nutzen
Offiziell unterstützen wir keine mobile Version. Jedoch bietet der Browser Firefox auch in seiner mobilen Version die Möglichkeit, Add-Ons zu nutzen. Wir übernehmen jeddoch keine Garantie für ein ansprechendes Design, sowie die volle Funktionalität bei mobilen Browsern.

Eine offizielle Unterstützung mobiler Browser ist derzeit **nicht** geplant.
:::

### Schritt 1: Tampermonkey
Sofern du Tampermonkey in deinem Browser noch nicht installiert hast, musst du dies noch tun. Hier eine Übersicht der Links für die häufigsten Browser:

Browser|Link
-------|----
Chrome | [Download](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
Firefox| [Download](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
Safari | [Download](https://safari.tampermonkey.net/tampermonkey.safariextz)
Opera  | [Download](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

Für sonstige Browser kann man Tampermonkey auf [tampermonkey.net](https://www.tampermonkey.net/) herunterladen.

::: warning
Bitte beachte, dass wir ältere Browser, sowie mobile Browser und Microsoft Edge bzw. Internet Explorer nicht offiziell unterstützen. Der Support für diese Browser ist also weder garantiert, noch wahrscheinlich.
:::

### Schritt 2: Userscript
Wenn Tampermonkey in deinem Browser erfolgreich installiert wurde, kannst du entweder <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">hier</a> klicken oder ein neues Userscript mit folgendem Inhalt anlegen:

<<< ./dist/static/lssm-v4.user.js

### Schritt 3: Aktivieren
Der LSSM-Indikator ist das LSSM-Logo oder (falls in den [Einstellungen](settings.md#label-statt-icon-im-menu) entsprechend eingestellt) ein grün hinterlegter Text `LSSM V.4`.
Solltest du dich im Leitstellenspiel befinden, aber diesen Indikator nicht in der oberen rechten Ecke sehen, so klicke auf das Tampermonkey-Icon in deinem Browser und überprüfe, ob der Schalter für das LSS-Manager Script auf `an` gestellt ist.

Bei Problemen kannst du dich jederzeit an den [Support](support.md) wenden.
