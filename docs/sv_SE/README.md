---
title: LSS-Manager V.4
lang: sv-SE
sidebarDepth: 2
---

# Wiki 🇸🇪 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Om LSSM

LSS-MANAGER V.4 är ett tillägg för [larmcentralen-spelet.se][games.self] och dess andra språkversioner.

Med den här tillägget läggs en appstore till i spelet, vilket möjliggör användning av plugins. Alla funktioner är modulära - du kan bestämma vad du vill aktivera, till den sista modulen.

Plugins som inte är aktiverade laddas inte heller - detta gör administrationen mycket lätt förstås och ger bättre prestanda.


## Installation 📥
Genom att använda LSSM samtycker du till att vi samlar in metadata. Du kan hitta mer information om detta på [Metadata][docs.metadata]

En tabell med vilken webbläsare LSSM är kompatibel finns i vår [FAQ][docs.faq]

::: tip Använda LSSM på din mobiltelefon
Officiellt stöder vi inte en mobilversion. Webbläsaren Firefox erbjuder dock möjligheten att använda tillägg även i sin mobilversion. Ändå garanterar vi inte en attraktiv design eller full funktionalitet för mobila webbläsare.

Officiellt stöd för mobilwebbläsare är för närvarande **inte** planerat.
:::

### Steg 1: Tampermonkey
Om du ännu inte har installerat Tampermonkey i din webbläsare måste du fortfarande göra det. Här är en översikt över länkar för de vanligaste webbläsarna:

<tampermonkey-download-table/>

För andra webbläsare kan du ladda ner Tampermonkey på [tampermonkey.net][tampermonkey].

::: warning
Observera att vi inte officiellt stöder äldre webbläsare, mobilwebbläsare och Apple Safari. Stöd för dessa webbläsare är därför varken garanterat eller troligt.
:::

### Steg 2: Användarskript
Om Tampermonkey lyckades installeras i din webbläsare kan du antingen klicka [här][lssm.userscript] eller skapa en nytt användarskript med följande innehåll:

@[code js](@userscript)

### Steg 3: Aktivera
LSSM-indikatorn är en grön markerad text `LSSM V.4`.
Om du befinner dig i larmcentralen-spelet men inte ser den här indikatorn i det övre högra hörnet klickar du på tampermonkey-ikonen i din webbläsare och kontrollerar om omkopplaren för LSS-Manager-skript är inställd på `on`.

Om du har några problem kan du alltid kontakta [Support][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /sv_SE/
[docs.apps]: /sv_SE/apps.md
[docs.appstore]: /sv_SE/appstore.md
[docs.bugs]: /sv_SE/bugs.md
[docs.error_report]: /sv_SE/error_report.md
[docs.faq]: /sv_SE/faq.md
[docs.metadata]: /sv_SE/metadata.md
[docs.other]: /sv_SE/other.md
[docs.settings]: /sv_SE/settings.md
[docs.suggestions]: /sv_SE/suggestions.md
[docs.support]: /sv_SE/support.md
[games.self]: https://larmcentralen-spelet.se
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug