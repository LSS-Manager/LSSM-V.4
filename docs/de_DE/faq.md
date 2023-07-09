---
title: FAQ ❓
lang: de_DE
sidebarDepth: 3
---

# FAQ ❓

## Was kostet der LSS-Manager?
Der LSS-Manager ist ein kostenloses Angebot - wir haben auch nicht vor, dies zu ändern.
Auch wenn er sicherlich einen Mehrwert liefert, liegt keine Mehrwertsteuer auf diesem Produkt :wink:

Möchtest du uns trotzdem unterstützen? Dann kannst du uns gerne eine Spende über [OpenCollective][lssm.donations] zukommen lassen. Wir freuen uns über jede Unterstützung!

:::warning Spenden
Alle Spenden werden ausschließlich zum Decken der laufenden Kosten verwendet. Wir haben keine Gewinnabsicht und werden auch keine Gewinne ausschütten.

Das Spenden hat keinen direkten Einfluss auf die Entwicklung des LSSM! Wir werden nicht mehr und nicht weniger Zeit investieren und auch für spendende Nutzer wird es keine direkten Vorteile wie z.B. Premium-Features geben. Die Entwicklung des LSSM bleibt weiterhin auf freiwilliger Basis in unserer Freizeit und die Nutzung bleibt weiterhin für alle Nutzer vollständig kostenlos!

Selbstverständlich freuen wir uns über jede Spende, wir möchten trotzdem darauf hinweisen, dass wir das Projekt auch ohne die Spenden wie bisher weiter laufen lassen möchten.
:::

## Wie kann ich zum LSS-Manager beitragen?
Der "normale" Nutzer kann [Fehler melden][docs.error_report], [Vorschläge einreichen][docs.suggestions] oder [Spenden][lssm.donations].

Wir gestalten derzeit einen Styleguide für Entwickler, damit auch diese einfach eigene Plugins dem LSSM hinzufügen können. Zudem haben wir versucht, die Code-Struktur übersichtlich und verständlich zu halten. Das Hinzufügen eines Plugins bedeutet jedoch keinen falls eine Aufnahme in das Team.

## Wie melde ich Fehler?
Bitte schaue dir unsere Seite [Fehler melden][docs.error_report] an.

## Wo bekomme ich Hilfe?
Über unseren Support. Nähere Infos dazu gibt es [hier][docs.support].

## Wie kann ich Vorschläge einreichen?
Auf der Seite [Vorschläge][docs.suggestions] haben wir dir Informationen darüber zusammengestellt.

## Wieso werden meine Einstellungen und aktivierten Add-ons nicht gespeichert?
Das passiert nur, wenn in deinem Browser die `Indexed DB` geleert wird. Man kann das irgendwo in den Einstellungen des Browsers ändern (ist oft gleich mit den Cookie-Einstellungen).

## In welchen Browsern funktioniert der LSS-Manager?
Hier werden nur Desktop Browser aufgelistet, da mobile Browser nicht offiziell unterstützt werden.

Da wir durchgängig neueste Coding-Standards einhalten möchten, ist ein moderner und aktueller Browser notwendig und empfehlenswert - schon allein aus Sicherheitsgründen, auch außerhalb des Spiels.

<browser-support-table/>

:::danger Internet Explorer und Safari
Diese beiden Browser kann man als "Problemkinder" eines modernen Web-Entwicklers beschreiben. Es gibt einige Funktionen, die in ihnen nicht funktionieren, oder zusätzlichen Code benötigen.

Wir sehen es nicht ein, dies überall zu machen und unterstützen diese beiden Browser offiziell **nicht**.
:::

### Den LSSM am Handy nutzen
Regelmäßig erreichen uns Anfragen, ob der LSSM auch am Handy nutzbar ist.

Die Antwort lautet: Ja – über Umwege – allerdings bieten wir keinen Support dafür an. Die Aktivierung geschieht auf eigene Gefahr.

Wie geht das?

1. Firefox für Android installieren (Muss mindestens Version 110 sein)
2. Firefox starten und das Kontextmenü (drei Punkte in der Menüleiste) öffnen
3. Unter "empfohlene Addons" sollte jetzt Tampermonkey vorgeschlagen werden
4. Weiter mit der normalen [Installationsanleitung][docs.home] fortfahren

Trotzdem weisen wir nochmals explizit darauf hin, dass der LSSM nicht für mobile Endgeräte gedacht ist und unser Support somit, wenn überhaupt, nur sehr eingeschränkt vorhanden ist.


## Ich möchte mein Setup an Freunde weitergeben oder es an mehreren Geräten nutzen. Geht das?
Ja, das geht. Klicke dazu einfach in den [Einstellungen][docs.settings] auf `Export`, um eine Datei herunterzuladen und `Import` um die Einstellungen aus einer Datei zu importieren.

## Gibt es eine Möglichkeit, Einstellungen Account-gebunden zu speichern, um sie an einem anderen Gerät nicht importieren zu müssen?
Derzeit bieten wir das nicht an, eine Implementierung dieses Features ist aber geplant.

## Wo seh ich, ob die LSSM-Server grad online sind?
Am besten hier: [https://status.lss-manager.de/](https://status.lss-manager.de/)

Oder im <discord-channel channel="uptime"/> auf unserem <discord/>

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