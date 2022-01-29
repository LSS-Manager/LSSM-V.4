Velen spelers delen regelmatig inzetten met het team en schrijven er een kort chatbericht bij.

Deze module maakt het mogelijk dat je met 1 klik kan alarmeren, delen en het chatbericht sturen. 
In de instellingen kan je eigen chatbericht klaarzetten die als template worden gebruikt. Daarin kan je de onderstaande variabelen gebruiken. 
Daarnaast heeft deze module een integratie met de [Deel meldingen](extendedCallList.md#deel-meldingen) van de module `Uitgebreide meldingenlijst`. Dat betekent dat wanneer je die optie aanzet, er in de meldingenlijst een optie komt om bij het delen ook een chatbericht te versturen.

## Variabelen

### Credits

<code><span>{{</span>credits<span>}}</span></code> voegt het gemiddeld te verdienen credits in.

### Adres

<code><span>{{</span>address<span>}}</span></code> voegt het volledige adres in.

Je kan <code><span>{{</span>city<span>}}</span></code> gebruiken, om alleen de postcode en gemeente/plaatsnaam in te voegen.

Om ook de postcode weg te laten, kan je <code><span>{{</span>cityWithoutZip<span>}}</span></code> gebruiken.

### Nog benodigde voertuigen

<code><span>{{</span>remaining<span>}}</span></code> voegt de tekst van de rode "Missende voertuigen" balk in.

### Patiënten

<code><span>{{</span>patients<span>}}</span></code> voegt het getal van het actuele aantal patiënten in.

### Begintijd van de geplande inzet

<code><span>{{</span>beginAt<span>}}</span></code> voegt de tijd in, waarop een geplande inzet begint.

### Naam van de inzet

<code><span>{{</span>name<span>}}</span></code> voegt de naam van de inzet in.

### Langste aanrijdtijd

<code><span>{{</span>longestDrive<span>}}</span></code> voegt in wat momenteel de langste aanrijdtijd is. **Belangrijk**: Deze variable werkt niet in de meldingenlijst!

### Datum

<code><span>{{</span>today<span>}}</span></code> voegt de huidige datum (dag en maand) in, bijvoorbeeld: `13.12`

### Tijd

Je kan ook de tijdm afhankelijk van de huidige tijd invoegen. Aangezien dat wat ingewikkelder is, raden we aan om onderstaande uitleg aandachtig te lezen:

<code><span>{{</span>now+5<span>}}</span></code> zorgt dat de de tijd van 5 uur na de actuele tijd wordt ingevoegd. Bijvoorbeeld, het is nu 12:08, dan zal dit 17:08 in het chatbericht invoegen. <code><span>{{</span>now+5,5<span>}}</span></code> voegt 5,5 uur na de actuele tijd in, dus met het vorige voorbeeld zou er 17:38 ingevoegd worden. Je kan elke getal kiezen dat je bij de huidige tijd optelt.

Je kan de tijden ook naar boven of benede afronden. Bijvoorbeeld om de tijd naar boven af te ronden op een kwartier, voeg je `r15` toe achter het aantal uur. Dus als het nu 12:08 is en je gebruikt als variabel <code><span>{{</span>now+5,5r15<span>}}</span></code> dan zal er niet 17:38, maar 17:45 in het bericht komen.
Om het naar beneden af te ronden gebruik je `r-15`, dus de extra `-` achter de `r`. Je kan elke getal van 0 - 59 gebruiken om af te ronden.

Bijvoorbeeld als je 7 uur en 22,5 minuten na de actuele tijd wilt invoegen, maar dan afgerond naar beneden op een getal deelbaar door 3, dan gebruik je <code><span>{{</span>now+7.266r-3<span>}}</span></code>. 

Wanneer je het nog niet begrijpt, dan kan je onze van onze [Support](/support.md) gebruik maken.
