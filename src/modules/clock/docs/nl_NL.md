We hebben deze module voor je ontworpen, zodat je direct in het spel naar de klok kunt kijken.
En om u het hoogst mogelijke "comfort" te kunnen bieden, kan deze klok zelfs bewerkt worden.
Dit betekent dat we je de mogelijkheid geven om een ​​groot aantal variabelen te gebruiken om bijv. de huidige datum te weergeven.
Hulp bij de configuratie vindt u onder [Configuratie](#configuratie).

Momenteel bieden wij u de mogelijkheden aan voor klokken op de volgende locaties:
* Navigatiebalk *Formaat hier: `LLLL: ss`*  ![Klok in de navigatiebalk](navbar.png)
* Als overlay boven alle elementen

## Configuratie

Wij gebruiken [Moment.js](https://momentjs.com/), om u een zo breed mogelijke keuze aan configuratie-opties te kunnen bieden.
Hieronder proberen we de mogelijkheden zo duidelijk mogelijk op een rij te zetten. U vindt het originele document in de [Moment.js Documentatie](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Variabelen

|   Categorie   | Variable |               output               |                         Omschrijving                         |
| :-----------: | :------: | :--------------------------------: | :----------------------------------------------------------: |
|     Maand     |    M     |       `1` `2` ... `11` `12`        | Deze variabele geeft de huidige maand als een getal weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    Mo    |     `1.` `2.` ... `11.` `12.`      | Deze variabele geeft de huidige maand weer als een getal gevolgd door een punt `.`. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt. |
|               |    MM    |      `01` `02` ... `11` `12`       | Deze variabele geeft de huidige maand als een getal weer. Alle nummers worden weergegeven als 2 cijfers. |
|               |   MMM    |  `Jan.` `Feb.` ... `Nov.` `Dec.`   | Deze variabele geeft de korte vorm van de naam van de huidige maand weer. |
|               |   MMMM   |      `Januari` ... `December`      | Deze variabele geeft de naam van de huidige maand weer.    |
|    kwartaal   |    Q     |          `1` `2` `3` `4`           | Deze variabele geeft het huidige kwartaal weer (altijd zonder voorloopnul). |
|               |    Qo    |        `1.` `2.` `3.` `4.`         | Deze variabele geeft het huidige kwartaal weer gevolgd door een punt `.`. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt. |
|  Dag (Maand)  |    D     |       `1` `2` ... `29` `30`        | Deze variabele geeft de huidige dag van de maand weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    Do    |     `1.` `2.` ... `29.` `30.`      | Deze variabele geeft de huidige dag van de maand weer, gevolgd door een punt `.`. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt. |
|               |    DD    |      `01` `02` ... `29` `30`       | Deze variabele geeft de huidige dag van de maand als een getal weer. Alle nummers worden weergegeven als 2 cijfers. |
|  Dag (Jaar)   |   DDD    |      `1` `2` ... `364` `365`       | Deze variabele geeft het aantal dagen van het jaar vandaag weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |   DDDo   |    `1.` `2.` ... `364.` `365.`     | Deze variabele geeft het aantal dagen van het jaar vandaag weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt. |
|               |   DDDD   |    `001` `002` ... `364` `365`     | Deze variabele geeft de huidige maand als een getal weer. Alle nummers worden weergegeven als 3 cijfers. |
|   Weekdag   |    d     |    `0` `1` `2` `3` `4` `5` `6`     | Deze variabele geeft de huidige dag van de week als een getal weer. Hier is zondag `0` en zaterdag is `6` |
|               |    do    | `0.` `1.` `2.` `3.` `4.` `5.` `6.` | Deze variabele geeft de huidige dag van de week weer als een getal gevolgd door een punt `.`. Hier is zondag `0` en zaterdag is `6`. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt. |
|               |    dd    |      `Zo` `Ma` ... `Vr` `Za`       | Deze variabele geeft de korte vorm van de huidige weekdag als een woord weer. |
|               |   ddd    |    `Zo` `Ma` ... `Vr` `Za`     | Deze variabele geeft de korte vorm van de huidige weekdag als een woord weer gevolgd door een punt `.`. In de Engelstalige spelversies wordt een afkorting van 3 cijfers zonder punt gebruikt |
|               |   dddd   |      `Zondag` ... `Zaterdag`       | Deze variabele geeft de huidige weekdag als een woord weer.   |
| Kalenderweek |    w     |       `1` `2` ... `51` `52`        | Deze variabele geeft de huidige kalenderweek weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    wo    |     `1.` `2.` ... `51.` `52.`      | Deze variabele geeft de huidige kalenderweek weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. In de Engelse taalversies van het spel worden `1st`, `2nd` etc. gebruikt.|
|               |    ww    |      `01` `02` ... `51` `52`       |Deze variabele geeft de huidige kalenderweek weer als een getal van twee cijfers. |
|     Jaar      |    YY    |      `70` `71` ... `29` `30`       | Deze variabele geeft de laatste twee cijfers van het huidige jaar weer. |
|               |   YYYY   |  `1970` `1971` ... `2029` `2030`   | Deze variabele geeft het huidige jaar weer.          |
|    AM / PM    |    A     |             `AM` `PM`              | Deze variabele geeft `AM` in de ochtend en `PM` in de middag weer. |
|               |    a     |             `am` `pm`              | Deze variabele geeft `am` in de ochtend en `pm` in de middag weer. |
|    Uur     |    H     |       `0` `1` ... `22` `23`        | Deze variabele geeft het huidige uur weer in 24-uurs formaat. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    HH    |      `00` `01` ... `22` `23`       | Deze variabele geeft het huidige uur weer in 24-uurs formaat als een 2-cijferig getal. |
|               |    h     |       `1` `2` ... `11` `12`        | Deze variabele geeft het huidige uur weer in 12-uurs formaat. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    hh    |      `01` `02` ... `11` `12`       | Deze variabele geeft het huidige uur weer in 12-uurs formaat als een 2-cijferig getal. |
|    Minuut     |    m     |       `0` `1` ... `58` `59`        | Deze variabele geeft de huidige minuut weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    mm    |      `00` `01` ... `58` `59`       | Deze variabele geeft de huidige minuut weer als een getal van 2 cijfers. |
|    Seconde    |    s     |       `0` `1` ... `58` `59`        | Deze variabele geeft de huidige seconde weer. Er wordt geen `0` voor getallen van 1 cijfer geplaatst. |
|               |    ss    |      `00` `01` ... `58` `59`       | Deze variabele geeft de huidige seconde weer als een getal van 2 cijfers. |

### Lokale notaties
|                  Categorie                  | Variabele |            Voorbeeld            |
| :-----------------------------------------: | :-------: | :-----------------------------: |
|                    Tijd                     |    LT     |              08:23              |
|              Tijd met seconden              |    LTS    |            08:23:20             |
|              Datum met nullen               |    L      |           03.02.2020            |
|             Datum zonder nullen             |    l      |            3.2.2020             |
|            Datum met maandnotatie           |    LL     |        17. Februari 2020        |
|         Datum met korte maandnotatie        |    ll     |          17. Feb. 2020          |
|        Datum met maandnotatie en tijd       |    LLL    |     17. Februari 2020 08:28     |
|    Datum met korte maandnotatie en tijd     |    lll    |       17. Feb. 2020 08:28       |
|          Volledige datum met tijd           |    LLLL   | Maandag 17. Februari 2020 08:30 |
|   Volledige datum in korte vorm met tijd    |    llll   |     Ma. 17. Feb. 2020 08:30     |

### Normale Tekst
Wil je normale tekst toevoegen in de datum/tijdnotatie, bijvoorbeeld: `Tijd: hh:mm`, dan zal de `d` door een weekdagnummer vervangen worden. Bijvoorbeeld: `Tij6: 08:33`.
Dit kan je voorkomen door de normale tekst, in dit geval `Tijd:`, tussen blokhaken te zetten `[]`, dus in dit voorbeeld `[Tijd:] hh:mm`.
Eigenlijk is het voldoende om de `d` tussen bloklhaken te zetten, maar voor de leesbaarheid van de jouw geschreven tekst is het beter om het hele woord er tussen te zetten.
