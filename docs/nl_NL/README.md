---
title: LSS-Manager V.4
lang: nl_NL
sidebarDepth: 2
---

# Wiki 🇳🇱 <Badge :text="'v.' + $themeConfig.variables.versions.short"/>

> stable: <i>{{ $themeConfig.variables.versions.stable }}</i>
> 
> beta: <i>{{ $themeConfig.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[LSSM-Server-Status](https://status.lss-manager.de)

[Game-Online-Status](https://stats.uptimerobot.com/OEKDJSpmvK)

## Over LSSM

LSS-MANAGER V.4 is een extensie voor [Meldkamerspel.com](https://www.meldkamerspel.com) en zijn andere taalversies.

Met deze extensie wordt een appstore aan het spel toegevoegd, waardoor het gebruik van plug-ins mogelijk is. Alle functies zijn modulair - u kunt zelf beslissen wat u wilt activeren, tot aan de laatste module toe.

Plug-ins die niet geactiveerd zijn, worden ook niet geladen - dit maakt het beheer natuurlijk erg gemakkelijk en zorgt voor betere prestaties.

## Installatie

Door LSSM te gebruiken, gaat u ermee akkoord dat we metadata verzamelen. Meer informatie hierover vindt u op [Metadata](metadata.md)

Een tabel waarmee de browsers LSSM compatibel is, is te vinden in onze [FAQ](faq.md#in-welke-browsers-werkt-LSS-Manager)

::: tip Gebruik LSSM op uw mobiele telefoon.
Officieel ondersteunen we geen mobiele versie. De browser Firefox biedt echter wel de mogelijkheid om add-ons te gebruiken, zelfs in de mobiele versie. Desalniettemin kunnen we geen aantrekkelijk ontwerp of volledige functionaliteit voor mobiele browsers garanderen.

Officiële ondersteuning van mobiele browsers is momenteel **niet** gepland.
:::

### Stap 1: Tampermonkey
Als u Tampermonkey nog niet in uw browser heeft geïnstalleerd, moet u dit alsnog doen. Hier is een overzicht van links voor de meest voorkomende browsers:

<tampermonkey-download-table/>

Voor andere browsers kunt u Tampermonkey downloaden op [tampermonkey.net](https://www.tampermonkey.net/).

::: warning
Houd er rekening mee dat we officieel geen oudere browsers, mobiele browsers, Apple Safari, Microsoft Edge en Internet Explorer ondersteunen. Ondersteuning voor deze browsers is daarom niet gegarandeerd en ook niet waarschijnlijk.
:::

### Stap 2: Userscript
Als Tampermonkey met succes in uw browser is geïnstalleerd, kunt u <a :href="$themeConfig.variables.server + 'lssm-v4.user.js'" target="_blank">hier</a> klikken of een nieuw gebruikersscript met de volgende inhoud:

<<< ./dist/static/lssm-v4.user.js

### Stap 3: Activeren
De LSSM-indicator is een groen gemarkeerde tekst 'LSSM V.4' of een logo.
Als je in meldkamerspel zit maar deze indicator niet in de rechterbovenhoek ziet, klik dan op het tampermonkey icoon in je browser en controleer of de schakelaar voor LSS-Manager script op `on` staat.

Bij problemen kunt u altijd contact opnemen met [Support](support.md).
