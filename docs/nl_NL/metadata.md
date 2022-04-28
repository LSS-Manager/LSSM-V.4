---
title: Metadata
lang: nl_NL
sidebarDepth: 0
---

# Verzamelen van gebruikers metadata

Door `LSSM` (Leitstellenspiel Manager, userscript voor de browser) te gebruiken, accepteert de gebruiker dat metadata zal worden verzameld. De volgende data zal worden opgeslagen:
* Unieke gebruikers ID
  * inclusief uniek geheim (uniek, niet-publiek tekst for identificatie)
* Gebruikersnaam
* Aantal gebouwen
* Gebruikte browser
  * inclusief versie
* tijd van het verzamelen van de metadata
* Premiumgebruiker of niet
* Modules die aan staan
* Taalversie van het spel
  * inclusief informatie of het de politieversie is of niet
* welke kaart type wordt gebruikt (OSM of Mapkit)
* LSSM versie

Deze data wordt gebruikt om de extensie te verbeteren, maar ook als gids voor de ontwikkeling van bestaande of toekomstige modules.
Ze zijn ook de basis voor spannende statistieken, welke gepubliceerd kunnen worden, bijvoorbeeld als nieuws (voor meer informatie, zie [onder](#publiceren-van-statistieken)).

**De gebruiker kan het verzamelen van deze data op elk moment (de)activeren in de [instellingen](settings.md).**

**Verwijderd van reeds verzamelde data kan verzocht worden op elk moment door een bericht (indien mogelijk in het Engels) naar de ontwikkelaars te sturen via een weg genoemd in [support](support.md) of door een informele e-mail te sturen naar `developer[at]lss-manager.de`.**

Elke keer als de home-pagina is geopend, wordt de data verstuurd naar de LSSM server.
Als er al reeds data bestaat voor de gebruiker, zal deze worden overschreven. Een historie van individuele data wordt niet opgeslagen.
Als de data niet wordt geüpdate in 6 maanden, dan wordt deze automatisch verwijderd.

## Publiceren van statistieken

De volgende statistieken mogen door het LSSM team worden gepubliceerd:
* Totaal aantal huidige gebruikers waarvan de data is opgeslagen voor de volgende tijdsperiodes:
  * afgelopen 6 maanden
  * agelopen 30 dagen
  * afgelopen 7 dagen
  * afgelopen 24 uur
  * kalenderdag volgens de Duitse tijdszone.
* Aantal huidige gebruikers met of zonder premium account
* Aantal huidige gebruiker per taalversie
  * inclusief splitsing in the politie versie en normale versie indien van toepassing
* Aantal huidige gebruikers per browser
  * Inclusief splitsing in the hoofdversies van de browser. Bijvoorbeeld "Firefox 100.3" en "Firefox 100.4" zijn gecombineerd als "Firefox 100".
* Aantal huidige gebruikers per kaarttype
* Aantal huidige gebruiker per LSSM versie
* Aantal huidige gebruikers voor elke beschikbare module

 Referen naar individuele gebruikers is **niet** mogelijk door deze statistieken.

## Collectie van metadata door derden

LSSM zelf gebruikt geen derde partijen die metadata kunnen verzamelen van de gebruikers.
Door het gebruiken van een browser en de userscript manager, zoals [Tampermonkey](https://tampermonkey.net), kunnen zij metadata verzamelen.
Al deze verzamelde metadata is niet beschikbaar of leesbaar voor het LSSM team en kan niet worden voorkomen, begunstigd of gewijzigd door LSSM.
Informatie over deze dataverzameling van de respectievelijke software die gebruikt wordt, kan worden gevonden in de informatie van deze software.
