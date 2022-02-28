Voor (Co-)admins schrijven vaak dezelfde standaard teksten naar teamleden. Daar is deze module voor bedacht.

## Aanmaken templates

In de instellingen kan je nieuwe templates aanmaken, daarvoor kan je gebruik maken van variabelen.

## Variabelen

### Gebruikersnaam

Daarvoor kan je de variabele <code v-html="'{{username}}'"></code> gebruiken, deze wordt **bij nieuwe berichten** door de gebruikersnaam van de ontvanger vervangen.

:::tip Waarom werkt het alleen bij nieuwe berichten?
Heel eenvoudig: Momenteel hebben we niet bij bestaande berichten de mogelijkheid om de ontvanger eenvoudig te selecteren!
:::


### Datum

Met <code v-html="'{{today}}'"></code> Kan je heel eenvoud de datum van vandaag invoegen.

Wil je een datum in de toekomst toevoegen, bijvoorbeeld vandaag over 2 weken? Dan gebruik je daarvoor: <code v-html="'{{today+14}}'"></code>, om vandaag + 14 dagen te gebruiken. Hetzelfde werkt bijvoorbeeld: <code v-html="'{{today-436}}'"></code>, om 436 dagen voor vandaag in te voegen.


## Gebruik templates

In nieuwe berichten kan je de templates gebruiken om een bericht te sturen. In het scherm staat een knop waar je de templates kan selecteren op basis van de naam die je hebt gegeven aan dat template.
