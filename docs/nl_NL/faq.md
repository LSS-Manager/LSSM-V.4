---
title: FAQ ❓
lang: nl_NL
sidebarDepth: 3
---

# FAQ ❓

### Wat kost LSS Manager?
LSS-Manager is een gratis aanbieding - we zijn niet van plan dit te veranderen.

::: warning donaties
Er zijn een paar aardige gebruikers die graag geld aan ons willen doneren. Maar: de LSS-Manager is en blijft gratis. Ook accepteren we geen donaties voor dit project.

Dit heeft verschillende redenen:

* Dit project wordt op vrijwillige basis ontwikkeld in de vrije tijd van de deelnemende ontwikkelaars
* Een abonnementsvariant, vergelijkbaar met de Premium in de game, zou ons persoonlijk te veel onder druk zetten om verder te gaan dan we wilden met programmeren.
* Om juridische redenen kunnen we geen donaties accepteren:
    * Als we een bedrijf voor LSS Manager zouden oprichten zodat we donaties zouden kunnen ontvangen, zou dit geen toekomst hebben, want een bedrijf zonder kosten kan geen bedrijf zijn.
    * Als we de servers, waarop momenteel LSS Manager draait, door een bedrijf zouden laten lopen, zouden ze het inkomen onmiddellijk opeten.

Daarom heeft het naast het idee van vrijwilligheid geen zin om geld aan te nemen voor de LSS-Manager.
:::

### Hoe kan ik bijdragen aan LSS Manager?
De "normale" gebruiker kan [bugs melden][fout] of [suggesties doen][suggesties].

We zijn momenteel bezig met het ontwerpen van een stijlgids voor ontwikkelaars, zodat ook zij gemakkelijk hun eigen plug-ins aan LSSM kunnen toevoegen. We hebben ook geprobeerd onze codestructuur duidelijk en begrijpelijk te houden. Het toevoegen van een plug-in betekent echter op geen enkele manier dat u lid wordt van het team.

### Hoe kan ik bugs melden?
Kijk hoervoor op onze [meld bugs][error] pagina.

### Waar kan ik hulp krijgen?
Door onze steun. Meer informatie vindt u [hier][support].

### Hoe kan ik suggesties indienen?
Op de [suggestions][suggestions] pagina hebben we wat informatie hierover bij elkaar gezet.

### In welke browsers werkt LSS Manager?
Alleen desktopbrowsers worden hier vermeld, aangezien mobiele browsers niet officieel worden ondersteund.
Deze tabel is nog niet per se correct en zal worden bijgewerkt als er nieuwe informatie beschikbaar is!

Omdat we overal de nieuwste coderingsstandaarden willen behouden, is een moderne en up-to-date browser noodzakelijk en aanbevolen - al was het maar om veiligheidsredenen, zelfs buiten het spel.

::: warning compatibiliteit
Een hier vermelde compatibiliteit garandeert geen functionaliteit. Dit is alleen informatie die is verzameld en geëvalueerd door derden.
:::

<table>
<thead>
    <tr>
        <th>Browser</th>
        <th>min. versie</th>
        <th>Download</th>
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

::: danger Internet Explorer en Microsoft Edge
Deze twee browsers kunnen worden omschreven als de "probleemkinderen" van een moderne webontwikkelaar. Er zijn enkele functies die er niet in werken, of waarvoor extra code vereist is.

We zien het nut niet in om dit overal te doen en ondersteunen deze twee browsers daarom **niet** officieel.
:::

### Ik wil mijn installatie delen met vrienden of deze op meerdere apparaten gebruiken. Is dat mogelijk?
Momenteel is het niet mogelijk, maar we werken eraan.

### Is er een manier om accountgebonden instellingen op te slaan, zodat u ze niet op een ander apparaat hoeft te importeren?
Momenteel bieden we dit niet aan, maar een implementatie van deze functie is gepland.


[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
