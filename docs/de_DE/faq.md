---
title: FAQ ❓
lang: de_DE
sidebarDepth: 3
---

# FAQ ❓

## Was kostet der LSS-Manager?
Der LSS-Manager ist ein kostenloses Angebot - wir haben auch nicht vor, dies zu ändern.
Auch wenn er sicherlich einen Mehrwert liefert, liegt keine Mehrwertsteuer auf diesem Produkt :wink:

:::warning Spenden
Es gibt ein paar nette Nutzer, die uns gerne Geld spenden möchten. Aber: Der LSS-Manager ist und bleibt kostenlos. Auch werden wir für dieses Projekt keine Spenden entgegennehmen.

Dies hat mehrere Gründe:

* Dieses Projekt wird auf freiwilliger Basis in der Freizeit der beteiligten Entwickler weiterentwickelt
* Eine Abo-Variante, ähnlich des Premium im Spiel würde uns persönlich zu sehr unter Druck setzen, auch über unsere Lust hinaus weiter zu programmieren.
* Spenden können wir aus rechtlichen Gründen nicht entgegennehmen:
    * Wenn wir für den LSS-Manager ein Unternehmen gründen würden, damit wir spenden empfangen könnten, würde dies keine Zukunft haben, da ein Unternehmen ohne Ausgaben kein Unternehmen sein kann.
    * Wenn wir die Server, welche aktuell für den LSS-Manager im Hintergrund zuständig sind, über ein Unternehmen laufen lassen würden, würden diese sofort die Einnahmen auffressen.

Daher macht es für uns, neben dem Gedanken der Freiwilligkeit, auch keinen Sinn Geld für den LSS-Manager zu nehmen.
:::

## Wie kann ich zum LSS-Manager beitragen?
Der "normale" Nutzer kann [Fehler melden][error] oder [Vorschläge einreichen][suggestions].

Wir gestalten derzeit einen Styleguide für Entwickler, damit auch diese einfach eigene Plugins dem LSSM hinzufügen können. Zudem haben wir versucht, die Code-Struktur übersichtlich und verständlich zu halten. Das Hinzufügen eines Plugins bedeutet jedoch keinen falls eine Aufnahme in das Team.

## Wie melde ich Fehler?
Bitte schaue dir unsere Seite [Fehler melden][error] an.

## Wo bekomme ich Hilfe?
Über unseren Support. Nähere Infos dazu gibt es [hier][support].

## Wie kann ich Vorschläge einreichen?
Auf der Seite [Vorschläge][suggestions] haben wir dir Informationen darüber zusammengestellt.

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

*wir haben uns hierbei an folgendem Artikel orientiert: [How to use Tampermonkey on Firefox mobile](https://enux.pl/article/en/2021-03-14/how-use-tampermonkey-firefox-mobile)*

1. Firefox Nightly für Android installieren: [Google Play](https://play.google.com/store/apps/details?id=org.mozilla.fenix)
2. im Firefox Nightly in die Einstellungen, runter scrollen bis "Über Firefox Nightly".
3. 5 Mal auf das Firefox-Logo klicken. Es kommt so ein kleines Hinweis-Ding unten, welches auf die Aktivierung des Debug-Menüs hinweist.
4. Zurück zu den Einstellungen. Im Bereich "Erweitert" ist nun ein Punkt "Benutzerdefinierte Add-on-Sammlung" aufgetaucht. Wenn man da drauf klickt, kann man eine Nutzer-ID und einen Collection-Namen eintragen. Wir haben uns die Mühe gemacht und alle Add-ons welche standardmäßig in Firefox Nightly für Android verfügbar sind zusammen mit Tampermonkey in eine Collection gepackt: [https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/](https://addons.mozilla.org/en-US/firefox/collections/16048019/tampermonkey/)
5. Bei "Benutzer-ID" `16048019` eintragen, bei "Name der Sammlung" `Tampermonkey`. Selbstverständlich ist es jedem überlassen, andere Sammlungen zu verwenden oder eigene zu erstellen. Leider scheint es keine offizielle "Collection-Sammlung" zu geben, wo man einfach durch Collections durch Browsen kann. Außerdem sind die standardmäßigen Add-Ons nur verfügbar, wenn diese in der Collection sind (so wie in der oben verlinkten Collection).

Trotzdem weisen wir nochmals explizit darauf hin, dass der LSSM nicht für mobile Endgeräte gedacht ist und unser Support somit, wenn überhaupt, nur sehr eingeschränkt vorhanden ist.


## Ich möchte mein Setup an Freunde weitergeben oder es an mehreren Geräten nutzen. Geht das?
Ja, das geht. Klicke dazu einfach in den [Einstellungen][settings] auf `Export`, um eine Datei herunterzuladen und `Import` um die Einstellungen aus einer Datei zu importieren.

## Gibt es eine Möglichkeit, Einstellungen Account-gebunden zu speichern, um sie an einem anderen Gerät nicht importieren zu müssen?
Derzeit bieten wir das nicht an, eine Implementierung dieses Features ist aber geplant.

## Wo seh ich, ob die LSSM-Server grad online sind? 
<!-- Am besten hier: [https://status.lss-manager.de/](https://status.lss-manager.de/) -->

Aktuell nur im <discord-channel channel="uptime"/> auf unserem <discord/> 

[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
[settings]: settings.md
