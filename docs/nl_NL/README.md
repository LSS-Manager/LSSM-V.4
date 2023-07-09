---
title: LSS-Manager V.4
lang: nl-NL
sidebarDepth: 2
---

# Wiki 🇳🇱 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM server status][lssm.status]

[Spel status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Over LSSM

LSS-MANAGER V.4 is een extensie voor [Meldkamerspel.com][games.self] en zijn andere taalversies.

Met deze extensie wordt een appstore aan het spel toegevoegd, waardoor het gebruik van plug-ins mogelijk is. Alle functies zijn modulair - u kunt zelf beslissen wat u wilt activeren, tot aan de laatste module toe.

Plug-ins die niet geactiveerd zijn, worden ook niet geladen - dit maakt het beheer natuurlijk erg gemakkelijk en zorgt voor betere prestaties.

## Installatie

Door LSSM te gebruiken, gaat u ermee akkoord dat we metadata verzamelen. Meer informatie hierover vindt u op [Metadata][docs.metadata]

Een tabel waarmee de browsers LSSM compatibel is, is te vinden in onze [FAQ](faq.md#in-welke-browsers-werkt-LSS-Manager)

::: tip Gebruik LSSM op uw mobiele telefoon.
Officieel ondersteunen we geen mobiele versie. De browser Firefox biedt echter wel de mogelijkheid om add-ons te gebruiken, zelfs in de mobiele versie. Desalniettemin kunnen we geen aantrekkelijk ontwerp of volledige functionaliteit voor mobiele browsers garanderen.

Officiële ondersteuning van mobiele browsers is momenteel **niet** gepland.
:::

### Stap 1: Tampermonkey
Als u Tampermonkey nog niet in uw browser heeft geïnstalleerd, moet u dit alsnog doen. Hier is een overzicht van links voor de meest voorkomende browsers:

<tampermonkey-download-table/>

Voor andere browsers kunt u Tampermonkey downloaden op [tampermonkey.net][tampermonkey].

::: warning
Houd er rekening mee dat we officieel geen oudere browsers, mobiele browsers, Apple Safari en Internet Explorer ondersteunen. Ondersteuning voor deze browsers is daarom niet gegarandeerd en ook niet waarschijnlijk.
:::

### Stap 2: Userscript
Als Tampermonkey met succes in uw browser is geïnstalleerd, kunt u [hier][lssm.userscript] klikken of een nieuw gebruikersscript met de volgende inhoud:

@[code js](@userscript)

### Stap 3: Activeren
De LSSM-indicator is een groen gemarkeerde tekst 'LSSM V.4' of een logo.
Als je in meldkamerspel zit maar deze indicator niet in de rechterbovenhoek ziet, klik dan op het tampermonkey icoon in je browser en controleer of de schakelaar voor LSS-Manager script op `on` staat.

Bij problemen kunt u altijd contact opnemen met [Support][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /nl_NL/
[docs.apps]: /nl_NL/apps.md
[docs.appstore]: /nl_NL/appstore.md
[docs.bugs]: /nl_NL/bugs.md
[docs.error_report]: /nl_NL/error_report.md
[docs.faq]: /nl_NL/faq.md
[docs.metadata]: /nl_NL/metadata.md
[docs.other]: /nl_NL/other.md
[docs.settings]: /nl_NL/settings.md
[docs.suggestions]: /nl_NL/suggestions.md
[docs.support]: /nl_NL/support.md
[games.self]: https://meldkamerspel.com
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug