Questo modulo permette di vedere un orologio personalizzabile all'interno del gioco. Ci sono un sacco di impostazioni diverse che è possibile utilizzare per personalizzare questo a proprio piacimento. È possibile trovare aiuto sulla configurazione sotto [Configurazione](#Configuration).

L'orologio può essere posizionato in due posizioni:
* Sulla sinistra della barra di navigazione
![Orologio nella barra di navigazione](navbar.png)
* Come una sovrapposizione
![Orologio come una sovrapposizione sulla chat](chatOverlay.png)

Il formato nelle immagini di cui sopra è `DD[th] MMM YYYY LTS`.

## Configurazione

Questo modulo utilizza [Moment.js](https://momentjs.com) per offrire una vasta selezione di configurazione. Se si desidera vedere la documentazione originale si può trovare [qui](https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/).

## Variabili

| Categoria      | Variabile | Output                                          | Descrizione                                                                                                         |
|---------------|----------|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|
| Mese         | M        | `1`, `2`... `11`, `12`                          | Il mese nel formato di numero, i numeri della singola cifra non sono prefissati da uno 0.                                           |
|               | Mo       | `1o`, `2o`... `11esimo`, `12esimo`                  | Il mese in formato numerico seguito da `o`, e `esimo`di conseguenza.                                       |
|               | MM       | `01`, `01`... `11`, `12`                        | Il mese nel formato di numero, numeri della singola cifra prefissati da uno 0.                                                   |
|               | MMM      | `Gen`, `Feb`... `Nov`, `Dic`                    | Il mese in tre lettere brevi form.                                                                               |
|               | MMMM     | `Gennaio`, `Febbraio`... `Novembre`, `Dicembre` | Mese intero name.                                                                                                |
| Trimestre       | Q        | `1`, `2`, `3`, `4`                              | Il numero del trimestre, non preceduto da uno 0.                                                                            |
|               | Qo       | `1o`, `2o`, `3o`, `4o`                      | Il numero del quarto, seguito da `o` di conseguenza.                                             |
| Giorno (mese)   | D        | `1`, `2`... `29`, `30`                          | Il giorno del mese come numero, i numeri della singola cifra non sono prefissati da uno 0.                                     |
|               | Do       | `1o`, `2o`... `29esimo`, `30esimo`                  | Il giorno del mese come numero, seguito da `o`,  e `esimo` di conseguenza.                               |
|               | DD       | `01`, `02`... `29`, `30`                        | Il giorno del mese come numero, i numeri della singola cifra sono prefissati da uno 0.                                         |
| Giorno (anno)    | DDD      | `1`, `2`... `364`, `365`                        | Il giorno dell'anno come numero, numeri a una cifra non sono preceduti da uno 0.                                      |
|               | DDDo     | `1o`, `2o`, `364esimo`, `365esimo`                  | Il giorno dell'anno come numero, seguito da `o`, e `esimo` di conseguenza.                                |
|               | DDDD     | `001`, `002`... `364`, `365`                    | Il giorno dell'anno come numero, numeri a una e doppia cifra preceduti da 0 per avere sempre un numero a tre cifre. |
| Giorni Settimana       | d        | `0`, `1`, `2`, `3`, `4`, `5`, `6`               | Il giorno della settimana come numero, 0 è Domenica, 6 è Sabato                                                         |
|               | do       | `0o`, `1o`, `2o`, `3o`, `4o`, `5o`, `6o` | Il giorno della settimana come numero, seguito da `o` di conseguenza.                                |
|               | dd       | `Do`, `Lu`, `Ma`, `Me`, `Gi`, `Ve`, `Sa`        | Il giorno della settimana come abbreviazione di due lettere della parola.                                                       |
|               | ddd      | `Dom`, `Lun`, `Mar`, `Mer`, `Gio`, `Ven`, `Sab` | Il giorno della settimana come abbreviazione di tre lettere della parola.                                                     |
|               | dddd     | `Domenica`, `Luunedì`... `Venerdì`, `Sabato`      | Il giorno della settimana come una parola intera.                                                                                 |
| Calendario settimanale | w        | `1`, `2`... `51`, `52`                          | La settimana dell'anno, i numeri a una cifra non sono preceduti da uno 0.                                                 |
|               | wo       | `1a`, `2a`... `51esima`, `52esima`                  | La settimana dell'anno, seguita da `o`, e `esima` di conseguenza.                                           |
|               | ww       | `01`, `02`... `51`, `52`                        | La settimana dell'anno, i numeri a una cifra sono preceduti da uno 0.                                                     |
| Year          | YY       | `70`, `71`... `29`, `30`                        | Le ultime due cifre dell'anno in corso.                                                                            |
|               | YYYY     | `1970`, `1971`... `2029`, `2030`                | L'intero anno.                                                                                                      |
| AM/PM         | A        | `AM`, `PM`                                      | Mattina `AM`, pomeriggio `PM` tutto in maiuscolo.                                                                    |
|               | a        | `am`, `pm`                                      | Mattine `am`, pomeriggi `pm` tutto in minuscolo.                                                                    |
| Ora          | H        | `0`, `1`... `22`, `23`                          | L'ora del giorno come formato di 24 ore, numeri a una cifra non sono preceduti da un 0.                                |
|               | HH       | `00`, `01`... `22`, `23`                        | L'ora del giorno come formato di 24 ore, numeri a una cifra sono preceduti da uno 0.                                    |
|               | h        | `1`, `2`... `11`, `12`                          | L'ora del giorno come formato di 12 ore, numeri a una cifra non sono preceduti da un 0.                                |
|               | hh       | `01`, `02`... `11`, `12`                        | L'ora del giorno come formato di 12 ore, numeri a una cifra sono preceduti da un 0.                                    |
| Minuto        | m        | `0`, `1`... `58`, `59`                          | Il minuto corrente, il numero di singola cifra non è preceduto da uno 0.                                                    |
|               | mm       | `00`, `01`... `58`, `59`                        | Il minuto corrente, il numero di singola cifra è preceduto da uno 0.                                                        |
| Secondo        | s        | `0`, `1`... `58`, `59`                          | Il secondo corrente, il numero di una cifra non è preceduto da uno 0.                                                    |
|               | ss       | `00`, `01`... `58`, `59`                        | Il secondo corrente, il numero di una cifra prefissata da 0.   

## Formati localizzati

| Category                                   | Variable | Output                              |
|--------------------------------------------|----------|-------------------------------------|
| Orario                                       | LT       | 8:30 PM                             |
| Oraio con i secondi                          | LTS      | 8:30:25 PM                          |
| Data con gli zeri iniziali                    | L        | 30/04/2021                          |
| Data senza zeri iniziali                 | l        | 30/4/2021                           |
| Data con il mese come parola                    | LL       | Settembre 4, 1986                   |
| Data con mese abbreviato come parola          | ll       | Set 4, 1986                         |
| Data con il mese come parola e ora         | LLL      | Settembre 4, 1986 8:30 PM           |
| Data con mese abbreviato come parola e orario | lll      | Set 4, 1986 8:30 PM                 |
| Data completa con orario                        | LLLL     | Giovedì, Settembre 4, 1986 8:30 PM |
| Data completa in forma abbreviata con l'orario      | llll     | Gio, Sep 4, 1986 8:30 PM            |

## Testo normale

Se volete includere altro testo con il vostro orologio come ad esempio `ora`, semplicemente digitando `LTS ora`non funzionerà. Che si traduce in `11:13:27 AM 11our`. Per includere il testo che non dovrebbe essere formattato, circondarlo in `[]`. `LTS [Ora]` o `LTS [O]ra` risulteranno entrambi visualizzati come `11:13:27 AM Ora`.
