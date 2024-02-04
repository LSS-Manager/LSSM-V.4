# Namens-Schemata

## Variablen

| Variable              | Beschreibung                                                                         | Verwendbar in Templates für |
|-----------------------|--------------------------------------------------------------------------------------|-----------------------------|
| `{{unitId}}`          | ID der Einheit, z.B. `78020362`                                                      | Einheiten                   |
| `{{unitType}}`        | Typ der Einheit (z.B. `LF 20/01`).                                                   | Einheiten                   |
| `{{unitTypeCustom}}`  | Benutzerdefinierte Fahrzeugklasse.                                                   | Einheiten                   |
| `{{unitAlias}}`       | Alias-Bezeichnung der Einheit (vgl. Aliase), ansonsten identisch zu `unitType`.      | Einheiten                   |
| `{{unitIndex}}`       | Aufsteigende Nummerierung des Fahrzeugs. Parametrisierung möglich.                   | Einheiten                   |
| `{{buildingId}}`      | ID des Gebäudes, z.B. `11221784`                                                     | Einheiten, Gebäude          |
| `{{buildingType}}`    | Typ  der Einheit (z.B. `Feuerwehrschule`)                                            | Einheiten, Gebäude          |
| `{{buildingAlias}}`   | Alias-Bezeichnung des Gebäudes (vgl. Aliase), ansonsten identisch zu `buildingType`. | Einheiten, Gebäude          |
| `{{buildingIndex}}`   | Aufsteigende Nummerierung des Gebäudes. Parametrisierung möglich.                    | Einheiten, Gebäude          |
| `{{buildingCaption}}` | Name des Gebäudes                                                                    | Einheiten                   |

### Parametrisierung

Die Variablen `{{unitIndex}}` und `{{buildingIndex}}` unterstützen weitere Parameter, um die Art der Nummerierung zu beeinflussen.

Das Format ist `{{unitIndex:<padding>?:<start>?:<numeral system>?:<group>?}}` mit folgender Bedeutung:

| Parameter        | Bedeutung                                                                                                                              | Beispiel                           | Standard   |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|------------|
| `padding`        | Anzahl der Stellen, die die Nummerierung haben soll. Führende Nullen werden hinzugefügt. Nur sinnvoll mit der Verwendung von `arabic`. | `{{unitIndex:2}}` ergibt `01`      | `0`        |
| `start`          | Startwert der Nummerierung.                                                                                                            | `{{unitIndex::10}}` ergibt `10`    | `1`        |
| `numeral system` | System, in dem die Nummerierung erfolgen soll.                                                                                         | `{{unitIndex:::roman}}` ergibt `I` | `arabic`   |
| `group`          | Gruppierung der Fahrzeuge für die Nummerierung.                                                                                        | `{{unitIndex::::dispatch}}`        | `building` |

#### `unitIndex`

| Template                 | Ergebnis              |
|--------------------------|-----------------------|
| `{{unitIndex}}`          | `1`, `2`, `3`, ...    |
| `{{unitIndex:2}}`        | `01`, `02`, `03`, ... |
| `{{unitIndex::10}}`      | `10`, `11`, `12`, ... |
| `{{unitIndex:::roman}}`  | `I`, `II`, `III`, ... |
| `{{unitIndex:2:8}}`      | `08`, `09`, `10`, ... |
| `{{unitIndex::5:roman}}` | `V`, `VI`, `VII`, ... |
| `{{unitIndex::5:alpha}}` | `V`, `VI`, `VII`, ... |

#### `numeral system`

Alle Systeme außer `arabic` unterstützen die Suffixe `-lower` und `-upper` für Klein- und Großschreibung (z.B. `roman-lower`).

| Wert     | Beschreibung                     | Beispiel                         |
|----------|----------------------------------|----------------------------------|
| `arabic` | Arabische Zahlen (Standard)      | `1`, `2`, `3`, ...               |
| `roman`  | Römische Zahlen                  | `I`, `II`, `III`, ...            |
| `alpha`  | Buchstaben                       | `A`, `B`, `C`, ...               |
| `greek`  | Griechische Buchstaben (max. 23) | `Alpha`, `Beta`, `Gamma`, ...    |
| `icao`   | ICAO-Phonetic (max. 25)          | `Alpha`, `Bravo`, `Charlie`, ... |
| `emoji`  | Emoji Ziffern                    | 0️⃣, 1️⃣2️⃣3️⃣, 6️⃣6️⃣6️⃣, ...   |

#### `group`

| Wert               | Gruppieren nach                                                       | Verwendbar in Templates für |
|--------------------|-----------------------------------------------------------------------|-----------------------------|
| `none`             | Ohne Gruppierung, Fahrzeuge werden global durchnummeriert (Standard). | Einheiten, Gebäuden         |
| `building`         | Gruppierung pro Gebäude.                                              | Einheiten                   |
| `unitType`         | Gruppierung global nach Einheitentyp.                                 | Einheiten                   |
| `dispatch`         | Gruppierung nach Leitstelle                                           | Einheiten, Gebäuden         |
| `buildingUnitType` | Kombinierte Gruppierung nach Gebäude und Einheitentyp.                | Einheiten                   |
| `dispatchUnitType` | Kombinierte Gruppierung nach Leitstelle und Einheitentyp.             | Einheiten                   |
