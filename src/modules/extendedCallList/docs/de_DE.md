Die Einsatzliste ist eines der zentralen Elemente des Spiels. Leider ist sie seitens des Spiels nur minimalistisch umgesetzt.

Mit diesem Modul möchten wir sie etwas aufpeppen. Dies sind die möglichen Einstellungen:

## verbleibende Einsatzdauer
Du möchstest wissen, wie lange ein Einsatz noch braucht, bis er vollständig abgearbeitet ist?
Diese Einstellung zeigt dir genau diese Information an:
![Einsatzdauer in der Einsatzliste](/v4/docs/assets/extendedCallList/img/de_DE/einsatzdauer.png)

### Einsatzdauer nur bei grünen Einsätze
Ist diese Einstellung deaktiviert (Standardmäßig ist sie aktiviert), werden die Zeiten auch angezeigt, wenn der Einsatz im Status `gelb` ist.

Warum ist das so?
> Für jeden Einsatz, der läuft führt das Spiel sekündlich eine Funktion aus. In dieser Funktion wird unteranderem berechnet, wann der Einsatz aufhört abgearbeitet zu werden. Und das ist eben einmal, wenn der Einsatz fertig ist, oder, wenn noch nicht alles benötigte vor Ort ist und der Einsatz trotzdem schon angefangen wurde.
> Wir nutzen diese Berechnete "Endzeit" und berechnen dann, wie weit es bis dahin ist und formatieren dies dann schön..
> Aus diesem Grund ist es möglich, dass die Einsatzdauer auch schon angezeigt wird, wenn der Einsatz noch nicht `grün` ist. 

## Einsätze markieren
Mit diesem Feature hast du die Möglichkeit, dir Einsätze zu markieren, so dass sie stets oben in der Einsatzliste angezeigt werden. Du kannst die Markierung sowohl in der Einsatzliste als auch im Einsatzfenster vornehmen. Ein gelber Stern zeigt an, dass ein Einsatz markiert ist.
![Markieren in der Einsatzliste](/v4/docs/assets/extendedCallList/img/de_DE/markieren.png)
![Markieren im Einsatzfenster](/v4/docs/assets/extendedCallList/img/de_DE/markieren_einsatz.png)

## Verdienst anzeigen
Dieses Feature zeigt dir an, wie viel ein Einsatz im Durchschnitt gibt:
![Verdienst anzeigen](/v4/docs/assets/extendedCallList/img/de_DE/verdienst.png)