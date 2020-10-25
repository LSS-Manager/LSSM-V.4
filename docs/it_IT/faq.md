---
titolo: FAQ ❓
lang: it_IT
sidebarDepth: 3
---

# FAQ ❓

### Quanto costa LSS Manager?
LSS-Manager è gratutito - non abbiamo intenzione di cambiare questo.

::: warning Donazioni
Ci sono alcuni buoni utenti che vorrebbero donarci dei soldi. Ma: LSS-Manager è e rimarrà gratuito. Inoltre non accetteremo nessuna donazione per questo proggetto.

Questo per tanti motivi:

* Questo proggetto è sviluppato su una base volontaria nel tempo libero dei programmatori partecipanti
* Una variamente a pagamento, simile al Premium nel gioco, ci metterebbe troppa pressione per programmare oltre il nostro desiderio.
* Per motivi legali non possiamo accettare donazioni:
    * Se avessimo trovato un'azienda per LSS Manager così da poter ricevere donazioni, questa non avrebbe futuro, perchè un'azienda senza spese non può essere un'azienda.
    * Se avessimo i server, che attualmente ospitano LSS Manager, attraverso un'azienda, essi mangerebbero immediatamente il nostro guadagno.

Perciò, oltre all'idea di volontariato, non avrebbe senso per noi prendere dei soldi per LSS-Manager.
:::

### Come posso contribuire per LSS Manager?
L'utente "comune" può [segnalare errori][errori] o [proporre suggerimenti][suggerimenti].

Attualmente stiamo progettando una guida per gli sviluppatori, così che anche loro possono aggiungere facilmente i loro plug-in a LSSM. Inoltre cerchiamo di tenere la nostra struttura del codice il più pulita e comprensibile. Tuttavia, aggiungendo un plug-in, in nessuna maniera implica l'adesione al team.

### Come segnalo errori/bug?
Dai un'occhiata alla nostra pagina per [segnalare errori][errori].

### Dove posso trovare aiuto?
Attraverso il nostro supporto. Puoi trovare maggiori informazioni [qui][supporto].

### Come posso proporre suggermente/idee?
Nella pagina [suggerimenti][suggerimenti] abbiamo messo insieme delle informazioni riguardanti ciò.

### Su quale browser LSS Manager funziona?
Solo browser desktop sono segnati qui, in quanto i browser mobili non sono ufficialmente supportati.
Questa tabella non è ancora neccessariamente corretta e verrà aggiornata quando nuove informazioni saranno disponibili!

Dal momento che vogliamo tenere una codifica standard in tutto, un browser moderno ed aggiornato è necessario e raccomandato - anche solo per motivi di sicurezza, anche all'esterno del gioco.

::: warning Compatibilità
La compatibilità segnata qui non garantisce la funzionalità. Queste sono solo informazioni raccolte e valutate da terze parti.
:::

<table>
<thead>
    <tr>
        <th>Browser</th>
        <th>min. version</th>
        <th>Download</th>
    </tr>
</thead>
<tbody>
    <tr v-for="({supported, download}, browser) in $themeConfig.variables.browsers">
        <td>{{ browser.replace(/^./, $1 => $1.toUpperCase()) }}</td>
        <td>{{ supported }}</td>
        <td><a :href="download" target="_blank">Download</a></td>
    </tr>
</tbody>
</table>

::: danger Internet Explorer e Microsoft Edge
Questi due browser possono essere descritti come "bambini problematici" di un moderno programmatore web. Ci sono alcune funzioni che non funzionano all'interno di essi, oppure richiedeno una programmazione addizionale.

Noi non vediamo il punto di fare ciò ovunque e ufficialmente **non** supportiamo questi due browser.
:::

### Voglio condividere il mio setup con dei amici o usarlo su dispositivi multipli. E' possibile?
Attualmente non è possibile, ma ci stiamo lavorando.

### C'è un modo per salvare le impostazioni legate all'account così da non doverle importare su un'altro dispositivo?
Attualmente non offriamo questa possibilità, ma un implementazione di questa possibilità è programmata.


[supporto]: support.md
[errori]: error_report.md
[suggerimenti]: suggestions.md
