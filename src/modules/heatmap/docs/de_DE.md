Die Heatmap ist ein Tool, um sich grafisch auf der Karte anzeigen zu lassen,
wie es um die Abdeckung des jeweiligen Gebiets mit Fahrzeugen oder Gebäudeausbauten bestellt ist.

## Allgemeines

Die Heatmap legt sich als Kreise über die normale Einsatzkarte.
Diese gehen von den Gebäuden aus, welche über die ausgewählte Erweiterung oder Fahrzeuge verfügen.
Das Fenster der Heatmap-Einstellungen lässt sich frei über den Bildschirm verschieben,
um für dich wichtige Sachen nicht zu verdecken.

## Heatmap-Icon

Je nach Einstellung erscheint in einer der vier Ecken der Karte das Icon.
Mit einem Klick auf dieses öffnet sich ein Fenster mit einem Kästchen zur
Aktivierung der Heatmap und dem Button für die Einstellungen.

![Heatmap-Icon](./heatmapicon.png)

## Heatmap Einstellungen

### Live-Preview

Mit diesem Häkchen erlaubt man es der Heatmap sich direkt an die erfolgten Konfigurationen anzupassen.
Bei Nichtaktivierung benötigt es einen Klick auf den dann erscheinenden `Speichern` Button,
um Änderungen bei der Konfiguration in der Heatmap zu sehen.

### Konfiguration

Als Erstes kann man zwischen `Gebäude` für Wachen, bzw. Wachenausbauten und `Fahrzeuge`
für die einzelnen Einsatzmitteltypen hin und her wechseln.
Nachfolgend kan man auswählen, ob man den Radius der Kreise in Pixeln einstellen will.
Bei Nichtaktivierung erfolgt dies in Kilometern.
Entscheidet man sich für Pixel, passen sich die Kreise dem Zoomen des Nutzers an.
Sie bleiben also im Verhältnis zu der Karte gleich groß,
während die Kilometervariante beim Zoomen weiterhin das gleiche Gebiet abdeckt.
Hier erscheint der Kreis beim Zoomen also kleiner oder größer auf der Karte.

Mit dem folgenden Regler `Radius` wird die Größe des Kreises aktiv verändert.
Der Regler `Intensitätsverstärkung` beeinflusst die Stärke des generierten Kreises,
von durchsichtigen Hellblau bis hin zu deckend Rot.

Beide Einstellungen lassen sich sowohl per Ziehen des Reglers,
als auch nach einem Klick auf das jeweilige rechte `123` Icon per Direkteingabe und "niedriger/höher" Tasten konfigurieren.

![Einstellungen](./heatmapeinstellungen.png)

Im letzten Feld wird das gesuchte Fahrzeug oder die Wache, den Wachausbau ausgewählt.
Dies geschieht entweder per Aussuchen aus der klappbaren Liste oder bequemer per Direkteingabe.

![Ausklappbare Liste](./heatmapliste.png)
