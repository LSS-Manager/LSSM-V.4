---
titel: Allmänt
lang: sv_SE
sidofält Djup: 2
---

# Wiki: gb: <Badge: text = "'LSSM V.' + ($ themeConfig.variables.versions.stable || 4) "/>

* Nuvarande versioner: *
> Stabil: <i> {{$ themeConfig.variables.versions.stable}} </i>

## Om LSSM

LSS-MANAGER V.4 är en tillägg för [larmcentralen-spelet.se] (https://www.larmcentralen-spelet.se) och dess andra språkversioner.

Med den här tillägget läggs en appstore till i spelet, vilket möjliggör användning av plugins. Alla funktioner är modulära - du kan bestämma vad du vill aktivera, till den sista modulen.

Plugins som inte är aktiverade laddas inte heller - detta gör administrationen mycket lätt förstås och ger bättre prestanda.


## Installation 📥
Genom att använda LSSM samtycker du till att vi samlar in metadata. Du kan hitta mer information om detta på [Metadata] (metadata.md)

En tabell med vilken webbläsare LSSM är kompatibel finns i vår [FAQ] (faq.md # in-which-browsers-does-lss-manager-work)

::: tips Använda LSSM på din mobiltelefon
Officiellt stöder vi inte en mobilversion. Webbläsaren Firefox erbjuder dock möjligheten att använda tillägg även i sin mobilversion. Ändå garanterar vi inte en attraktiv design eller full funktionalitet för mobila webbläsare.

Officiellt stöd för mobilwebbläsare är för närvarande ** inte ** planerat.
:::

### Steg 1: Tampermonkey
Om du ännu inte har installerat Tampermonkey i din webbläsare måste du fortfarande göra det. Här är en översikt över länkar för de vanligaste webbläsarna:

Webbläsare | Länk
------- | ----
Chrome | [Ladda ner] (https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
Firefox | [Ladda ner] (https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
Safari | [Ladda ner] (https://safari.tampermonkey.net/tampermonkey.safariextz)
Opera | [Ladda ner] (https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

För andra webbläsare kan du ladda ner Tampermonkey på [tampermonkey.net] (https://www.tampermonkey.net/).

::: varning
Observera att vi inte officiellt stöder äldre webbläsare, mobilwebbläsare och Microsoft Edge eller Internet Explorer. Stöd för dessa webbläsare är därför varken garanterat eller troligt.
:::

### Steg 2: Användarskript
Om Tampermonkey lyckades installeras i din webbläsare kan du antingen klicka <a :href="$themeConfig.variables.server +'lssm-v4.user.js'" target="_blank"> här </a> eller skapa en nytt användarskript med följande innehåll:

<<< ./dist/static/lssm-v4.user.js

### Steg 3: Aktivera
LSSM-indikatorn är en grön markerad text 'LSSM V.4'.
Om du befinner dig i larmcentralen-spelet men inte ser den här indikatorn i det övre högra hörnet klickar du på tampermonkey-ikonen i din webbläsare och kontrollerar om omkopplaren för LSS-Manager-skript är inställd på 'on'.

Om du har några problem kan du alltid kontakta [Support] (support.md).