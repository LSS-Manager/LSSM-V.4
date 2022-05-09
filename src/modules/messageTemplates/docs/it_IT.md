In particolare, i (co-)amministratori di un'associazione spesso scrivono gli stessi testi o testi simili ai loro membri dell'associazione.

Poiché ciò è spesso fastidioso, con questo modulo **Modello News**, che prima esistevano solo come [Descrizione](https://forum.leitstellenspiel.de/index.php?thread/18912-skript-wunsch-autofill-f%C3%BCr-nachrichten/).

Nelle impostazioni è possibile inserire diversi template:

![Impostazioni](./settings.png)

## Variabili

### Nome utente

Puoi usare il segnaposto <variable variable="username"/> che, in caso di **nuovi messaggi** viene scambiato con il nome utente del destinatario.

:::tip Perché succede solo ai nuovi messaggi?
È molto semplice: al momento non abbiamo purtroppo la possibilità di individuare chiaramente il destinatario durante le conversazioni esistenti!
:::

### Data

Con <variable variable="today"/> puoi inserire semplicemente la data di oggi.

Vuoi aggiungere una data futura o una data precedente, per esempio oggi tra due settimane? Usa per questo <variable variable="today+14"/>, da inserire oggi tra 14 giorni. È la stessa cosa, per esempio. <variable variable="today-436"/>, da inserire oggi 436 giorni fa.


## Esempi

Per esempio, in caso di nuove notizie le cose stanno così:

![Avvia conversazione](./new_message.png)

dopo l'inserimento del primo template:

![Aggiunta del template](./entered.png)

E quindi, nelle conversazioni esistenti:

![Conversazione esistente](./existing_messages.png)
