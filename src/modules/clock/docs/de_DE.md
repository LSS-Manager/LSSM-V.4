Damit du auch direkt im Spiel einen Blick auf die Uhr werfen kannst, haben wir dir dieses Modul entworfen.
Und um dir einen möglichst hohen "Komfort" bieten zu können, ist diese Uhr sogar bearbeitbar.
Das heisst, wir geben dir die Möglichkeit, eine Vielzahl an Variablen zu nutzen, um u.a auch das aktuelle Datum anzeigen lassen zu können.
Eine Hilfestellung zur Konfiguration findest du unter [Konfiguration](#konfiguration).

Aktuell bieten wir dir die Möglichkeit von Uhren an folgenden Stellen:
* Navigationsleiste *Format hier: `LLLL:ss`*  ![Uhr in der Navigationsleiste](/v4/docs/assets/clock/img/navbar.png)

## Konfiguration

Wir nutzen [Moment.js](https://momentjs.com/), um dir eine möglichst breite Auswahl an Konfigurationsmöglichkeiten bieten zu können.
Im folgenden versuchen wir die Möglichkeiten so verständlich wie möglich aufzulisten. Das Original-Dokument dazu findest du in der [Moment.js Dokumentation](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

### Variablen

|   Kategorie   | Variable |              Ausgabe               |                         Beschreibung                         |
| :-----------: | :------: | :--------------------------------: | :----------------------------------------------------------: |
|     Monat     |    M     |       `1` `2` ... `11` `12`        | Diese Variable gibt den aktuellen Monat als Zahl aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    Mo    |     `1.` `2.` ... `11.` `12.`      | Diese Variable gibt den aktuellen Monat als Zahl mit nachfolgendem Punkt `.` aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|               |    MM    |      `01` `02` ... `11` `12`       | Diese Variable gibt den aktuellen Monat als Zahl aus. Alle Zahlen werden 2-stellig dargestellt. |
|               |   MMM    |  `Jan.` `Feb.` ... `Nov.` `Dez.`   | Diese Variable gibt die Kurzform des Namens des aktuellen Monats aus. |
|               |   MMMM   |      `Januar` ... `Dezember`       | Diese Variable gibt den Namen des aktuellen Monats aus.    |
|    Quartal    |    Q     |          `1` `2` `3` `4`           | Diese Variable gibt das aktuelle Quartal (stets ohne führende Null) aus. |
|               |    Qo    |        `1.` `2.` `3.` `4.`         | Diese Variable gibt das aktuelle Quartal mit nachfolgendem Punkt `.` aus. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|  Tag (Monat)  |    D     |       `1` `2` ... `29` `30`        | Diese Variable gibt den aktuellen Tag im Monat aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    Do    |     `1.` `2.` ... `29.` `30.`      | Diese Variable gibt den aktuellen Tag im Monat mit nachfolgendem Punkt `.` aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|               |    DD    |      `01` `02` ... `29` `30`       | Diese Variable gibt den aktuellen Tag im Monat als Zahl aus. Alle Zahlen werden 2-stellig dargestellt. |
|  Tag (Jahr)   |   DDD    |      `1` `2` ... `364` `365`       | Diese Variable gibt aus, der wie vielte Tag im Jahr heute ist. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |   DDDo   |    `1.` `2.` ... `364.` `365.`     | Diese Variable gibt aus, der wie vielte Tag im Jahr heute ist. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|               |   DDDD   |    `001` `002` ... `364` `365`     | Diese Variable gibt den aktuellen Monat als Zahl aus. Alle Zahlen werden 3-stellig dargestellt. |
|   Wochentag   |    d     |    `0` `1` `2` `3` `4` `5` `6`     | Diese Variable gibt den aktuellen Wochentag als Zahl aus. Hierbei ist Sonntag `0` und Samstag `6` |
|               |    do    | `0.` `1.` `2.` `3.` `4.` `5.` `6.` | Diese Variable gibt den aktuellen Wochentag als Zahl mit nachfolgendem Punkt `.` aus. Hierbei ist Sonntag `0` und Samstag `6`. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|               |    dd    |      `So` `Mo` ... `Fr` `Sa`       | Diese Variable gibt die Kurzform des aktuellen Wochentags als Wort aus. |
|               |   ddd    |    `So.` `Mo.` ... `Fr.` `Sa.`     | Diese Variable gibt die Kurzform des aktuellen Wochentags als Wort mit nachfolgendem Punkt `.` aus. In den englischsprachigen Spielversionen wird ein 3-stelliges Kürzel ohne Punkt verwendet |
|               |   dddd   |      `Sonntag` ... `Samstag`       | Diese Variable gibt den aktuellen Wochentag als Wort aus.   |
| Kalenderwoche |    w     |       `1` `2` ... `51` `52`        | Diese Variable gibt die aktuelle Kalenderwoche aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    wo    |     `1.` `2.` ... `51.` `52.`      | Diese Variable gibt die aktuelle Kalenderwoche aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. In den englischsprachigen Spielversionen werden entsprechend `1st`, `2nd` usw. verwendet. |
|               |    ww    |      `01` `02` ... `51` `52`       | Diese Variable gibt die aktuelle Kalenderwoche als zweistellige Zahl aus. |
|     Jahr      |    YY    |      `70` `71` ... `29` `30`       | Diese Variable gibt die letzten zwei Ziffern des aktuellen Jahres aus. |
|               |   YYYY   |  `1970` `1971` ... `2029` `2030`   | Diese Variable gibt das aktuelle Jahr aus.          |
|    AM / PM    |    A     |             `AM` `PM`              | Diese Variable gibt vormittags `AM` und Nachmittags `PM` aus. |
|               |    a     |             `am` `pm`              | Diese Variable gibt vormittags `am` und Nachmittags `pm` aus. |
|    Stunde     |    H     |       `0` `1` ... `22` `23`        | Diese Variable gibt die aktuelle Stunde im 24-Stunden-Format aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    HH    |      `00` `01` ... `22` `23`       | Diese Variable gibt die aktuelle Stunde im 24-Stunden-Format als 2-stellige Zahl aus. |
|               |    h     |       `1` `2` ... `11` `12`        | Diese Variable gibt die aktuelle Stunde im 12-Stunden-Format aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    hh    |      `01` `02` ... `11` `12`       | Diese Variable gibt die aktuelle Stunde im 12-Stunden-Format als 2-stellige Zahl aus. |
|    Minute     |    m     |       `0` `1` ... `58` `59`        | Diese Variable gibt die aktuelle Minute aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    mm    |      `00` `01` ... `58` `59`       | Diese Variable gibt die aktuelle Minute als 2-stellige Zahl aus. |
|    Sekunde    |    s     |       `0` `1` ... `58` `59`        | Diese Variable gibt die aktuelle Sekunde aus. Vor 1-stellige Zahlen wird hierbei keine `0`gesetzt. |
|               |    ss    |      `00` `01` ... `58` `59`       | Diese Variable gibt die aktuelle Sekunde als 2-stellige Zahl aus. |

### Lokale Kurzformen
|                  Kategorie                  | Variable |            Beispiel            |
| :-----------------------------------------: | :------: | :----------------------------: |
|                   Uhrzeit                   |    LT    |             08:23              |
|            Uhrzeit mit Sekunden             |   LTS    |            08:23:20            |
|         Datum mit führenden Nullen          |    L     |           03.02.2020           |
|         Datum ohne führende Nullen          |    l     |            3.2.2020            |
|          Datum mit Monat als Wort           |    LL    |        17. Februar 2020        |
|       Datum mit kurzem Monat als Wort       |    ll    |         17. Feb. 2020          |
|    Datum mit Monat als Wort und Uhrzeit     |   LLL    |     17. Februar 2020 08:28     |
| Datum mit kurzem Monat als Wort und Uhrzeit |   lll    |      17. Feb. 2020 08:28       |
|          Volles Datum mit Uhrzeit           |   LLLL   | Montag, 17. Februar 2020 08:30 |
|    Volles Datum in Kurzform mit Uhrzeit     |   llll   |    Mo., 17. Feb. 2020 08:30    |

### Normaler Text
Möchte man die aktuelle Uhrzeit mit nachfolgendem `Uhr` ausgeben lassen, also z.B. `08:33:31 Uhr`, kann man einfach `LTS Uhr` schreiben. Das Problem hierbei ist jedoch, dass das `h` ebenfalls ersetzt wird. Das Ergebnis wäre `08:33:31 U8r`.
Deshalb kann man reinen Text "ausklammern", um eine Formatierung zu verhindern. Das geschieht, indem man in in eckige Klammern `[]` setzen. Eigentlich ist nur das umklammern von Variablen im reinen Text nötig, um eine schönere und lesbarere Formatierung zu erhalten kann man aber auch den gesamten Text in Klammern setzen.
Das oben gewünschte Ergebnis von `08:33:31 Uhr` erreicht man über `LTS [Uhr]` oder `LTS U[h]r`. 
