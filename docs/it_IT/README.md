---
title: LSS-Manager V.4
lang: it_IT
sidebarDepth: 2
---

# Wiki 🇮🇹 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

## Circa LSSM

LSS-MANAGER V.4 è un estensione per [Operatore112.it](https://www.operatore112.it/) e le sue altre versioni linguistiche.

Con questa estensione un negozio viene aggiunto al gioco, che ci permette l'uso dei plugins. Tutte le funzioni sono modulari - puoi decidere cosa attivare, fino all'ultimo modulo.

I plugin che non sono attivi, non vengono neanche caricati - questo ci permette un controllo molto facile e di conseguenza ci permette delle prestazioni migliori.


## Installazione 📥
Usando LSSM accetti che noi collezioniamo i metadati. Puoi trovare maggiori informazioni su questo in [Metadata](metadata.md)

Una tabella con i browser compatibili con LSSM la puoi trovare nelle nostre [FAQ](faq.md#su-quale-browser-lss-manager-funziona)

::: tip sull'uso di LSSM su dispositivi mobili
Ufficialmente non supportiamo una versione mobile. Tuttavia, il browser Firefox offre la possibilità di usare add-on nella sua versione mobile. Tuttavia, noi non garantiamo un design attraente o la piena funzionalità per i browser mobili.

Supporto ufficiale per le versioni mobili attualmente **non è** programmato.
:::

### Passo 1: Tampermonkey
Se ancora non hai installato Tampermonkey nel tuo browser, devi farlo. Qui puoi trovare una panoramica dei link per i browser più comuni:

<tampermonkey-download-table/>

Per altri browser puoi scaricare Tampermonkey su [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Si prega di notare che ufficialmente noi non forniamo supporto per browser più vecchi, Browser mobili e Microsoft Edge o Internet Explorer. Il supporto per questi browser non è garantito.
:::

### Passo 2: Userscript
Se Tampermonkey è stato installato in maniera corretta sul browser, puoi sia cliccare <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">qui</a> o creare un nuovo userscript con il seguente contenuto:

<<< ./dist/static/lssm-v4.user.js

### Passo 3: Attivazione
L'indicatore di LSSM è un testo verde evidenziato `LSSM V.4`.
Se sei su Operatore112 ma non vedi questo indicatore nell'angolo in alto a destra, clicca sull'icona di tampermonkey nel browser e controlla se l'interruttore per LSS-Manager script è impostato su `on`.

Se hai qualsiasi problema puoi sempre contattarci [Supporto](support.md).
