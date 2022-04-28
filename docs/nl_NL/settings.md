---
title: Instellingen ⚙️
lang: nl_NL
---

# Instellingen ⚙️

De instellingen van alle modules worden centraal beheerd in de instellingen. Alleen de instellingen van actieve modules kunnen worden gewijzigd.

Het is de bedoeling om een mogelijkheid toe te voegen om de instellingen te exporteren en importeren zoals in `LSSM V.3`.
Daarnaast willen we de mogelijkheid bieden om in de nabije toekomst instellingen profielgebonden op te slaan. Dit betekent dat instellingen niet langer apparaatgebonden zijn.

:::tip Veranderingen
Zodra je de instellingen verlaat en de wijzigingen hebt opgeslagen, wordt het spel opnieuw geladen om alle instellingen gemakkelijk toe te passen.
Als u niet-opgeslagen wijzigingen heeft, kunt u de instellingen niet sluiten, u krijgt een klein meldingsbericht.
:::

:::danger Reset de instellingen
Let op: Als u instellingen reset, kunnen ze niet worden hersteld zonder voorafgaande export!
:::


## Moment.js
Dit gedeelte geeft uitleg om de datum/tijd in te stellen, bijvoorbeeld in de module [clock](modules/clock.md).

Wij gebruiken [Moment.js](https://momentjs.com/), om u een zo breed mogelijke keuze aan configuratie-opties te kunnen bieden.
Hieronder proberen we de mogelijkheden zo duidelijk mogelijk op een rij te zetten. U vindt het originele document in de [Moment.js Documentatie](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Live-Bewerker
Probeer je eigen formaat hier en zie een live voorbeeld! Zie informatie voor de variabalen hieronder.

<momentjs-preview/>

### Variables
<momentjs-variables/>

### Lokale korte varianten
<momentjs-shorts/>

### Normale Tekst
Wil je normale tekst toevoegen in de datum/tijdnotatie, bijvoorbeeld: `Tijd: hh:mm`, dan zal de `d` door een weekdagnummer vervangen worden. Bijvoorbeeld: `Tij6: 08:33`.
Dit kan je voorkomen door de normale tekst, in dit geval `Tijd:`, tussen blokhaken te zetten `[]`, dus in dit voorbeeld `[Tijd:] hh:mm`.
Eigenlijk is het voldoende om de `d` tussen bloklhaken te zetten, maar voor de leesbaarheid van de jouw geschreven tekst is het beter om het hele woord er tussen te zetten.
