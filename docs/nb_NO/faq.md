---
title: FAQ ❓
lang: nb_NO
sidebarDepth: 3
---

# FAQ ❓

### Hva koster LSS Manager?
LSS-Manager er gratis - sånn det skal det være.
::: warning donations
Det er enkelte hyggelige brukere som ønsker å donere penger til prosjektet. Men:
LSS-Manager er og kommer til å være gratis, vi kommer ikke til å akseptere donasjoner for dette prosjektet.

Det er flere årsaker til det:

* Dette prosjektet er utviklet av frivillige på fritiden til deltagende utviklere.
* Et abonnement, lignende premium i spillet setter for mye press på utviklere personlig.
* Av juridiske årsaker kan vi ikke akseptere donasjoner:
    * Dersom vi stiftet et selskap for LSS Manager, slik at vi kunne motta donasjoner, hadde ikke vi hatt en fremtid, fordi et selskap uten utgifter ikke kan være et selskap.
    * Dersom vi hadde kjørt serverene som pr. i dag kjører LSS Manager, gjennom et selskap, hadde de umiddelbart brukt opp inntekten.

Derfor gir det ikke meningen for oss å ta penger for LSS-Manager.
:::

### Hvordan kan jeg bidra til LSS Manager?
Brukere kan 
The "normal" user can [rapportere feil][error] eller [komme med forslag][suggestions].

Vi utvikler en guide for utviklere, slik at de også enkelt kan legge til deres egne utvidelser til LSSM. Vi forsøker å holde kodestrukturen klar og forståelig. Det er viktig å vite at dersom man legger til sin utvidelse blir man ikke automatisk med i teamet.

### Hvordan rapporterer jeg feil?
Vennligst se [rapporter feil][error].

### Hvor kan jeg få hjelp?
Gjennom vår brukerstøtte. Du kan få mer informasjon [here][support].

### Hvor kan jeg komme med forslag?
På [Forslag][suggestions] siden har vi skrevet litt informasjon om hvordan du kan komme med forslag.

### I hvilke nettlesere fungerer LSS Manager?
Kun nettlesere for PC er oppgitt her, siden nettlesere for mobil ikke er offisielt støttet.
Denne oversikten er ikke nødvendigvis korrekt enda, og blir oppdatert når ny informasjon er tilgjengelig!

Siden vi ønsker å beholde siste nytt innenfor kodestandarder, en moderne og oppdatert nettleser er nødvendig og anbefalt - av sikkerhetsårsaker, selv utenfor spillet.



::: warning compatibility
En kompilitet listet her garanterer ikke at det fungerer. Denne informasjonen er samlet og evaluert av tredjeparter.
:::

<table>
<thead>
    <tr>
        <th>Browser</th>
        <th>min. version</th>
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

::: danger Internet Explorer og Microsoft Edge
Disse nettleserene kan beskrives som "problembarnene" til en moderne web-koder. 

Det er noen funksjoner som ikke fungerer i dem og vi støtter offisielt ikke disse nettleserene.

:::

### Jeg vil dele oppsettet mitt med venner eller bruke det på flere enheter, er det mulig? 
Det er for øyeblikket ikke mulig, men vi jobber med det.
Currently it is not possible, but we are working on it.

### Er det mulig å lagre innstillingene jeg har valgt så jeg slipper å importere til en annen enhet?
For øyeblikket støtter vi ikke det, men vi jobber med det.

[support]: support.md
[error]: error_report.md
[suggestions]: suggestions.md
