Velen spelers delen regelmatig inzetten met het team en schrijven er een kort chatbericht bij.

Deze module maakt het mogelijk dat je met 1 klik kan alarmeren, delen en het chatbericht sturen. 
In de instellingen kan je eigen chatbericht klaarzetten die als template worden gebruikt. Daarin kan je de onderstaande variabelen gebruiken. 
Daarnaast heeft deze module een integratie met de [Deel meldingen](../extendedCallList/#deel-meldingen) van de module `Uitgebreide meldingenlijst`. Dat betekent dat wanneer je die optie aanzet, er in de meldingenlijst een optie komt om bij het delen ook een chatbericht te versturen.

## Variabelen

### Credits

<variable variable="credits"/> voegt het gemiddeld te verdienen credits in.

### Adres

<variable variable="address"/> voegt het volledige adres in.

Je kan <variable variable="city"/> gebruiken, om alleen de postcode en gemeente/plaatsnaam in te voegen.

Om ook de postcode weg te laten, kan je <variable variable="cityWithoutZip"/> gebruiken.

### Nog benodigde voertuigen

<variable variable="remaining"/> voegt de tekst van de rode "Missende voertuigen" balk in.

### Patiënten

<variable variable="patients"/> voegt het getal van het actuele aantal patiënten in.

### Begintijd van de geplande inzet

<variable variable="beginAt"/> voegt de tijd in, waarop een geplande inzet begint.

### Naam van de inzet

<variable variable="name"/> voegt de naam van de inzet in.

### Langste aanrijdtijd

<variable variable="longestDrive"/> voegt in wat momenteel de langste aanrijdtijd is. **Belangrijk**: Deze variable werkt niet in de meldingenlijst!

### Datum

<variable variable="today"/> voegt de huidige datum (dag en maand) in, bijvoorbeeld: `19.10`

### Tijd

Je kan ook de tijdm afhankelijk van de huidige tijd invoegen. Aangezien dat wat ingewikkelder is, raden we aan om onderstaande uitleg aandachtig te lezen:

<variable variable="now+5"/> zorgt dat de de tijd van 5 uur na de actuele tijd wordt ingevoegd. Bijvoorbeeld, het is nu 12:08, dan zal dit 17:08 in het chatbericht invoegen. <variable variable="now+5,5"/> voegt 5,5 uur na de actuele tijd in, dus met het vorige voorbeeld zou er 17:38 ingevoegd worden. Je kan elke getal kiezen dat je bij de huidige tijd optelt.

Je kan de tijden ook naar boven of benede afronden. Bijvoorbeeld om de tijd naar boven af te ronden op een kwartier, voeg je `r15` toe achter het aantal uur. Dus als het nu 12:08 is en je gebruikt als variabel <variable variable="now+5,5r15"/> dan zal er niet 17:38, maar 17:45 in het bericht komen.
Om het naar beneden af te ronden gebruik je `r-15`, dus de extra `-` achter de `r`. Je kan elke getal van 0 - 59 gebruiken om af te ronden.

Bijvoorbeeld als je 7 uur en 22,5 minuten na de actuele tijd wilt invoegen, maar dan afgerond naar beneden op een getal deelbaar door 3, dan gebruik je <variable variable="now+7.266r-3"/>. 

Wil je de bijbehorende datum weergeven, dan voeg je eenvoudig een `d` toe aan de variabele: <code v-html="'{{now+5r0d}}'"></code> wordt bijvoorbeeld op 24.03.2020 om 10:32 de volgende uitkomst: `16:00 (24.03.)`, dezelfde dag om 21:43 wordt dat `03:00 (25.03.)`. 

Wanneer je het nog niet begrijpt, dan kan je onze van onze [Support](../../support.md) gebruik maken.
