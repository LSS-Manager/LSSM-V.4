In particolare, i (co-)amministratori di un'associazione spesso scrivono gli stessi testi o testi simili ai loro membri dell'associazione.

Poiché ciò è spesso fastidioso, con questo modulo **Modello News**, che prima esistevano solo come [Descrizione](https://forum.leitstellenspiel.de/index.php?thread/18912-skript-wunsch-autofill-f%C3%BCr-nachrichten/).

Nelle impostazioni è possibile inserire diversi template:

![Impostazioni](settings.png)

## Variabili

### Nome utente

Puoi usare il segnaposto <code><span>{{</span>username<span>}}</span></code> che, in caso di **nuovi messaggi** viene scambiato con il nome utente del destinatario.

:::tip Perché succede solo ai nuovi messaggi?
È molto semplice: al momento non abbiamo purtroppo la possibilità di individuare chiaramente il destinatario durante le conversazioni esistenti!
:::

### Data

Con <code><span>{{</span>today<span>}}</span></code> puoi inserire semplicemente la data di oggi.

Vuoi aggiungere una data futura o una data precedente, per esempio oggi tra due settimane? Usa per questo <code><span>{{</span>today+14<span>}}</span></code>, da inserire oggi tra 14 giorni. È la stessa cosa, per esempio. <code><span>{{</span>today-436<span>}}</span></code>, da inserire oggi 436 giorni fa.


## Esempi

Per esempio, in caso di nuove notizie le cose stanno così:

![Avvia conversazione](new_message.png)

dopo l'inserimento del primo template:

![Aggiunta del template](entered.png)

E quindi, nelle conversazioni esistenti:

![Conversazione esistente](existing_messages.png)
