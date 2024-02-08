# Namens-Schema

## Variablen

Es stehen die Objekte `vehicle`, `building` und `dispatch` zur Verfügung, welche Informationen über das Fahrzeug, das zugeordnete Gebäude, sowie der zugeordneten Leitstelle (falls vorhanden) enthalten.

Die Basis-Struktur der Objekte entspricht der Struktur der Interfaces [`Vehicle`](https://github.com/LSS-Manager/LSSM-V.4/blob/dev/typings/Vehicle.d.ts) und [`Building`](https://github.com/LSS-Manager/LSSM-V.4/blob/dev/typings/Building.d.ts) (für `building` und `dispatch`).
Es kann somit auf alle Eigenschaften der beiden Objekte zugegriffen werden. Darüber hinaus sind einige zusätzliche Eigenschaften verfügbar, die in der folgenden Tabelle aufgeführt sind.

| Variable             | Beschreibung                                                                           | Verwendbar in Templates für |
|----------------------|----------------------------------------------------------------------------------------|-----------------------------|
| `{{vehicle.type}}`   | Typ des Fahrzeugs (z. B. `LF 20/01`).                                                  | Fahrzeuge                   |
| `{{vehicle.alias}}`  | Alias-Bezeichnung des Fahrzeuges (vgl. Aliase), ansonsten identisch zu `vehicle.type`. | Fahrzeuge                   |
| `{{building.type}}`  | Typ des Gebäudes (z. B. `Feuerwehrschule`).                                            | Fahrzeuge, Gebäude          |
| `{{building.alias}}` | Alias-Bezeichnung des Gebäudes (vgl. Aliase), ansonsten identisch zu `building.type`.  | Fahrzeuge, Gebäude          |
| `{{dispatch.type}}`  | Typ des Gebäudes (z. B. `Leitstelle`).                                                 | Fahrzeuge, Gebäude          |
| `{{dispatch.alias}}` | Alias-Bezeichnung des Gebäudes (vgl. Aliase), ansonsten identisch zu `dispatch.type`.  | Fahrzeuge, Gebäude          |

## Filter

### `index`
Auf den Objekten `vehicle` und `building` steht der `index`-Filter zur Verfügung, der eine Nummerierung für Fahrzeuge und Gebäude bereitstellt.

```liquid
{{ vehicle | index }}
{{ building | index }}
```

Es können Parameter übergeben werden, um die Nummerierung zu beeinflussen:

```liquid
{# Padding auf 2 Stellen, Start bei 10, Gruppieren nach Leitstelle #}
{{ vehicle | index: padding:2, start:10, groupBy:"dispatch" }}

{# Padding auf 3 Stellen, keine Gruppierung #}
{{ building | index: padding:3, groupBy:"none" }}

{# Kurzform: alle Parameter müssen übergeben werden! #}
{{ vehicle | index: 2, 10, "dispatch" }}
{{ building | index: 3, 1, "none" }}
```

#### Filterparameter

| Parameter | Bedeutung                                                                                | Beispiel                                        | Standard              |
|-----------|------------------------------------------------------------------------------------------|-------------------------------------------------|-----------------------|
| `padding` | Anzahl der Stellen, die die Nummerierung haben soll. Führende Nullen werden hinzugefügt. | `{{ vehicle \| index: padding:2 }}` ergibt `01` | `0`                   |
| `start`   | Startwert der Nummerierung.                                                              | `{{ vehicle \| index: start: 10 }}` ergibt `10` | `1`                   |
| `groupBy` | Gruppierung der Fahrzeuge für die Nummerierung.                                          | `{{ vehicle \| index:  groupBy:"dispatch" }}`   | `buildingVehicleType` |

Mögliche Werte für `groupBy`:

| Wert                   | Gruppieren nach                                                   | Anwendbar auf Objekt              | Verwendbar in Templates für |
|------------------------|-------------------------------------------------------------------|-----------------------------------|-----------------------------|
| `none`                 | Ohne Gruppierung, Fahrzeuge werden global durchnummeriert.        | `vehicle`, `building`, `dispatch` | Fahrzeuge, Gebäude          |
| `building`             | Gruppierung pro Gebäude.                                          | `vehicle`                         | Fahrzeuge                   |
| `vehicleType`          | Gruppierung global nach Fahrzeugtyp.                              | `vehicle`                         | Fahrzeuge                   |
| `buildingType`         | Gruppierung global nach Gebäudetyp.                               | `building`, `dispatch`            | Gebäuden                    |
| `dispatch`             | Gruppierung nach Leitstelle                                       | `vehicle`, `building`             | Fahrzeuge, Gebäude          |
| `buildingVehicleType`  | Kombinierte Gruppierung nach Gebäude und Fahrzeugtyps. (Standard) | `vehicle`                         | Fahrzeuge                   |
| `dispatchVehicleType`  | Kombinierte Gruppierung nach Leitstelle und Fahrzeugtyps.         | `vehicle`                         | Fahrzeuge                   |
| `dispatchBuildingType` | Kombinierte Gruppierung nach Leitstelle und Gebäudetyp.           | `building`                        | Fahrzeuge, Gebäude          |

### Weitere Filter

Es stehen alle [Standard LiquidJS-Filter](https://liquidjs.com/filters/overview.html) zur Verfügung.

Um eine Zahl in ein anderes Format zu konvertieren, können folgende Filter verwendet werden.

| Filter              | Beschreibung                                    | Beispiel-Ausgabe                          |
|---------------------|-------------------------------------------------|-------------------------------------------|
| `roman`             | Römische Zahlen                                 | `I`, `II`, `III`, ...                     |
| `alpha`             | Buchstaben                                      | `A`, `B`, `C`, ...                        |
| `greek`             | Griechische Buchstaben (max. 23)                | `Alpha`, `Beta`, `Gamma`, ...             |
| `icao`              | ICAO-Phonetic (max. 25)                         | `Alpha`, `Bravo`, `Charlie`, ...          |
| `emoji`             | Emoji Ziffern                                   | 0️⃣, 1️⃣2️⃣3️⃣, 6️⃣6️⃣6️⃣, ...            |
| `german-phonetic`   | Deutsche postalische Buchstabiertafel von 1950  | `Anton`, ..., `Kaufmann`, ... `Zacharias` |
| `austrian-phonetic` | Österreichische Buchstabiertafel (ÖNORM A 1081) | `Anton`, ..., `Konrad`, ... `Zürich`      |

Beispiel zur Verwendung mit Fahrzeugnummerierungen:

```liquid
{{ vehicle | index | roman }}
{{ vehicle | index | alpha | downcase }}
```
