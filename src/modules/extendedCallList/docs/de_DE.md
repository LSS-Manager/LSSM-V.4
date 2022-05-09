Die Einsatzliste ist eines der zentralen Elemente des Spiels. Leider ist sie seitens des Spiels nur minimalistisch umgesetzt.

Mit diesem Modul möchten wir sie etwas aufpeppen. Dies sind die möglichen Einstellungen:

## verbleibende Einsatzdauer
Du möchtest wissen, wie lange ein Einsatz noch braucht, bis er vollständig abgearbeitet ist?
Diese Einstellung zeigt dir genau diese Information an:
![Einsatzdauer in der Einsatzliste](./remainingtime/einsatzdauer.png)

### Einsatzdauer nur bei grünen Einsätzen
Ist diese Einstellung deaktiviert (Standardmäßig ist sie aktiviert), werden die Zeiten auch angezeigt, wenn der Einsatz im Status `gelb` ist.

Warum ist das so?
> Für jeden Einsatz, der läuft, führt das Spiel sekündlich eine Funktion aus. In dieser Funktion wird unter anderem berechnet, wann der Einsatz aufhört abgearbeitet zu werden. Und das ist eben einmal, wenn der Einsatz fertig ist, oder, wenn noch nicht alles benötigte vor Ort ist und der Einsatz trotzdem schon angefangen wurde.
> Wir nutzen diese Berechnete "Endzeit" und berechnen dann, wie weit es bis dahin ist und formatieren dies dann schön.
> Aus diesem Grund ist es möglich, dass die Einsatzdauer auch schon angezeigt wird, wenn der Einsatz noch nicht `grün` ist. 

## Patientenbehandlungsdauer
Damit wird bei Patienten in klein angezeigt, wie lange diese brauchen, bis sie vollständig behandelt sind.

## Abpumpprozessdauer
Damit wird bei Abpumpprozessen in klein angezeigt, wie lange diese noch brauchen.

## Einsätze markieren
Mit diesem Feature hast du die Möglichkeit, dir Einsätze zu markieren, sodass sie stets oben in der Einsatzliste angezeigt werden. Du kannst die Markierung sowohl in der Einsatzliste als auch im Einsatzfenster vornehmen. Ein gelber Stern zeigt an, dass ein Einsatz markiert ist.
![Markieren in der Einsatzliste](./starrablemissions/markieren.png)
![Markieren im Einsatzfenster](./starrablemissions/markieren_einsatz.png)

## Verdienst anzeigen
Dieses Feature zeigt dir an, wie viel ein Einsatz im Durchschnitt gibt:
![Verdienst anzeigen](./averagecredits/verdienst.png)

## Einsätze einklappen
Dieses Feature ersetzt das Modul `Mission Out` der V3!

Du kannst die Einsätze nach Belieben ein- und ausklappen oder eben alle auf einmal einklappen. Mit dem Knopf am rechten Rand der oberen Knopf-Leiste lassen sich alle Einsätze auf einmal umschalten. So sieht das ganze zum Beispiel aus:

![Einsätze einklappen](./collapsablemissions/einklappen.png)

## Einsätze teilen
Dieses Feature ersetzt das Modul `Einsätze freigeben` der V3!

Du kannst damit Einsätze direkt aus der Einsatzliste heraus im Verband freigeben. Mit den folgenden Einstellungen kannst du begrenzen, bei welchen Einsätzen ein "Teilen"-Knopf angezeigt werden soll.
Zudem kannst du dir die Farbe der Knöpfe anpassen:

![Einsätze teilen](./sharemissions/shareMissions.png)

### Einsätze teilen: Einsatztypen
Wähle, ob die Knöpfe bei Notfalleinsätzen, bei Sicherheitswachen oder bei beiden erscheinen soll.

Die Option `Verbandseinsätze` ist dafür gedacht, wenn man im Modul [Share-Alliance-Post](../shareAlliancePost/) die Einstellung `In Einsatzliste bleiben` aktiv hat.

### Einsätze teilen: Minimale Credits
Nicht alle Einsätze möchte man freigeben, z.B. nur Einsätze, die im Schnitt mehr als 7.0000 Credits geben. Das kannst du über diese Einstellung regeln.

## Einsätze sortieren
Sortiere deine Einsatzliste nach bestimmten Kriterien! Auch hier lässt sich die Farbe des Knopfes anpassen.

![Einsätze sortieren](./missionsort/missionSort.png)

### Sortierung im Einsatzfenster
Mit dieser Einstellung kannst du die Sortierung ins Einsatzfenster übernehmen. Selbstverständlich kannst du auch [Hotkeys](../hotkeys/) für die modifizierten Knöpfe festlegen. Mit einer kleinen Checkbox kannst du im Einsatzfenster jederzeit zwischen den Modus der Knöpfe zwischen "sortiert" und "Standard" umschalten.

Hast du keine Sortierung ausgewählt, werden die Knöpfe nicht modifiziert und es erscheint kein Haken.

Den aktuellen Modus der Knöpfe kannst du ganz einfach der Farbe entnehmen: `Grün → Standard` und `Blau → Sortiert`:

![Einsätze sortieren im Einsatzfenster: unsortiert](./missionsort/missionSortMissionsStandard.png)

![Einsätze sortieren im Einsatzfenster: sortiert](./missionsort/missionSortMissionsModified.png)

## Patientenzahl
Zeigt am rechten Rand eines Einsatzes eine kleine Zahl an, wie viele Patienten gerade am Einsatzort sind:

![Patientenzahl](./patientenzahl.png)

### Verstecke 0 Patienten
Ist diese Einstellung aktiv, wird die Zahl der Patienten nur dann angezeigt, wenn diese größer 0 ist.

### Patientenzahl in Tooltips
Mit dieser Einstellung wird die aktuelle Zahl der Patienten auch in den Tooltips auf der Karte angezeigt:

![Patientenzahl in Tooltips](./patienten-tooltip.png)

## Saisonale Einsätze markieren
Mit dieser Einstellung kannst du für jeden einzelnen Einsatz beliebig viele kurze Hinweise notieren, welche vor dem Namen in der Einsatzliste gezeigt werden. Standardmäßig sind hier saisonale Einsätze eingetragen (Sommer, Halloween, Fußball etc.), daher auch der Name.

So sieht das z.B. bei Standardeinstellung für einen Fußball-Einsatz aus:
![Eventmission bei einem Fußalleinsatz](./eventmissions/eventMission.png)
