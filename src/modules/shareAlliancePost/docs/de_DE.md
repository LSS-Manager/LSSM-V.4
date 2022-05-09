Viele SpielerInnen teilen regelmäßig Einsätze mit ihrem Verband und schreiben auch eine kurze Rückmeldung dazu.

Dieses Modul ermöglicht es, mit einem einzigen Klick zu alarmieren, zu teilen und zu posten!
In den Einstellungen kannst du dir eigene Templates anlegen und dabei sogar die untenstehenden Variablen nutzen.

Zudem besitzt dieses Modul eine Integration in das Feature [Einsätze teilen](../extendedCallList/#einsatze-teilen) des Moduls `Erweiterte Einsatzliste`. Das heißt, wenn du hier die Einstellung `Integration in die Einsatzliste` aktiviert hast, wird der Teilen-Knopf in der Einsatzliste ebenfalls die von dir eingestellten Rückmeldungen als Auswahl-Optionen beinhalten.

Die Option `In Einsatzliste bleiben` erweitert diese Integration und zeigt nach dem Teilen (sowie bei bereits geteilten Einsätzen) einen Knopf für neue Rückmeldungen an. Somit lassen sich Rückmeldungen weiterhin aus der Einsatzliste heraus schreiben.

## Variablen

### Credits

<variable variable="credits"/> fügt den durchschnittlichen Verdienst des Einsatzes ein.

### Adresse

<variable variable="address"/> fügt die vollständige Adresse ein.

Du kannst <variable variable="city"/> nutzen, um nur Postleitzahl und Stadt/Gemeinde einzufügen.

Um auch die Postleitzahl wegzulassen, verwende <variable variable="cityWithoutZip"/>.

### Zusätzlich benötigte Fahrzeuge

<variable variable="remaining"/> fügt den Text der roten "Zusätzlich benötigte Fahrzeuge"-Box ein.

**Nur im Einsatzfenster verfügbar** ist auch <variable variable="remainingSpecial"/>, welches die Fahrzeuge auf Anfahrt und die ausgewählten Fahrzeuge mit beachtet. In der Einsatzliste wird einfach der normale Inhalt der roten Box eingefügt.

### Patienten

<variable variable="patients"/> fügt die Zahl der aktuellen Patienten ein.

### Beginn eines geplanten Einsatzes

<variable variable="beginAt"/> fügt die Uhrzeit ein, zu der ein geplanter Einsatz beginnen wird.

### Name des Einsatzes

<variable variable="name"/> fügt den Namen des Einsatzes ein.

### Längste Anfahrt

<variable variable="longestDrive"/> fügt ein, wie lange alle aktuell ausgewählten Fahrzeuge benötigen, um anzufahren. **Wichtig**: Diese Variable ist in Rückmeldungen aus der Einsatzliste heraus natürlich nicht verfügbar!

### Datum

<variable variable="today"/> fügt das heutige Datum (Tag und Monat) ein. z.B. `19.10`.

Analog gibt <variable variable="tomorrow"/> das morgige Datum (Tag und Monat) aus. z.B. `20.10`.

### Uhrzeiten

Du kannst auch Uhrzeiten, abhängig vom aktuellen Zeitpunkt einfügen lassen. Da das etwas komplizierter ist, empfehlen wir die konzentrierte Lektüre der folgenden Anleitung:

<variable variable="now+5"/> resultiert in der Uhrzeit, genau 5 Stunden nach jetzt. <variable variable="now+5,5"/> fügt 5,5 Stunden, also 5 Stunden und 30 Minuten hinzu. Du kannst jede beliebige positive Zahl nutzen.

Ebenso kannst Du Uhrzeiten auf- und abrunden. Um z.B. auf die nächste viertelstunde aufzurunden, verwende `r15`, zum abrunden einfach `r-15`. Du kannst natürlich jede Zahl zwischen `0` und `59` verwenden.

Beispiel: Wenn du "In 7 Stunden und 22,5 Minuten, aber auf eine Minutenzahl, die durch drei teilbar ist, abrunden", verwende einfach <variable variable="now+7.266r-3"/>. Tut uns leid, Verwirrtheitszertifikate stellen wir derzeit leider nicht aus ;)

Möchtest du das jeweils zugehörige Datum mit ausgeben, dann füge einfach ein `d` hinten an die Variable an: <code v-html="'{{now+5r0d}}'"></code> Würde z.B. am 24.03.2020 um 10:32 folgenden Output generieren: `16:00 (24.03.)`, am selben Tag um 21:43 würde das Ergebnis `03:00 (25.03.)` sein.

Wenn du das ganze nicht verstehst (was wir als überaus verständlich werten), kannst du dir über den [Support](../../support.md) Hilfe holen und uns fragen.
