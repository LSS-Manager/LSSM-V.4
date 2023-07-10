---
title: LSS-Manager V.4
lang: it-IT
sidebarDepth: 2
---

# Wiki 🇮🇹 <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status][lssm.status]

[Game-Online-Status](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->

## Circa LSSM

LSS-MANAGER V.4 è un estensione per [Operatore112.it][games.self] e le sue altre versioni linguistiche.

Con questa estensione un negozio viene aggiunto al gioco, che ci permette l'uso dei plugins. Tutte le funzioni sono modulari - puoi decidere cosa attivare, fino all'ultimo modulo.

I plugin che non sono attivi, non vengono neanche caricati - questo ci permette un controllo molto facile e di conseguenza ci permette delle prestazioni migliori.


## Installazione 📥
Usando LSSM, sei consapevole del fatto che noi collezioniamo i metadati. Puoi trovare maggiori informazioni su questo in [metadata][docs.metadata]

Una tabella con i browser compatibili con LSSM la puoi trovare nelle nostre [FAQ](faq.md#su-quale-browser-lss-manager-funziona)

::: tip sull'uso di LSSM su dispositivi mobili
Ufficialmente non supportiamo una versione mobile. Tuttavia, il browser Firefox offre la possibilità di usare add-on nella sua versione mobile, ma, noi non garantiamo un design attraente o la piena funzionalità.

Il supporto ufficiale per le versioni mobili attualmente **non è** in programma.
:::

### Passo 1: Tampermonkey
Se ancora non hai installato Tampermonkey nel tuo browser, devi farlo. Qui puoi trovare una panoramica dei link per i browser più comuni:

<tampermonkey-download-table/>

Per altri browser puoi scaricare Tampermonkey su [tampermonkey.net][tampermonkey].

::: warning
Si prega di notare che ufficialmente noi non forniamo supporto per browser più vecchi, Browser mobili e Apple Safari. Il supporto per questi, non è garantito.
:::

### Passo 2: Userscript
Se Tampermonkey è stato installato in maniera corretta sul browser, puoi sia cliccare [qui][lssm.userscript] o creare un nuovo userscript con il seguente contenuto:

@[code js](@userscript)

### Passo 3: Attivazione
L'indicatore di LSSM è un testo verde evidenziato `LSSM V.4`.
Se sei su Operatore112 ma non vedi questo indicatore nell'angolo in alto a destra, clicca sull'icona di tampermonkey nel browser e controlla se l'interruttore per LSS-Manager script è impostato su `on`.

Se hai qualsiasi problema puoi sempre contattarci tramite il [supporto][docs.support].

<!-- ==START_FOOTER== Do NOT edit anything below this line! Any edits will be removed as content is auto generated! -->
[lssm.status]: https://status.lss-manager.de/
[lssm.discord]: https://discord.gg/RcTNjpB
[lssm.userscript]: https://v4.lss-manager.de/lssm-v4.user.js
[lssm.donations]: https://donate.lss-manager.de/
[docs]: https://docs.lss-manager.de/
[docs.home]: /it_IT/
[docs.apps]: /it_IT/apps.md
[docs.appstore]: /it_IT/appstore.md
[docs.bugs]: /it_IT/bugs.md
[docs.error_report]: /it_IT/error_report.md
[docs.faq]: /it_IT/faq.md
[docs.metadata]: /it_IT/metadata.md
[docs.other]: /it_IT/other.md
[docs.settings]: /it_IT/settings.md
[docs.suggestions]: /it_IT/suggestions.md
[docs.support]: /it_IT/support.md
[games.self]: https://operatore112.it
[tampermonkey]: https://tampermonkey.net/
[github]: https://github.com/LSS-Manager/LSSM-V.4
[github.issues]: https://github.com/LSS-Manager/LSSM-V.4/issues
[github.issues.open]: https://github.com/LSS-Manager/LSSM-V.4/issues?q=is%3Aissue+is%3Aopen+label%3Abug