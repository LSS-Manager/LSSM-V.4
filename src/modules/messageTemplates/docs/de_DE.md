Besonders (Co-)Admins eines Verbands schreiben oft die selben oder ähnliche Texte an ihre Verbandsmitglieder.

Da dies oft lästig ist, gibt es mit diesem Modul **Nachrichten Templates**, die es vorher nur als [Einzelscript](https://forum.leitstellenspiel.de/index.php?thread/18912-skript-wunsch-autofill-f%C3%BCr-nachrichten/) gab.

In den Einstellungen lassen sich verschiedene Templates anlegen:

![Einstellungen](settings.png)

## Variablen

### Nutzername

Dabei kannst du den Platzhalter <code><span>{{</span>username<span>}}</span></code> verwenden, dieser wird **bei neuen Nachrichten** gegen den Nutzernamen des Empfängers ausgetauscht.

:::tip Warum geht das nur bei neuen Nachrichten?
Ganz einfach: Aktuell haben wir leider keine Möglichkeit bei existierenden Konversationen den Empfänger eindeutig zu bestimmen!
:::

### Datum

Mittels <code><span>{{</span>today<span>}}</span></code> kannst du ganz einfach das heutige Datum einfügen.

Du möchtest ein zukünftiges oder vergangenes Datum einfügen, z.B. heute in 2 Wochen? Dann nutze dafür <code><span>{{</span>today+14<span>}}</span></code>, um heute in  14 Tagen einzufügen. Genauso geht z.B. <code><span>{{</span>today-436<span>}}</span></code>, um heute vor 436 Tagen einzufügen.


## Beispiele

Bei neuen Nachrichten sieht das dann beispielsweise so aus:

![Konversation starten](new_message.png)

bzw. nach dem Einfügen des ersten Templates:

![Template eingefügt](entered.png)

Und so bei bestehenden Konversationen:

![bestehende Konversation](existing_messages.png)
