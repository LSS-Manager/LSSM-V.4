---
titel: FAQ ❓
lang: sv_SE
sidebarDepth: 3
---

# FAQ ❓

### Vad kostar LSS-Manager?
LSS-Manager är ett gratis erbjudande - vi har inte för avsikt att ändra detta.

::: warning donationer
Det finns några trevliga användare som vill donera pengar till oss. Men: LSS-Manager är och förblir gratis. Vi accepterar inte heller några donationer för detta projekt.

Detta har flera anledningar:

* Detta projekt utvecklas på frivillig basis på fritiden för de deltagande utvecklarna
* En prenumerationsvariant som liknar Premium i spelet skulle sätta för mycket press på oss personligen för att fortsätta programmera utöver vår önskan.
* Av juridiska skäl kan vi inte acceptera donationer:
    * Om vi ​​skulle hitta ett företag för LSS-Manager så att vi kunde få donationer, skulle detta inte ha någon framtid, eftersom ett företag utan kostnader inte kan vara ett företag.
    * Om vi ​​skulle köra servrarna, som för närvarande kör LSS-Manager, genom ett företag, skulle de omedelbart äta upp intäkterna.

Därför är det, förutom idén om frivillighet, ingen mening för oss att ta pengar till LSS-chefen.
:::

### Hur kan jag bidra till LSS-Manager?
Den "normala" användaren kan [report bugs][error] eller [make suggestions][suggestions].

Vi utformar för närvarande en stilguide för utvecklare så att de också enkelt kan lägga till sina egna plugins till LSSM. Vi försökte också hålla vår kodstruktur tydlig och förståelig. Att lägga till ett plugin innebär dock inte på något sätt att gå med i laget.

### Hur rapporterar jag fel?
Ta en titt på sidan [report bugs][error].

### Var kan jag få hjälp?
Genom vårt stöd. Du hittar mer information [here][support].

### Hur kan jag skicka idéer?
På sidan [suggestions][suggestions] har vi sammanställt lite information om det.

### I vilka webbläsare fungerar LSS-Manager?
Endast stationära webbläsare listas här, eftersom mobilwebbläsare inte stöds officiellt.
Denna tabell är inte nödvändigtvis korrekt än och kommer att uppdateras när ny information finns tillgänglig!

Eftersom vi vill behålla de senaste kodningsstandarderna hela tiden, är en modern och uppdaterad webbläsare nödvändig och rekommenderad - om bara av säkerhetsskäl, även utanför spelet.

::: warning kompatibilitet
En kompatibilitet som anges här garanterar inte funktionalitet. Detta är endast information som samlas in och utvärderas av tredje part.
:::

<table>
<thead>
    <tr>
        <th>Webbläsare</th>
        <th>min. version</th>
        <th>Ladda ned</th>
    </tr>
</thead>
<tbody>
    <tr v-for="({supported, download}, browser) in $themeConfig.variables.browsers">
        <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
        <td>{{ supported }}</td>
        <td><a :href="download" target="_blank">Download</a></td>
    </tr>
</tbody>
</table>

::: danger Internet Explorer och Microsoft Edge
Dessa två webbläsare kan beskrivas som "moderna barn" för en modern webbutvecklare. Det finns vissa funktioner som inte fungerar i dem eller kräver ytterligare kod.

Vi ser inte poängen med att göra detta överallt och officiellt ** stöder inte dessa två webbläsare.
:::

### Jag vill dela min inställning med vänner eller använda den på flera enheter. Är det möjligt?
För närvarande är det inte möjligt, men vi arbetar på det.

### Finns det ett sätt att spara inställningar kontobundet så att du inte behöver importera dem till en annan enhet?
För närvarande erbjuder vi inte detta, men en implementering av den här funktionen är planerad.


[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md